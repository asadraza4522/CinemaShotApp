import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import React, {useDeferredValue, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from './Icon';
import {theme} from '../theme';
import AppText from './AppText';
const {colors} = theme;
const isIos = Platform.OS === 'ios';
export default function Header({
  title = '',
  titleStyle = '',
  onSearch,
  loading = false,
  style,
  inputStyle,
  placeholderTextColor = 'gray',
  showBackBtn = false,
  searchBarStyle,
  defaultSearch = '',
  backBtnColor = 'black',
  searchBtnStyle = {},
  onBackPress = '',
  handleShowSearchBar,
  disabledSearched = false,
}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const deferredSearchValue = useDeferredValue(search);
  const textRef = useRef(null);
  const onBack = () => {
    textRef?.current?.clear();
    setSearch('');
    onBackPress ? onBackPress() : navigation.goBack();
  };

  useEffect(() => {
    const delaySearched = setTimeout(() => {
      deferredSearchValue?.length > 0
        ? onSearch(deferredSearchValue)
        : textRef?.current?.focused && onSearch('');
    }, 500);
    return () => clearTimeout(delaySearched);
    // onSearch(deferredSearchValue);
  }, [deferredSearchValue]);

  if (!showSearchBar) {
    return (
      <View
        className={`flex-row p-4 justify-between items-center ${
          isIos ? '' : 'm-4'
        }`}>
        <AppText classStyle={titleStyle}>{title}</AppText>
        <TouchableOpacity
          disabled={disabledSearched}
          onPress={() => {
            setShowSearchBar(true);
            handleShowSearchBar(true);
          }}>
          <Icon
            icon="search"
            iconType="Feather"
            iconSize={25}
            iconColor={'black'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      className={`flex-row justify-between items-center h-20 ${
        isIos ? 'mx-2' : 'm-4'
      }`}
      style={[styles.container, style]}>
      {showBackBtn && (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
          <Icon
            icon="chevron-left"
            iconType="FontAwesome5"
            iconColor={backBtnColor}
            iconSize={25}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.searchBar, searchBarStyle]}>
        {loading ? (
          <View style={styles.searchBtn}>
            <ActivityIndicator size="small" color={'black'} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.searchBtn, searchBtnStyle]}
            onPress={() => onSearch(search)}
            disabled={disabledSearched}>
            <Icon
              icon="search"
              iconType="Feather"
              iconSize={25}
              iconColor={'black'}
            />
          </TouchableOpacity>
        )}
        <TextInput
          defaultValue={defaultSearch}
          placeholder={'TV shows, movies and more'}
          style={[styles.input, inputStyle]}
          placeholderTextColor={placeholderTextColor}
          onChangeText={value => setSearch(value)}
          onEndEditing={() => console.log('Call Search Now >> ', search)}
          ref={textRef}
        />
        <TouchableOpacity
          onPress={() => {
            textRef.current.clear();
            setSearch('');
            onSearch('');
            setShowSearchBar(false);
            handleShowSearchBar(false);
          }}>
          <Icon
            icon="close"
            iconType="AntDesign"
            iconSize={30}
            iconColor={'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 60,
    backgroundColor: 'rgba(218, 218, 218, 0.5)',
    borderRadius: 50,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    elevation: 5,
  },
  searchBtn: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 30,
  },
  input: {
    width: '80%',
    height: 35,
    padding: 0,
    margin: 0,
    paddingHorizontal: 5,
    fontSize: 16,
    color: 'black',
  },
  backBtn: {
    marginRight: 7,
  },
  filterBtnView: {
    marginHorizontal: 5,
    padding: 8,
  },
});
