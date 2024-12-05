import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../tailwind';

const COLORS = {
  earned: '#54BBFF',
  booked: '#FFBB33',
  empty: '#9F9FAB',
};

const getAmount = value => {
  return Number(
    String(value)
      .match(/\d+(\.?\d+)?/g)
      .join(''),
  );
};
const getPercentage = (value, total) => {
  return Math.round((getAmount(value) / getAmount(total)) * 100) + '%';
};

const ProgressBar = {};

ProgressBar.Regular = ({style, percent, total}) => {
  return (
    <View style={tw.style(`bg-selectedGray my-2 rounded h-3`, style)}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FFAA07', '#FF6E00']}
        style={tw.style(`h-full rounded`, {
          width: percent,
        })}
      />
    </View>
  );
};

ProgressBar.Multiple = ({style, data}) => {
  const total = useMemo(
    () =>
      Object.values(data).reduce((acc, value) => {
        acc += getAmount(value);
        return acc;
      }, 0),
    [data],
  );
  const render = callback =>
    Object.keys(data).map(key => {
      const value = data[key];
      return callback(key, value);
    });

  return (
    <View style={tw.style(style)}>
      <View style={tw`flex-row`}>
        {render((key, value) => (
          <Text
            key={key}
            style={tw.style(`min-w-[70px] text-black bv-med-xs`, {
              width: getPercentage(value, total),
            })}>
            ${value}
          </Text>
        ))}
      </View>
      <View
        style={tw`bg-selectedGray my-2 rounded h-3 overflow-hidden flex-row`}>
        {render((key, value) => (
          <View
            key={key}
            style={tw.style(`h-full`, {
              width: getPercentage(value, total),
              backgroundColor: key === 'empty' ? 'transparent' : COLORS[key],
            })}
          />
        ))}
      </View>
      <View style={tw`flex-row mb-2`}>
        {render((key, value) => (
          <View
            key={key}
            style={tw.style(`min-w-[70px] flex-row items-center`, {
              width: getPercentage(value, total),
            })}>
            <View
              style={tw.style(
                `w-[6px] h-[6px] rounded-full mr-1 bg-[${COLORS[key]}]`,
              )}
            />
            <Text
              style={tw.style(`text-xs font-med`, {
                color: COLORS[key],
              })}>
              {key.slice(0, 1).toUpperCase() + key.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export {ProgressBar};
