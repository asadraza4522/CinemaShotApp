import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {theme} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from './Icon';
import AppText from './AppText';
const {colors} = theme;
const ios = Platform.OS === 'ios';

export default function TrailerModal({
  isVisible = false,
  setIsVisible,
  bgColor,
  videoKey = '',
  title = '',
}) {
  console.log('🚀 ~ videoKey:', videoKey);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
    }
  }, []);
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
        className="p-2 h-full w-full"
        style={[{backgroundColor: bgColor ? bgColor : colors.black}]}>
        <SafeAreaView
          className={`absolute z-20 w-full flex-row items-center px-4 ${
            ios ? 'mt-16' : 'mt-4'
          }`}>
          <TouchableOpacity
            className="rounded-3xl p-2 mr-8"
            onPress={() => setIsVisible(false)}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Icon
              icon="close"
              iconType="AntDesign"
              iconSize={25}
              iconColor={colors.white}
            />
          </TouchableOpacity>
          <AppText classStyle={'text-2xl font-bold text-white text-center'}>
            {title}
          </AppText>
        </SafeAreaView>
        <View className="flex-1 mt-28 items-center justify-center">
          <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
            <YoutubePlayer
              height={300}
              play={true}
              videoId={videoKey}
              onChangeState={onStateChange}
            />
          </View>
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
