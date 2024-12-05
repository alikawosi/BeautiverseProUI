import React from 'react';
import Animated, {FadeInUp, Easing} from 'react-native-reanimated';

const TabBarItem = ({children, style, onPress = () => false}) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(350).easing(Easing.cubic(Easing.out))}
      style={style}>
      {children}
    </Animated.View>
  );
};

export {TabBarItem};
