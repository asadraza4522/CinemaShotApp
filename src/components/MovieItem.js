import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {baseImageUrl} from '../util/Constants';

const {width, height} = Dimensions.get('window');

const MovieItem = ({item, index, handlePress}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <View className="m-3">
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
        <View className="absolute bottom-5 left-8">
          <Text className="text-xl font-semibold text-white">{item.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.9,
    height: width * 0.45,
  },
  background: {
    width: width * 0.9,
    height: width * 0.25,
  },
});
