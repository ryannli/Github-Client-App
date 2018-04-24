import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Navigator,
  Linking,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import PropTypes from 'prop-types';
import {
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Container,
  Content,
  Thumbnail
} from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  StackNavigator,
  SafeAreaView
} from "react-navigation";
import moment from 'moment';
import {
  followUser,
  unfollowUser
} from '../Utils/gitFollow';
import api from '../Utils/basicApi';

// Define style sheet
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    padding: 12
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    height: null,
    width: null,
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 3,
    width: 200,
    fontFamily: 'Palatino',
  },
  username: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 3,
    width: 200,
    color: '#9E9E9E',
    fontFamily: 'Palatino',
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#03A9F4',
  },
  follow: {
    textAlign: 'center',
    paddingLeft: 12,
  }
});

export default class Profile extends Component {
  /** Render function. */
  render() {
    var userInfo = this.props.data;

    // The information to retrieve
    var entryArr = ['email', 'bio', 'blog', 'followers', 'following', 'public_repos', 'created_at'];
    // Check if data is ready; otherwise, show "loading" on screen
    var list = userInfo && this.props.login ? entryArr.map((item, index) => {
      return (
        <ListItem icon={true} onPress={() => {this.props.handleClick(item, userInfo[item], this.props.user)}} key={item}>
              <Left>
                <Icon name={this.props.icon[item]} size={22} />
              </Left>
              <Body>
                    <Text>
                      {this.props.screenName[item].toUpperCase()}
                    </Text>
              </Body>
              <Right>
                    <Text>{item == 'created_at'? // Reformat the content to data
                      moment(userInfo[item]).format('LL'):userInfo[item]}</Text>
              </Right>
            </ListItem>
      )
    }) : <Text>loading</Text>;

    // Generates the top avatar, name and username 
    var avatar = userInfo ? <Body style={styles.rowContainer}>     
                                   <Thumbnail large source={{uri: userInfo['avatar_url']}} /> 
                                   <Text style={styles.headline}> {userInfo['name']} </Text>
                                   <Text style={styles.username}> {userInfo['login']} </Text>
                             </Body> :
      <View/>
    var ownerFollowings = this.props.ownerFollowings;
    var actionButtion = <View/>;
    if (userInfo && ownerFollowings && this.props.navigation.state.params.ownername.toLowerCase() != userInfo['login']) {
      if (ownerFollowings.includes(userInfo['login'])) {
        // The user is already followed
        actionButtion = <Button iconLeft block danger onPress={() => {this.props.followAction(false, userInfo['login'])}}>
            <Icon name='user-unfollow' size={25} />
            <Text style={styles.follow}>Unfollow</Text>
          </Button>;
      } else {
        // The user is unfollowed
        actionButtion = <Button iconLeft block success onPress={() => {this.props.followAction(true, userInfo['login'])}}>
            <Icon name='user-follow' size={25} />
            <Text style={styles.follow}>Follow</Text>
          </Button>;
      }

    }

    return (
      <SafeAreaView style={styles.safeArea}>
                <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh={this.props.onRefresh}
          />
        }>
           <Content style={styles.container}>
            {avatar}
            <List>
              {list}  
            </List>
          </Content>
          {actionButtion}
          </ScrollView>
        </SafeAreaView>
    )
  }
};