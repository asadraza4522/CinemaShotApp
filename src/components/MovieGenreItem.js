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

const MovieGenreItem = ({item, index, handlePress}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <View className="m-2">
        <Image
          className="rounded-xl self-center"
          style={styles.imageStyle}
          source={{uri: `${item.image}`}}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'rgb(0,0,0)']}
          className="absolute bottom-0 rounded-xl self-center"
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.background}
        />
        <View className="absolute bottom-6 left-4">
          <Text className="text-xl font-semibold text-white">{item.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieGenreItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.46,
    height: width * 0.3,
  },
  background: {
    width: width * 0.46,
    height: width * 0.25,
  },
});
