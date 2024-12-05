import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  TickSquare,
  Stop,
  ArrowUp2,
  ArrowDown2,
  Minus,
} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {CheckBoxGroup} from './CheckBoxGroup';

const CheckBox = ({
  id,
  size = 18,
  isChecked,
  label,
  disabled,
  onPress = () => false,
  onPressItem = () => false,
  checkedColor = '#FF6E00',
  uncheckedColor = '#C9D2DD',
  labelStyle,
  reverse,
  style,
  isAccordion,
  isFitContent = false,
  isChildSelected,
  data,
  contentContainerStyle,
}) => {
  const [isContentShow, setIsContentShow] = useState(false);
  const [initialCheckedList, setInitialCheckedList] = useState([]);

  // useEffect(() => {
  //   if (isChecked) {
  //     setInitialCheckedList([]);
  //     setIsContentShow(false);
  //   }
  // }, [isChecked]);

  const icon = isChecked ? (
    <TickSquare
      size={size}
      color={checkedColor}
      variant="Bold"
      onPress={isAccordion ? onPress : null}
    />
  ) : isChildSelected ? (
    <Minus
      size={size}
      color={checkedColor}
      variant="Bold"
      onPress={isAccordion ? onPress : null}
    />
  ) : (
    <Stop
      size={size}
      color={uncheckedColor}
      onPress={isAccordion ? onPress : null}
    />
  );

  const checkBoxPressHandler = () => {
    if (isAccordion) {
      setIsContentShow(!isContentShow);
    } else {
      onPress();
    }
  };

  const itemPressHandler = list => {
    let selectedList = {id: id, title: label, variations: list};
    setInitialCheckedList(list);
    onPressItem(selectedList);
  };
  return (
    <>
      <Pressable
        disabled={disabled}
        onPress={checkBoxPressHandler}
        style={tw.style(
          'justify-between items-center flex-row',
          {
            'opacity-50': disabled,
            'flex-row-reverse': reverse,
            'w-full': !isFitContent,
          },
          style,
        )}>
        <View style={tw`flex-row items-center `}>
          {icon}
          {label ? (
            <Text
              style={tw.style(
                'bv-sans-xs ml-2',
                {
                  fontSize: size * 0.8,
                },
                labelStyle,
              )}>
              {label}
            </Text>
          ) : null}
        </View>
        {isAccordion ? (
          <View>
            {isContentShow ? (
              <ArrowUp2 size={20} color="#717171" />
            ) : (
              <ArrowDown2 size={20} color="#717171" />
            )}
          </View>
        ) : null}
      </Pressable>
      {isContentShow ? (
        <View style={tw.style('px-4', contentContainerStyle)}>
          <CheckBoxGroup
            selectAll={isChecked}
            style={tw`h-11 mb-2 w-full`}
            options={data}
            initialCheckedList={initialCheckedList}
            onChange={list => itemPressHandler(list)}
            // onPress={(childSelected, selectedItems) => {
            //   setIsSelected(childSelected);
            //   SelectedListGenerator(selectedItems);
            //   setIsAllSelected(selectedItems.length === data.length);
            // }}
          />
        </View>
      ) : null}
    </>
  );
};
export {CheckBox};
