import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {theme} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from './Icon';
import AppText from './AppText';
const {colors} = theme;
const {width, height} = Dimensions.get('window');

export default function PaymentModal({
  isVisible = false,
  setIsVisible,
  bgColor,
}) {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={'white'}
      animationType={'slide'}
      swipeDirection={['down']}
      onSwipeComplete={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      propagateSwipe
      transparent={true}>
      <View
        className="p-2 h-2/5 self-center justify-center item-center rounded-2xl"
        style={[
          {
            backgroundColor: bgColor ? bgColor : colors.purple,
            marginTop: height / 4,
            width: width * 0.9,
          },
        ]}>
        <SafeAreaView className="w-full flex-row justify-center items-center m-2">
          <TouchableOpacity
            className="absolute rounded-3xl p-2 right-2"
            onPress={() => setIsVisible(false)}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Icon
              icon="close"
              iconType="AntDesign"
              iconSize={30}
              iconColor={colors.white}
            />
          </TouchableOpacity>
          <AppText classStyle={'text-2xl font-bold text-white'}>
            Payment
          </AppText>
        </SafeAreaView>
        <View className="flex-1 items-center justify-center">
          <Image
            source={require('../assets/sucess_image.png')}
            resizeMode="contain"
            style={{width: '50%', height: '50%'}}
          />
          <AppText
            classStyle={'text-2xl font-bold text-white text-center mt-2'}>
            Payment Successful!
          </AppText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
});
