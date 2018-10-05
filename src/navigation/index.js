import React from 'react'
import { 
    createStackNavigator, 
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator 
} from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import SettingScreen from '../screens/Settings';
import Profile from '../screens/ProfileDrawer';

import {MaterialIcons, FontAwesome } from '@expo/vector-icons';

import * as NAV_TYPES from './navTypes';

const Feed = createStackNavigator({
    [NAV_TYPES.NEWS_FEED]: {
        screen: NewsFeedScreen
    }
}, {
    headerMode: 'none'
})

const FeedWithProfile = createDrawerNavigator({
    NewsWithProfile: Feed
}, {
    contentComponent: Profile,
    drawerWidth: 275,
    drawerPosition: 'left',
})

const MainTab = createBottomTabNavigator({
    [NAV_TYPES.NEWS_FEED_WITH_PROFILE]: FeedWithProfile,
    [NAV_TYPES.SETTINGS]: {
        screen: SettingScreen
    },
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;

          if (routeName === NAV_TYPES.NEWS_FEED_WITH_PROFILE) {
            return <FontAwesome name={`newspaper-o`} size={25} color={tintColor} />;
          } else if (routeName === NAV_TYPES.SETTINGS) {
            return <MaterialIcons name={`settings`} size={25} color={tintColor} />;
          }

        },
      })
});


const StarterStack = createStackNavigator({
    [NAV_TYPES.WELCOME_SCREEN]: {
        screen: WelcomeScreen
    },
    [NAV_TYPES.SIGN_IN]: {
        screen: SignUpScreen
    }
}, {
    initialRouteName: NAV_TYPES.WELCOME_SCREEN,
    headerMode: 'none'
})


const RootNavigator = createSwitchNavigator({
    [NAV_TYPES.LOGIN_FLOW]: StarterStack,
    [NAV_TYPES.MAIN_FLOW]: MainTab
})

export default RootNavigator;