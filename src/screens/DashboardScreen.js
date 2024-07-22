import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';

const DashboardScreen = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView>
        <Header
          titleStyle="text-xl font-bold"
          title={'Home'}
          disabledSearched={true}
        />
      </SafeAreaView>
      <View className="flex-1 justify-center items-center">
        <AppText className="text-2xl">Dashboard Screen</AppText>
      </View>
    </View>
  );
};

export default DashboardScreen;
