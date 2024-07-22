import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Icon from '../components/Icon';
import {theme} from '../theme';
import {baseImageUrl} from '../util/Constants';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import GenresItem from '../components/GenresItem';
import useApi from '../api/request';
import TrailerModal from '../components/TrailerModal';
import routes from '../navigation/routes';
const {colors} = theme;
const {width, height} = Dimensions.get('window');

const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const {params: data} = useRoute();
  const api = useApi();
  const [item, setItem] = useState(data?.item);
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState(null);
  useEffect(() => {
    api.getMovieDetails(item.id).then(result => {
      if (result) {
        // console.log('🚀 ~ api.getMovieDetails ~ result:', result);
        setItem(result);
      }
    });
    api.getMovieTrailers(item.id).then(result => {
      if (result?.results?.length > 0) {
        const trailer = result?.results.find(
          item => item.site == 'YouTube' && item.type == 'Trailer',
        );
        // console.log('🚀 ~ api.getMovieTrailers ~ result:', trailer);
        setMovieTrailer(trailer);
      }
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}} className="flex-1">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row items-center px-4 ">
          <TouchableOpacity
            className="rounded-3xl p-2 mr-8"
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Icon
              icon="chevron-left"
              iconType="FontAwesome5"
              iconColor={colors.white}
              iconSize={22}
            />
          </TouchableOpacity>
          <AppText classStyle={'text-2xl font-bold text-white'}>
            {'Watch'}
          </AppText>
        </SafeAreaView>
        <View>
          <Image
            source={{
              uri: item?.poster_path
                ? `${baseImageUrl}${item?.poster_path}`
                : 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=',
            }}
            style={{width, height: height * 0.55}}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={['transparent', 'rgb(0,0,0)']}
            className="absolute bottom-0 self-center"
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.background}
          />
          <View className="justify-center items-center absolute bottom-10 w-full">
            <AppText classStyle={'text-3xl font-bold text-white'}>
              {item.title}
            </AppText>
            <AppText classStyle={'text-xl font-bold text-white my-2'}>
              {`In theaters ${moment(item?.release_date).format(
                'MMMM DD, YYYY',
              )}`}
            </AppText>
            <TouchableOpacity
              className="rounded-xl p-3 mt-2 w-2/3 items-center"
              style={{backgroundColor: colors.lightBlue}}
              onPress={() => navigation.navigate(routes.TICKET_SCREEN, {item})}>
              <AppText classStyle={'text-2xl font-bold text-white'}>
                {'Get Tickets'}
              </AppText>
            </TouchableOpacity>
            {movieTrailer && (
              <TouchableOpacity
                className="rounded-xl p-3 w-2/3 items-center my-3 flex-row justify-center"
                style={{borderColor: colors.lightBlue, borderWidth: 1}}
                onPress={() => setShowTrailer(true)}>
                <Icon
                  icon="play"
                  iconType="Ionicons"
                  iconColor={colors.white}
                  iconSize={18}
                />
                <AppText classStyle={'text-xl font-bold text-white ml-2'}>
                  {'Watch Trailer'}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="p-8">
          <AppText classStyle={'text-xl mb-4 font-bold'}>{'Genres'}</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.genres?.length > 0 &&
              item.genres.map((genres, index) => (
                <GenresItem item={genres} index={index} key={index} />
              ))}
          </ScrollView>
          <View
            className="w-full h-0.5 my-6"
            style={{backgroundColor: colors.lightGray}}
          />
          <AppText classStyle={'text-xl mb-4 font-bold'}>{'Overview'}</AppText>
          <AppText classStyle={'text-sm mb-4'} style={{color: colors.darkGray}}>
            {item.overview}
          </AppText>
        </View>
        {showTrailer && (
          <TrailerModal
            isVisible={showTrailer}
            setIsVisible={setShowTrailer}
            title={item.title}
            videoKey={movieTrailer.key}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default memo(MovieDetailsScreen);

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height * 0.55,
  },
});
