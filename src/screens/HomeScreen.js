import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import MovieItem from '../components/MovieItem';
import {theme} from '../theme';
import {movieGenresList} from '../util/Constants';
import routes from '../navigation/routes';
import MovieGenreItem from '../components/MovieGenreItem';
import useApi from '../api/request';
import SearchMovieItem from '../components/SearchMovieItem';
import Loading from '../components/Loading';

const {colors} = theme;

const HomeScreen = ({navigation, route}) => {
  const api = useApi();
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isShowingSearchBar, setIsShowingSearchBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleMoviePress = item => {
    navigation.navigate(routes.MOVIE_DETAIL, {item});
  };
  const onSearch = useCallback(searchValue => {
    console.log('🚀 ~ onSearch ~ searchValue:', searchValue);
    setSearchValue(searchValue);
  }, []);
  const getMoviesListFun = useCallback(async () => {
    api
      .getMoviesList()
      .then(movies => {
        if (movies?.results) {
          // console.log('movies >>', movies?.results);
          setUpComingMovies(movies?.results);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    getMoviesListFun();
  }, []);
  useEffect(() => {
    if (searchValue) {
      api.searchMovies(searchValue).then(results => {
        if (results?.results) {
          setSearchMovies(results?.results);
        }
      });
    }
  }, [searchValue]);

  const handleShowSearchBar = useCallback(isVisible => {
    setIsShowingSearchBar(isVisible);
    if (!isVisible) {
      setSearchMovies([]);
    }
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView>
        <Header
          titleStyle="text-xl font-bold"
          title={'Watch'}
          onSearch={onSearch}
          handleShowSearchBar={handleShowSearchBar}
        />
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.listView}>
          {searchValue?.length == 0 && !isShowingSearchBar ? (
            <FlatList
              data={upComingMovies}
              renderItem={({item, index}) => (
                <MovieItem
                  item={item}
                  index={index}
                  handlePress={handleMoviePress}
                />
              )}
              keyExtractor={(item, index) => item.id?.toString()}
            />
          ) : isShowingSearchBar && searchMovies?.length == 0 ? (
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.column}>
                {movieGenresList
                  .filter((_, index) => index % 2 === 0)
                  .map((item, index) => (
                    <MovieGenreItem
                      key={item.id}
                      item={item}
                      index={index}
                      handlePress={() => {}}
                    />
                  ))}
              </View>
              <View style={styles.column}>
                {movieGenresList
                  .filter((_, index) => index % 2 !== 0)
                  .map((item, index) => (
                    <MovieGenreItem
                      key={item.id}
                      item={item}
                      index={index}
                      handlePress={() => {}}
                    />
                  ))}
              </View>
            </ScrollView>
          ) : (
            <FlatList
              data={searchMovies}
              renderItem={({item, index}) => (
                <SearchMovieItem
                  item={item}
                  index={index}
                  handlePress={handleMoviePress}
                />
              )}
              keyExtractor={(item, index) => item.id?.toString()}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    marginTop: -20,
    marginBottom: 90,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  column: {
    flex: 1,
  },
  genreItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  genreImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  genreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
