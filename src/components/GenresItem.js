import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../theme';
import AppText from './AppText';

const {colors} = theme;

const GenresItem = ({item, index}) => {
  const colorsList = [
    colors.lightGreen,
    colors.pink,
    colors.purple,
    colors.darkGolden,
  ];

  return (
    <View
      className="mr-2 px-2 py-1 rounded-3xl items-center"
      style={{
        backgroundColor: colorsList[index % colorsList.length],
        flexGrow: 1,
        minWidth: 100,
      }}>
      <AppText classStyle={'text-sm font-black text-white'}>
        {item.name}
      </AppText>
    </View>
  );
};

export default GenresItem;

const styles = StyleSheet.create({});
