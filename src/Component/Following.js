import React, {
  Component
} from 'react';
import {
  AsyncStorage
} from 'react-native';
import {
  getOwnerFollowings,
} from '../Utils/gitFollow';

import {
  SafeAreaView
} from "react-navigation"

import api from '../Utils/basicApi';
import FollowScreen from '../View/FollowScreen'

export default class Following extends Component {
  constructor() {
    super();
    this._onRefresh = this._onRefresh.bind(this);
  }
  // Initialize state to avoid undefined object
  state = {
    isRefreshing: false,
  };

  /** Refresh function for regenerating data and refresh page. */
  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    var username = this.props.navigation.state.params.username ? this.props.navigation.state.params.username : '';
    ((username == this.props.navigation.state.params.ownername) ?
      getOwnerFollowings(username, this.props.navigation.state.params.ownertoken) : api.getFollowing(username))
    .then((res => {
      if (username == this.props.navigation.state.params.ownername) {
        AsyncStorage.setItem('@githubClient:ownerfollowing', JSON.stringify(res.data));
      }
      this.setState({
        data: res.data,
        isRefreshing: false,
      })
    }));
  }

  /** Override componentWillMount function and fetch necessary data by Github api. */
  componentWillMount() {
    var username = this.props.navigation.state.params.username ? this.props.navigation.state.params.username : '';
    AsyncStorage.getItem('@githubClient:ownerfollowing')
      .then((value) => {
        if (value && (username == this.props.navigation.state.params.ownername)) {
          // Use data from storage if it is already stored
          this.setState({
            data: JSON.parse(value)
          })
        } else {
          // Fetch data from github api
          ((username == this.props.navigation.state.params.ownername) ?
            getOwnerFollowings(username, this.props.navigation.state.params.ownertoken) : api.getFollowing(username))
          .then((res => {
            if (username == this.props.navigation.state.params.ownername) {
              AsyncStorage.setItem('@githubClient:ownerfollowing', JSON.stringify(res.data));
            }
            this.setState({
              data: res.data
            })
          }));
        }
      });
  }

  /** Render function. */
  render() {
    return (
      <FollowScreen data={this.state.data} 
      navigation={this.props.navigation} 
      isRefreshing={this.state.isRefreshing}
      onRefresh={this._onRefresh} />
    )
  }
}