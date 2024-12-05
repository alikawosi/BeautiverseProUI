import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {PermissionsAndroid, Platform} from 'react-native';
import {CommonActions} from '@react-navigation/native';

class Api {
  token = null;
  baseURL = 'https://beautiverse.ca/api/beautiverse';

  init() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION');
    }

    axios.defaults.baseURL = this.baseURL;
    axios.interceptors.request.use(async req => {
      if (this.token) {
        req.headers.Authorization = 'Bearer ' + this.token;
      }
      return req;
    });
    axios.interceptors.response.use(
      async response => {
        let accessToken = await Keychain.getGenericPassword();
        this.token = accessToken.password;
        return response.data;
      },
      error => {
        this.handleError(error);
        return Promise.reject(error);
      },
    );
  }
  instanse() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  handleError = err => {
    console.log(err);
    const {response, config} = err;
    const originalRequest = config;
    if (response?.status === 403 && !originalRequest._retry) {
      console.log('403');
      this.setAccessToken(null);
      CommonActions.navigate('Auth', {screen: 'AuthLogin'});
    } else if (typeof response?.data.message === 'string') {
      console.log(response?.data.message);
      Toast.show({
        type: 'error',
        text1: 'A' + response?.data.message,
      });
    } else if (response?.data.errors) {
      let errorText = '';
      Object.values(response?.data.errors).forEach(item => {
        errorText += `${item} \n`;
      });
      Toast.show({
        type: 'error',
        text1: String(errorText),
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Some Problems happened! Please try again later!',
      });
    }
  };
  setAccessToken = token => {
    this.token = token;
  };
}

const api = new Api();

export {api};
