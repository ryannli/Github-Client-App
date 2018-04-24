import React, {
  Component
} from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-swipeable';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import {
  SafeAreaView
} from "react-navigation"
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
  Content
} from 'native-base';
import {
  starRepo,
  unstarRepo,
  getStarRepo
} from '../Utils/gitStar';
import api from '../Utils/basicApi';

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  stars: {
    fontSize: 15,
    paddingBottom: 5
  },
  description: {
    color: '#9E9E9E',
    fontSize: 14,
    paddingBottom: 5,
  },
  safeArea: {
    flex: 1,
  },
  leftSwipeItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10
  },
  swipeUnstarText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    textAlign: 'center'
  },
  swipeStarText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    textAlign: 'center',
    paddingLeft: 8,
  },
  swipteButton: {
    paddingLeft: 12
  }
});


export default class Repository extends Component {
  /** Generate the repositroy swipe button
   * @param repoOwner           the owner of repository 
   * @param repo                the repository name 
   * @param ownerStarredRepos   the dictionary of starred repository names
   * @param starAction          the function for starring and unstarring behavior
   * @return the promise of http request result
   */
  getRepoSwipeButton(repoOwner, repo, ownerStarredRepos, starAction) {
    if (ownerStarredRepos && ownerStarredRepos.includes(repo)) {
      // Show unstar button
      return <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'red'}]} onPress={() => {starAction(true, repoOwner, repo)}}>
          <Button transparent style={styles.swipteButton}>
            <FontAwesome name='star-o' size={30} />
          </Button>
          <Text style={styles.swipeUnstarText}>Unstar</Text>
        </TouchableOpacity>;
    } else {
      // Show star button
      return <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'gold'}]} onPress={() => {starAction(false, repoOwner, repo)}}>
          <Button transparent style={styles.swipteButton}>
            <FontAwesome name='star' size={30} />
          </Button>
          <Text style={styles.swipeStarText}>Star</Text>
        </TouchableOpacity>;
    }
  }

  /** Render function. */
  render() {
    var repos = this.props.data;

    // Check if data is ready; otherwise, show "loading" on screen
    var list = repos ? repos.map((item, index) => {
      var button = this.getRepoSwipeButton(repos[index].owner.login, repos[index].name,
        this.props.ownerStarredRepos, this.props.starAction);
      return (
        <Swipeable rightButtons={[button]} key={repos[index].name}>
        <ListItem key={repos[index].name} onPress={() => { Linking.openURL(repos[index].html_url)}}>
          <Body>
            <Text style={styles.name}>{repos[index].name}</Text>
            <Text note style={styles.description}>{repos[index].description}</Text>
            <ScrollView horizontal={true}>
              <Entypo name={'star'} size={15} >
              <Text style={styles.stars}> {repos[index].stargazers_count} </Text>
              </Entypo>
              <MaterialCommunityIcons name={'source-fork'} size={15} >
              <Text style={styles.stars}> {repos[index].forks_count} </Text>
              </MaterialCommunityIcons>
              <Entypo name={'users'} size={15} >
              <Text style={styles.stars}> {repos[index].owner.login} </Text>
              </Entypo>
            </ScrollView>
          </Body>

        </ListItem>
        </Swipeable>
      )
    }) : <Text>loading</Text>;
    return (
      <SafeAreaView style={styles.safeArea}>
           <ScrollView>
           <Content style={styles.container}>
            <List>
              {list}  
            </List>
          </Content>
           </ScrollView>
        </SafeAreaView>
    )
  }
};