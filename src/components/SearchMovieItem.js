import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {baseImageUrl} from '../util/Constants';
import Icon from './Icon';
import {theme} from '../theme';

const {colors} = theme;

const {width, height} = Dimensions.get('window');

const SearchMovieItem = ({item, index, handlePress}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <View className="m-3 flex-row items-center">
        <>
          <Image
            className="rounded-3xl self-center"
            style={styles.imageStyle}
            source={{
              uri: item.backdrop_path
                ? `${baseImageUrl}${item.backdrop_path}`
                : 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=',
            }}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={['transparent', 'rgb(0,0,0)']}
            className="absolute bottom-0 rounded-3xl self-center"
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.background}
          />
        </>
        <View className="m-3 flex-1">
          <Text className="my-1 text-base font-semibold text-black">
            {item.title}
          </Text>
          <Text className="my-1 text-base font-semibold">
            {item.release_date}
          </Text>
          <Text className="my-1 text-base font-semibold">
            {item.vote_average} / 10, votes: ({item.vote_count})
          </Text>
        </View>
        <TouchableOpacity className="flex-0.2 mr-2 p-2">
          <Icon
            icon="dots-three-horizontal"
            iconType="Entypo"
            iconSize={25}
            iconColor={colors.lightBlue}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchMovieItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.35,
    height: width * 0.35,
  },
  background: {
    width: width * 0.35,
    height: width * 0.35,
  },
});
