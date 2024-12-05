import React, {useRef, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View, Image} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {Defs, Mask, Rect, Svg} from 'react-native-svg';
import {ArrowLeft2, FlashCircle} from 'iconsax-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';

import tw from '../../../tailwind';
import {Button} from '../commons';
import {BUSINESSSETUP_CONST} from '../../constants';

const CustomCamera = ({device, isLoading, onSubmit = () => false}) => {
  const {verificationSteps} = BUSINESSSETUP_CONST;
  const cameraRef = useRef();
  const isFocused = useIsFocused();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState({});
  const [checkImag, setCheckImage] = useState(null);
  const {top, bottom} = useSafeAreaInsets();
  const hole = {
    x: 20,
    y: step < 7 ? 190 : 80,
    height: step < 7 ? 200 : 335,
    width: Dimensions.get('window').width - 40,
  };
  const [toggleFlash, setToggleFlash] = useState(false);
  const type = verificationSteps[step]?.type;

  const handleToggleFlash = () => setToggleFlash(!toggleFlash);
  const takePhoto = async () => {
    const {path} = await cameraRef.current.takePhoto({
      flash: toggleFlash ? 'on' : 'off',
    });

    RNFS.readFile(path, 'base64').then(res => {
      let tempImages = {...images};
      switch (step) {
        case 1:
          tempImages.front_card = res;
          setCheckImage(res);
          break;
        case 4:
          tempImages.back_card = res;
          setCheckImage(res);
          break;
        case 7:
          tempImages.user_image = res;
          setCheckImage(res);
          break;
        default:
          break;
      }
      setImages(tempImages);
    });
    // console.log(path);
    setStep(prevSte => (prevSte += 1));
  };
  const handleSubmit = () => {
    if (step !== 8) {
      setCheckImage(null);
      setStep(prevSte => (prevSte += 1));
    } else {
      onSubmit(images);
    }
  };

  const handleRetake = () => {
    setCheckImage(null);
    setStep(prevSte => (prevSte -= 1));
  };
  console.log(step);

  return (
    <View
      style={tw.style('relative flex-1', {
        marginTop: top,
        marginBottom: bottom,
      })}>
      <View style={tw`z-50 flex-1 items-center`}>
        <View
          style={tw`flex-row justify-between items-center pt-4 mb-auto w-full z-10`}>
          <Button
            style={tw`px-5`}
            icon={<ArrowLeft2 size={24} color="white" />}
            onPress={() => setStep(prevSte => (prevSte -= 1))}
          />
          <Button
            style={tw`px-5`}
            onPress={handleToggleFlash}
            icon={<FlashCircle size={26} color="white" />}
          />
        </View>
        {type === 'continue' && (
          <View style={tw`absolute top-[45%]`}>
            {verificationSteps[step].icon}
          </View>
        )}
        <View
          style={tw`w-[60%] absolute items-center mx-auto  top-[${
            hole.height + hole.y + 24
          }px]`}>
          <Text style={tw`text-base font-heading mt-4 text-white`}>
            {verificationSteps[step].title}
          </Text>
          <Text style={tw`text-center text-sm text-white font-med mt-2`}>
            {verificationSteps[step].description}
          </Text>
        </View>
        {(type === 'takePhoto' || type === 'timer') && (
          <TouchableOpacity
            onPress={takePhoto}
            activeOpacity={0.5}
            style={tw`w-16 h-16 border-white p-1 border-opacity-20 border-4 rounded-full absolute bottom-9`}>
            <View style={tw`w-full h-full bg-white rounded-full`} />
          </TouchableOpacity>
        )}
        <View style={tw`flex-row px-3 absolute bottom-6 w-full`}>
          {type === 'check' && (
            <>
              <Button
                title="Retake"
                containerStyle={tw`flex-1 mx-2`}
                titleStyle={tw`bv-sans-base text-white`}
                style={tw`rounded-xl border border-white`}
                onPress={handleRetake}
              />
              <Button
                title="Submit"
                loading={isLoading}
                onPress={handleSubmit}
                titleStyle={tw`bv-sans-base`}
                containerStyle={tw`flex-1 mx-2`}
                style={tw`rounded-xl bg-white`}
              />
            </>
          )}
          {type === 'continue' && (
            <Button
              title="Continue"
              onPress={handleSubmit}
              titleStyle={tw`bv-sans-base`}
              containerStyle={tw`flex-1 mx-2`}
              style={tw`rounded-xl bg-white`}
            />
          )}
        </View>
      </View>

      <Svg width="100%" height="100%" style={tw`absolute top-0 left-0 z-10`}>
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <>
              <Rect width="100%" height="100%" fill="white" />
              <Rect
                rx="16"
                fill="black"
                x={`${hole.x}px`}
                y={`${hole.y}px`}
                width={hole.width}
                height={hole.height}
              />
            </>
          </Mask>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          fill="black"
          mask={type !== 'continue' ? 'url(#mask)' : null}
          fillOpacity="0.7"
        />
      </Svg>
      {/* {type !== 'continue' && (
        <View
          style={tw.style('rounded-2xl border-2 border-white z-20 absolute', {
            top: hole.y,
            left: hole.x,
            width: hole.width,
            height: hole.height,
          })}
        />
      )} */}
      {checkImag ? (
        <Image
          style={tw`w-full h-full absolute`}
          resizeMode="cover"
          source={{uri: `data:image/png;base64,${checkImag}`}}
        />
      ) : (
        <Camera
          photo={true}
          ref={cameraRef}
          device={step < 6 ? device.back : device.front}
          isActive={isFocused}
          style={tw`absolute top-0 left-0 right-0 bottom-0`}
        />
      )}
    </View>
  );
};

export {CustomCamera};
