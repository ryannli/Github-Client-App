import React, {
  Component,
} from 'react';
import {
  AsyncStorage,
  Linking
} from 'react-native';
import ProfileScreen from '../View/ProfileScreen'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Follower from './Follower'
import Following from './Following'
import {
  followUser,
  unfollowUser
} from '../Utils/gitFollow';
import api from '../Utils/basicApi';

export default class Profile extends Component {

  // Reset navigation options, define tab bar icon
  static navigationOptions = {
    tabBarLabel: Profile,
    tabBarIcon: ({
      tintColor
    }) => (
      <Icon name="user" size={25} color={tintColor}/>
    ),
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.render = this.render.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  // Initialize state to avoid undefined object
  state = {
    isRefreshing: false
  };

  /** Refresh function for regenerating data and refresh page. */
  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this._fetchData();
    this.setState({
      isRefreshing: false
    });
  }

  /** Fetch all required data by Github API. */
  _fetchData() {
    var username = this.props.navigation.state.params.username;
    username = username ? username : "";
    var token = this.props.navigation.state.params.token;
    token = token ? token : "";
    this.setState({
      user: username,
      token: token
    });
    this.setState({
      login: true
    });
    if (token) {
      api.getOwnerProfile(token).then((res => this.setState({
        data: res.data
      })));
    } else if (username) {
      api.getProfile(username).then((res => this.setState({
        data: res.data
      })));
    }

    api.getFollowing(this.props.navigation.state.params.ownername).then((res => this.setState({
      ownerFollowings: res.data.map((item, index) => {
        return res.data[index].login;
      })
    })));
  }

  /** Override componentWillMount function, fetch necessary data by Github api and set states to 
   *  the class. */
  componentWillMount() {
    this._fetchData();

    this.setState({
      // For the icon names to icon base
      icon: {
        "email": "paper-plane",
        "bio": "user",
        "blog": "globe",
        "followers": "user-follow",
        "following": "user-following",
        "public_repos": "share",
        "created_at": "clock"
      },
      // For the entry names presenting on streen
      screenName: {
        "email": "email",
        "bio": "bio",
        "blog": "Website",
        "followers": "Followers count",
        "following": "Following count",
        "public_repos": "Public Repos count",
        "created_at": "Profile create date"
      }
    })
  }

  /** Handle mouse click event on list item. For different item, perform will vary. 
   * @param  item  the name of item
   * @param  info  the link url
   * @param  user  username of the current user
   */
  handleClick = (item, info, user) => {
    if (item == 'followers') {
      // Navigate if the entry is followers
      this.props.navigation.navigate('Follower', {
        username: user,
        'ownername': this.props.navigation.state.params.ownername,
        'ownertoken': this.props.navigation.state.params.ownertoken,
      });
    } else if (item == 'following') {
      // Navigate if the entry is following
      this.props.navigation.navigate('Following', {
        username: user,
        'ownername': this.props.navigation.state.params.ownername,
        'ownertoken': this.props.navigation.state.params.ownertoken,
      });
    } else if (item == 'public_repos') {
      // Navigate if the entry is public_repos
      this.props.navigation.navigate('Repos', {
        username: user,
      });
    } else if (item == 'blog') {
      // Jump to link if the entry is blog and the url is not empty
      if (info) {
        Linking.openURL(info);
      }
    }
  }

  /** Handle mouse    event of following or unfollowing users.  
   * @param  isFollow the boolean of whether the request is "follow"
   * @param  login    the login username of the operated user
   */
  followAction = (isFollow, login) => {
    (isFollow ? followUser(login,
      this.props.navigation.state.params.ownertoken) : unfollowUser(login,
      this.props.navigation.state.params.ownertoken)).then(() => setTimeout(() => api.getFollowing(this.props.navigation.state.params.ownername).then(res => this.setState({
      ownerFollowings: res.data.map((item, index) => {
        return res.data[index].login;
      })
    })), 100))
  }

  /** Render function. */
  render() {
    return (
      <ProfileScreen data={this.state.data} login={this.state.login} handleClick={this.handleClick} user={this.state.user} 
      icon={this.state.icon} screenName={this.state.screenName} ownerFollowings={this.state.ownerFollowings}
      navigation={this.props.navigation} followAction={this.followAction} 
      isRefreshing={this.state.isRefreshing}
      onRefresh={this._onRefresh} />
    )
  }
};