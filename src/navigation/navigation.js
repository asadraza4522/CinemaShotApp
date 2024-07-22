import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import routes from './routes';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import TicketBookingScreen from '../screens/TicketBookingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import MediaLibScreen from '../screens/MediaLibScreen';
import MenuScreen from '../screens/MenuScreen';
import DashboardIcon from '../assets/icons/dashboardIcon';
import WatchIcon from '../assets/icons/watchIcon';
import {theme} from '../theme';
import MediaIcon from '../assets/icons/mediaIcon';
import MenuIcon from '../assets/icons/menuIcon';
import AppText from '../components/AppText';
import {Platform} from 'react-native';
const {colors} = theme;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const isIos = Platform.OS === 'ios';
export default function Navigation() {
  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.black,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 90,
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
        },
      }}>
      <Tab.Screen
        name={routes.DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({focused}) => (
            <DashboardIcon
              fillColor={focused ? colors.white : colors.darkGray}
            />
          ),
          tabBarLabel: ({focused}) => (
            <AppText
              className={`text-xs ${isIos ? '' : 'mb-2'}`}
              style={{
                color: focused ? colors.white : colors.darkGray,
                fontWeight: focused ? '700' : '400',
                paddingTop: isIos ? 4 : 0,
                paddingBottom: isIos ? 0 : 8,
              }}>
              Dashboard
            </AppText>
          ),
        }}
      />
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <WatchIcon fillColor={focused ? colors.white : colors.darkGray} />
          ),
          tabBarLabel: ({focused}) => (
            <AppText
              className={`text-xs ${isIos ? '' : 'mb-2'}`}
              style={{
                color: focused ? colors.white : colors.darkGray,
                fontWeight: focused ? '700' : '400',
                paddingTop: isIos ? 4 : 0,
                paddingBottom: isIos ? 0 : 8,
              }}>
              Home
            </AppText>
          ),
        }}
      />
      <Tab.Screen
        name={routes.MEDIA_LIB_SCREEN}
        component={MediaLibScreen}
        options={{
          title: 'Media Library',
          tabBarIcon: ({focused}) => (
            <MediaIcon fillColor={focused ? colors.white : colors.darkGray} />
          ),
          tabBarLabel: ({focused}) => (
            <AppText
              className={`text-xs ${isIos ? '' : 'mb-2'}`}
              style={{
                color: focused ? colors.white : colors.darkGray,
                fontWeight: focused ? '700' : '400',
                paddingTop: isIos ? 4 : 0,
                paddingBottom: isIos ? 0 : 8,
              }}>
              Media Library
            </AppText>
          ),
        }}
      />
      <Tab.Screen
        name={routes.MORE_MENU_SCREEN}
        component={MenuScreen}
        options={{
          title: 'More',
          tabBarIcon: ({focused}) => (
            <MenuIcon fillColor={focused ? colors.white : colors.darkGray} />
          ),
          tabBarLabel: ({focused}) => (
            <AppText
              className={`text-xs ${isIos ? '' : 'mb-2'}`}
              style={{
                color: focused ? colors.white : colors.darkGray,
                fontWeight: focused ? '700' : '400',
                paddingTop: isIos ? 4 : 0,
                paddingBottom: isIos ? 0 : 8,
              }}>
              More
            </AppText>
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.HOME_TAB} component={TabNavigator} />
        <Stack.Screen
          name={routes.MOVIE_DETAIL}
          component={MovieDetailsScreen}
        />
        <Stack.Screen
          name={routes.TICKET_SCREEN}
          component={TicketBookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
