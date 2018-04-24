import React, {
  Component
} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import RepoScreen from '../View/RepoScreen'
import {
  AsyncStorage
} from 'react-native';
import {
  starRepo,
  unstarRepo,
  getStarRepo
} from '../Utils/gitStar';
import api from '../Utils/basicApi';


export default class Repository extends Component {
  // Reset navigation options, define tab bar icon
  static navigationOptions = {
    tabBarLabel: Repository,
    tabBarIcon: ({
      tintColor
    }) => (
      <SimpleLineIcons name="home" size={25} color={tintColor}/>
    ),
  };

  // Initialize state to avoid undefined object
  state = {};

  /** Override componentWillMount function, fetch necessary data by Github api and set states to 
   *  the class. */
  componentWillMount() {
    var username = this.props.navigation.state.params.username ? this.props.navigation.state.params.username : '';
    AsyncStorage.getItem('@githubClient:ownerrepo')
      .then((value) => {
        if (value && (username == this.props.navigation.state.params.ownername)) {
          // Use data from storage if it is already stored
          this.setState({
            data: JSON.parse(value)
          })
        } else {
          // Fetch data from github api
          api.getRepo(username).then((res => {
            if (username == this.props.navigation.state.params.ownername) {
              AsyncStorage.setItem('@githubClient:ownerrepo', JSON.stringify(res.data));
            }
            this.setState({
              data: res.data
            })
          }));
        }
      });

    // Gets and sets state of star data
    getStarRepo(this.props.navigation.state.params.ownername).then((res => this.setState({
      ownerStarredRepos: res.data.map((item, index) => {
        return res.data[index].name;
      })
    })));
  }

  /** Handle mouse event of staring or unstaring users.  
   * @param  isUnstar   the boolean of whether the request is "star"
   * @param  repoOwner  the owner of repository
   * @param  repo       the name of repository
   */
  starAction = (isUnstar, repoOwner, repo) => {
    (isUnstar ? unstarRepo(repoOwner, repo, this.props.navigation.state.params.ownertoken) :
      starRepo(repoOwner, repo, this.props.navigation.state.params.ownertoken))
    .then(() => setTimeout(() => getStarRepo(this.props.navigation.state.params.ownername).then((res => this.setState({
      ownerStarredRepos: res.data.map((item, index) => {
        return res.data[index].name;
      })
    }))), 100))
  };

  /** Render function. */
  render() {
    return (<RepoScreen data={this.state.data} ownerStarredRepos={this.state.ownerStarredRepos}
      starAction={this.starAction}/>)
  }
};