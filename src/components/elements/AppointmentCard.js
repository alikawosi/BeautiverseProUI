import React from 'react';
import {
  Clock,
  DollarCircle,
  MessageQuestion,
  Notepad2,
  Paperclip2,
  Send2,
} from 'iconsax-react-native';
import {View, Text, Pressable} from 'react-native';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {CheckBox} from '../commons';
import {GENERAL_CONST} from '../../constants';

const STATUS_TEXT = {
  completed: 'Completed',
  unpaid: 'un Paid',
  requested: 'Requested',
  booked: 'Booked',
  personal_bookable: 'Personal Bookable',
};

const THEMES = {
  primary: {
    1: {
      bgColor: '#7E6ADE',
      borderColor: '#5948AA',
    },
    2: {
      bgColor: '#FFB24B',
      borderColor: '#FF6E00',
    },
    3: {
      bgColor: '#E4E7EC',
      borderColor: '#7A7A8A',
      textColor: '#7A7A8A',
    },
  },
  secondray: {
    1: {
      bgColor: '#fff',
      borderColor: '#5948AA',
      textColor: '#313244',
      iconColor: '#7A7A8A',
    },
    2: {
      bgColor: '#fff',
      borderColor: '#FF6E00',
      textColor: '#313244',
      iconColor: '#7A7A8A',
    },
  },
};

const AppointmentCard = ({
  onPress = () => null,
  children,
  style,
  themeStep,
  styleTheme = 2,
  isPrimary = true,
}) => {
  const cardTheme = THEMES[isPrimary ? 'primary' : 'secondray'];
  styleTheme = (styleTheme % (themeStep || Object.keys(cardTheme).length)) + 1;
  const textColor = cardTheme[styleTheme]?.textColor || '#FFFFFF';
  const iconColor = cardTheme[styleTheme]?.iconColor || textColor;

  return (
    <Pressable
      onPress={onPress}
      style={tw.style(
        'w-full flex-shrink-0 rounded-2xl border-l-[3px]',
        style,
        {
          backgroundColor: cardTheme[styleTheme].bgColor,
          borderLeftColor: cardTheme[styleTheme].borderColor,
          'shadow-lg': !isPrimary,
        },
      )}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {textColor, iconColor}),
      )}
    </Pressable>
  );
};

AppointmentCard.Booking = ({
  end,
  name,
  start,
  address,
  category,
  distance,
  isChecked,
  textColor,
  hasAttachment,
}) => {
  return (
    <View style={tw`p-5 flex-grow`}>
      <View style={tw`flex-row justify-between mb-3`}>
        <View style={tw`flex-row`}>
          {isChecked ? (
            <CheckBox
              isChecked
              checkedColor={textColor}
              style={tw`w-auto mr-[5px]`}
            />
          ) : null}
          <Text style={tw`bv-heading-xs text-[${textColor}]`}>{name}</Text>
        </View>
        <View>
          {hasAttachment ? <Paperclip2 size={16} color={textColor} /> : null}
        </View>
      </View>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`bv-sans-xs text-[${textColor}]`}>{category}</Text>
        <Text
          style={tw`bv-med-xs text-[${textColor}]`}>{`${start} - ${end}`}</Text>
      </View>
      {address ? (
        <View
          style={tw`flex-row justify-between mt-3 pt-3 border-t border-opacity-10 border-white`}>
          <Text
            style={tw`bv-sans-xs text-[${textColor}]`}>{`${distance} KM`}</Text>
          <View style={tw`flex-row`}>
            <Text style={tw`bv-sans-xs mr-2 text-[${textColor}]`}>
              {address}
            </Text>
            <Send2 size={16} color={textColor} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

AppointmentCard.Checkout = ({
  time,
  price,
  name,
  status,
  isPast,
  address,
  services,
  distance,
  textColor,
  iconColor,
  checked_out,
  fontSize = 10,
}) => {
  const {weekDays} = GENERAL_CONST;
  const getDate = arg => {
    const times = arg.map(t => dayjs(t * 1000).format('HH:mm A')).join(' - ');
    let date = dayjs(arg[0] * 1000);
    date = `${weekDays.find(({id}) => id === date.day()).title}, ${date.format(
      'MMM DD',
    )}`;

    return `${date} |  ${times}`;
  };

  return (
    <View style={tw`px-4 py-[9px] flex-grow`}>
      {name && (
        <View style={tw`flex-row mb-2 items-center`}>
          <Clock size={16} color={iconColor} style={tw`mr-2`} />
          <Text
            style={tw`font-sans text-[${fontSize + 2}px] text-[${textColor}]`}>
            {name}
          </Text>
        </View>
      )}
      {Boolean(time.length) && (
        <View style={tw`flex-row mb-2 items-center`}>
          <Clock size={16} color={iconColor} style={tw`mr-2`} />
          <Text style={tw`font-sans text-[${fontSize}px] text-[${textColor}]`}>
            {getDate(time)}
          </Text>
        </View>
      )}
      <View style={tw`flex-row mb-2 items-start`}>
        <Notepad2 size={16} color={iconColor} style={tw`mr-2`} />
        <View>
          {services.map((title, index) => (
            <Text
              key={title}
              style={[
                tw.style(`font-sans text-[${fontSize}px] text-[${textColor}]`, {
                  marginTop: index >= 1 ? 2 : 0,
                }),
              ]}>
              {title}
            </Text>
          ))}
        </View>
      </View>
      {Boolean(address) && (
        <View style={tw`flex-row mb-2 items-center`}>
          <Send2 size={16} color={iconColor} style={tw`mr-2`} />
          <Text style={tw`font-sans text-[${fontSize}px] text-[${textColor}]`}>
            {!Boolean(distance) && `${distance} KM  |  `}
            {address}
          </Text>
        </View>
      )}
      <View style={tw`flex-row w-full items-center`}>
        <DollarCircle size={16} color={iconColor} style={tw`mr-2`} />
        <Text
          style={tw`text-[${
            fontSize + 2
          }px] mr-auto font-sans text-[${textColor}]`}>
          ${price}
        </Text>
        <View style={tw`flex-row items-center`}>
          {status === 'unpaid' && !isPast ? (
            <MessageQuestion size="18" color={iconColor} variant="Bold" />
          ) : (
            !(status != 'completed' && isPast) && (
              <CheckBox
                isChecked={status !== 'unpaid'}
                checkedColor={
                  isPast && status === 'completed' ? '#00C851' : iconColor
                }
                style={tw`w-auto`}
              />
            )
          )}
          <Text
            style={tw.style(`text-10 ml-2 font-sans text-[${textColor}]`, {
              'text-basicGreen': isPast && status === 'completed',
              'text-primary': isPast && status !== 'completed',
            })}>
            {STATUS_TEXT[status]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {AppointmentCard};
