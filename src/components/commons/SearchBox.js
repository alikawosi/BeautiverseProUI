import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {CloseCircle, SearchNormal1} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Input} from './Input';

const SearchBox = ({
  hasShadow = true,
  style,
  inputStyle,
  placeholder,
  onChange = () => null,
}) => {
  const [searchText, setSearchText] = useState('');
  const handleOnChangeValue = useCallback(
    value => setSearchText(value),
    [searchText],
  );
  const clearSearchField = useCallback(() => setSearchText(''), []);

  useEffect(() => {
    onChange(searchText);
  }, [searchText]);

  return (
    <View style={tw.style('mx-5 relative', style)}>
      {hasShadow && (
        <View
          style={tw`absolute left-0 right-0 top-2 bottom-0 rounded-xl shadow-2xl opacity-40`}
        />
      )}
      <Input
        formValue={searchText}
        textInputStyle={tw`text-base`}
        onChange={handleOnChangeValue}
        placeholder={placeholder}
        style={tw.style('border-0 rounded-xl w-full bg-white', inputStyle)}
        preffix={<SearchNormal1 size={22} color="#7A7A8A" />}
        suffix={
          <Pressable
            style={{
              opacity: Boolean(searchText) ? 1 : 0,
            }}
            onPress={clearSearchField}>
            <CloseCircle size={18} color="#7A7A8A" />
          </Pressable>
        }
      />
    </View>
  );
};

export {SearchBox};
