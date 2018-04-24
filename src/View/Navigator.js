import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import Profile from '../Component/Profile'
import Repository from '../Component/Repository'
import LoginScreen from './LoginScreen'

import Follower from '../Component/Follower'
import Following from '../Component/Following'

// Define tab navigators with profile and repository tabs
const TabScreen = TabNavigator({
  Profiles: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
      headerStyle: {
        paddingLeft: 6
      }
    }
  },
  Repos: {
    screen: Repository,
    navigationOptions: {
      title: 'Repository',
      headerStyle: {
        paddingLeft: 6,
        /*height=30*/
      }
    }
  },
})

// Define stack nabigator for login sreen, tab screen, follower/following screen
const Navigator = StackNavigator({
  // Starts from login screen
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  TabScreen: {
    screen: TabScreen
  },

  Follower: {
    screen: Follower,
    navigationOptions: {
      title: 'Follower'
    }
  },
  Following: {
    screen: Following,
    navigationOptions: {
      title: 'Following'
    }
  },
}, {
  headerMode: 'screen'
});

// Export class and render navigator
export default class SimpleApp extends Component {
  render() {
    return (
      <Navigator/>
    )
  }
};

AppRegistry.registerComponent('Assignment3', () => Tab);
AppRegistry.registerComponent('Assignment3', () => SimpleApp);