import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Animated, {FadeInLeft, Layout} from 'react-native-reanimated';

import tw from '../../../tailwind';

const TabBar = ({
  children,
  style,
  gap = 12,
  itemStyle,
  textStyle,
  activeItemStyle = '',
  radius = 'rounded-full',
  activeColor = '#FF6E00',
  deactiveColor = '#7A7A8A',
  options = null,
}) => {
  const [active, setActive] = useState(0);
  const childs = React.Children.toArray(children);
  const tabs = options || childs.map(item => item.props.options);

  return (
    <View>
      <View
        style={[
          tw.style(
            'flex-row justify-center p-1 w-full bg-[#EDEDED] h-12',
            radius,
            style,
          ),
          {marginBottom: childs.length !== 0 ? gap : 0},
        ]}>
        {tabs.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setActive(index);
              if (item.onPress) {
                item.onPress();
              }
            }}
            style={tw.style(
              'justify-center flex-1 items-center px-2 flex-row overflow-hidden',
              {
                'bg-white shadow-md': index === active,
                [activeItemStyle]: index === active,
              },
              radius,
              itemStyle,
            )}>
            {item.icon && !active ? (
              <Animated.View entering={FadeInLeft}>{item.icon}</Animated.View>
            ) : null}
            <Animated.Text
              layout={Layout.springify()}
              style={[
                tw.style('font-heading text-sm ml-1', textStyle),
                {color: index === active ? activeColor : deactiveColor},
              ]}>
              {item.title}
            </Animated.Text>
          </Pressable>
        ))}
      </View>
      {childs.length !== 0 ? (
        <View>{React.Children.toArray(children)[active]}</View>
      ) : null}
    </View>
  );
};

export {TabBar};
