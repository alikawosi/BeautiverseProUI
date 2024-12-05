import React, {useEffect} from 'react';
import {View, Pressable, Easing, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TickCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';

const Switch = ({
  size = 10,
  onPress = () => false,
  isActive = false,
  disabled,
  style,
}) => {
  const activeAnimate = React.useRef(
    new Animated.Value(isActive ? 1 : 0),
  ).current;
  const trackWidth = React.useMemo(() => {
    return size * 1.5;
  }, [size]);
  const trackHeight = React.useMemo(() => {
    return size * 0.8;
  }, [size]);

  useEffect(() => {
    Animated.timing(activeAnimate, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.sin),
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const knobAnimStyle = {
    transform: [
      {
        translateX: activeAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [-trackWidth / 1.1, trackWidth / 1.1],
        }),
      },
    ],
  };

  const knobIconAnimStyle = {
    opacity: activeAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const pressHandler = () => {
    isActive === !isActive;
    onPress(isActive);
  };

  return (
    <Pressable
      disabled={disabled}
      style={tw.style(
        'items-center justify-center',
        {
          height: trackHeight * 4.1,
          width: trackWidth * 4.1,
        },
        {'opacity-50': disabled},
        style,
      )}
      onPress={pressHandler}>
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={isActive ? ['#FF6E00', '#FF6E00'] : ['#CACED9', '#CACED9']}
        style={tw`h-[${trackHeight}] w-[${trackWidth}] absolute rounded-[${
          trackHeight / 2
        }] bg-red-300`}
      />
      <Animated.View
        style={tw.style(
          `w-[${size * 0.7}] h-[${size * 0.7}] rounded-[${
            size / 2
          }] bg-white justify-center items-center`,
          knobAnimStyle,
        )}>
        {/* <Animated.View style={knobIconAnimStyle}>
          <TickCircle color="#5948AA" size={size * 2} />
        </Animated.View> */}
      </Animated.View>
    </Pressable>
  );
};

export {Switch};
