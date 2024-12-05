import React, {createContext, useContext, useMemo, useState} from 'react';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import * as Keychain from 'react-native-keychain';

import {useForm} from './useForm';
import {api} from '../utils';

const AuthCtx = createContext({});

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    phone: '',
    code: '',
    isLogin: false,
    isLoading: true,
  });
  const value = useMemo(() => {
    return {state, setState};
  }, [state, setState]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

const useAuth = ({
  formData = [],
  route,
  onSuccess = () => false,
  onSubmit = () => false,
  includePhone,
  includeCode,
  moreData = {},
} = {}) => {
  const {state, setState} = useContext(AuthCtx);
  const {data: userInfo, refetch: refetchUser} = useQuery(
    'user',
    () => axios.get('/user'),
    {
      onSuccess: () => {
        setState({...state, isLoading: false, isLogin: true});
      },
      enabled: state.isLogin,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {mutate, isLoading} = useMutation(
    data => axios.post(`/auth/${route}`, data),
    {
      onSuccess: data => {
        onSuccess(data);
      },
    },
  );

  const {form, handleSubmit} = useForm({
    fields: formData,
    onSubmit: values => {
      if (values.phone) {
        setState({...state, phone: values.phone});
      }
      if (values.code) {
        setState({...state, code: values.code});
      }
      mutate({
        ...values,
        ...(includePhone ? {phone: state.phone} : {}),
        ...(includeCode ? {code: state.code} : {}),
        ...moreData,
      });
      onSubmit(values);
    },
  });

  const login = async token => {
    const username = 'accessToken';
    Keychain.setGenericPassword(username, token);
    api.setAccessToken(token);
    setState({...state, isLoading: true, isLogin: true});
  };

  const logout = () => {
    Keychain.resetGenericPassword();
    setState({...state, isLoading: false, isLogin: false});
    api.setAccessToken(null);
  };

  const checkUser = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials?.username === 'accessToken') {
        await api.setAccessToken(credentials.password);
        setState({...state, isLoading: true, isLogin: true});
      } else {
        setState({...state, isLoading: false, isLogin: false});
      }
    } catch (error) {
      setState({...state, isLoading: false, isLogin: false});
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    phone: state.phone,
    state,
    login,
    checkUser,
    userInfo,
    refetchUser,
    logout,
  };
};

export {useAuth, AuthProvider};
