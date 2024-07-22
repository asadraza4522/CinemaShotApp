import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Header from '../components/Header';

const MediaLibScreen = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView>
        <Header
          titleStyle="text-xl font-bold"
          title={'Media'}
          disabledSearched={true}
        />
      </SafeAreaView>
      <View className="flex-1 justify-center items-center">
        <AppText className="text-2xl">Media Library Screen</AppText>
      </View>
    </View>
  );
};

export default MediaLibScreen;
