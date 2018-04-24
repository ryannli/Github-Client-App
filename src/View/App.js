import React, {
  Component
} from 'react';

import Navigator from './Navigator'

import {
  StyleSheet,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Navigator />
    )
  }
}

// export default Navigator;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
});