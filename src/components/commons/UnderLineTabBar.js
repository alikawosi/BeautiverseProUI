import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import {PercentageCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';

const UnderLineTabBar = ({
  data,
  gutter = 20,
  containerStyle,
  contentContainerStyle,
  onPressTab = () => false,
  underLineHasItemWidth = false,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const scrollerRef = useRef();
  const widthList = useRef({});
  const [activeTab, setActiveTab] = useState(data[0]?.id);
  const translateAnim = useRef(new Animated.Value(0)).current;
  const underLineWidth = useRef(
    underLineHasItemWidth ? new Animated.Value(0) : 8,
  ).current;

  const animStyle = id => {
    const selected = widthList.current[id];

    Animated.timing(translateAnim, {
      duration: 300,
      useNativeDriver: false,
      toValue:
        selected?.x +
        (selected?.w - (underLineHasItemWidth ? selected?.w : 8)) / 2,
    }).start();

    if (underLineHasItemWidth) {
      Animated.timing(underLineWidth, {
        duration: 300,
        useNativeDriver: false,
        toValue: selected?.w,
      }).start();
    }
    scrollerRef.current.scrollTo({
      x: selected?.x - windowWidth / 2 + selected?.w / 2 + gutter,
      y: 0,
    });
  };

  return (
    <View style={tw.style('justify-center', containerStyle)}>
      <ScrollView
        contentContainerStyle={tw.style(
          'flex-row items-start border-b border-grayBorder/30 pb-2',
          contentContainerStyle,
        )}
        horizontal
        ref={scrollerRef}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          const {id, icon, title} = item;

          return (
            <Pressable
              onLayout={({nativeEvent: {layout}}) => {
                widthList.current[id] = {
                  x: layout.x,
                  w: layout.width,
                };
                if (index === data.length - 1) {
                  animStyle(activeTab);
                }
              }}
              onPress={() => {
                animStyle(id);
                setActiveTab(id);
                onPressTab(item);
              }}
              key={id}
              style={tw.style('flex-row items-center', {
                'ml-5': index >= 1,
              })}>
              {icon ? (
                <PercentageCircle
                  size={15}
                  style={tw`mr-1`}
                  color={activeTab === id ? '#D31F65' : '#414141'}
                />
              ) : null}
              <Text
                style={tw.style('font-sans text-sm text-gray-500', {
                  'text-primary': id === activeTab,
                })}>
                {title}
              </Text>
            </Pressable>
          );
        })}
        <Animated.View
          style={tw.style('h-0.5 bg-primary absolute bottom-0', {
            width: underLineWidth,
            transform: [
              {
                translateX: translateAnim,
              },
            ],
          })}
        />
      </ScrollView>
    </View>
  );
};

export {UnderLineTabBar};
