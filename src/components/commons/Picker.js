import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from 'react';
import {Animated, Pressable, ScrollView, Text, View} from 'react-native';

import tw from '../../../tailwind';
import {Input} from './Input';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';

const ValueContext = createContext();
const ITEM_HEIGHT = 40;

const Picker = ({style, children, onChange = () => null, required}) => {
  const [state, setState] = useState({});
  const value = useMemo(() => ({state, setState}), [state, setState]);

  useEffect(() => {
    if (Boolean(Object.keys(state).length)) {
      onChange(state);
    }
  }, [state]);

  return (
    <ScrollView
      horizontal={true}
      style={tw`w-full`}
      contentContainerStyle={tw`w-full`}>
      <View style={tw.style('flex-row flex-1 items-center ', style)}>
        <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
      </View>
    </ScrollView>
  );
};

const Column = ({
  data,
  name,
  style,
  prefixStyle,
  suffixStyle,
  value = null,
  prefix = null,
  suffix = null,
  itemVisibilty = 5,
}) => {
  const {state, setState} = useContext(ValueContext);
  const flatListEle = useRef();
  const onMomentum = useRef(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const containerHeight = useMemo(
    () => itemVisibilty * ITEM_HEIGHT,
    [itemVisibilty],
  );

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
    },
  );
  const onMomentumScrollEnd = useCallback(
    ({nativeEvent: {contentOffset}}) => {
      if (onMomentum.current) {
        const selectedIndex = Math.round(contentOffset.y / ITEM_HEIGHT);
        setState(prevState => ({
          ...prevState,
          [name]: data[selectedIndex]?.value,
        }));
      }
      onMomentum.current = false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const onMomentumScrollBegin = useCallback(() => {
    onMomentum.current = true;
  }, []);

  useEffect(() => {
    if (value !== null && value !== state[name]) {
      setState(prevState => ({
        ...prevState,
        [name]: value,
      }));

      const index = data.findIndex(item => item?.value === value) || 0;
      if (index >= 0) {
        flatListEle.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
      }
    }
  }, [value]);

  return (
    <View style={tw`flex-1 flex-row`}>
      {prefix && (
        <Picker.Context
          style={tw.style(`text-sm flex-grow-0 self-center`, prefixStyle)}>
          {prefix}
        </Picker.Context>
      )}
      <Animated.FlatList
        ref={flatListEle}
        onScroll={onScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        snapToInterval={ITEM_HEIGHT}
        getItemLayout={(_, index) => ({
          index,
          length: ITEM_HEIGHT,
          offset: index * ITEM_HEIGHT,
        })}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onMomentumScrollBegin={onMomentumScrollBegin}
        style={tw`flex-1 h-[${containerHeight}px]`}
        contentContainerStyle={tw.style(
          {
            paddingVertical: containerHeight / 2 - ITEM_HEIGHT / 2,
          },
          style,
        )}
        data={data}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * ITEM_HEIGHT,
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
            (index + 2) * ITEM_HEIGHT,
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.2, 0.5, 1, 0.5, 0.2],
          });

          return (
            <Animated.View
              style={tw.style('flex-row items-center', {
                opacity,
                height: ITEM_HEIGHT,
              })}>
              <Picker.Context>{item?.title || item.value}</Picker.Context>
            </Animated.View>
          );
        }}
      />
      {suffix && (
        <Picker.Context
          style={tw.style(`text-sm flex-grow-0 self-center `, suffixStyle)}>
          {suffix}
        </Picker.Context>
      )}
    </View>
  );
};

const Wrapper = ({style, children}) => {
  return (
    <View style={tw.style('flex-row flex-1 items-center relative')}>
      <View
        pointerEvents="none"
        style={tw.style(
          'absolute bg-selectedGray left-0 right-0 rounded-lg',
          style,
          {
            height: ITEM_HEIGHT,
          },
        )}
      />
      {children}
    </View>
  );
};

const Context = ({style, children}) => (
  <Text
    style={tw.style(
      'font-sans text-black text-base text-center flex-grow',
      style,
    )}>
    {children}
  </Text>
);

const Seprator = ({style, value = 'to'}) => (
  <Text style={tw.style('text-sm text-[#CACED9] ', style)}>{value}</Text>
);

const InputAccordion = ({
  lable,
  style,
  value,
  children,
  hasError,
  required,
  onChange = () => null,
}) => {
  const [open, setOpen] = useState(false);
  const handlePress = useCallback(() => setOpen(!open), [open]);

  return (
    <Picker style={tw.style(style)} onChange={onChange}>
      <View style={tw`flex-1 py-2`}>
        <View style={tw`w-full relative`}>
          <Input
            readOnly
            labelFix={Boolean(value)}
            formValue={Boolean(value) ? value : ''}
            hasError={hasError}
            required={required}
            suffix={
              open ? (
                <ArrowUp2 size={18} color="#717171" />
              ) : (
                <ArrowDown2 size={18} color="#717171" />
              )
            }
            label={lable}
            style={tw`rounded-lg opacity-100`}
          />
          <Pressable
            onPress={handlePress}
            style={tw`absolute top-0 left-0 right-0 bottom-0 z-20`}
          />
        </View>
        <View
          style={tw.style('overflow-hidden flex-row', {
            maxHeight: open ? '100%' : 0,
          })}>
          {children}
        </View>
      </View>
    </Picker>
  );
};

Picker.Column = Column;
Picker.Wrapper = Wrapper;
Picker.Context = Context;
Picker.Seprator = Seprator;
Picker.InputAccordion = InputAccordion;

export {Picker};
