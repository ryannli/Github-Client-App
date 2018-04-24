import React, {
	Component
} from 'react';
import {
	AsyncStorage
} from 'react-native';

import {
	SafeAreaView
} from "react-navigation"
import {
	getOwnerFollowers,
} from '../Utils/gitFollow';
import FollowScreen from '../View/FollowScreen'

import api from '../Utils/basicApi';

export default class Follower extends Component {
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
		// Refetch data
		((username == this.props.navigation.state.params.ownername) ?
			getOwnerFollowers(username, this.props.navigation.state.params.ownertoken) : api.getFollower(username))
		.then((res => {
			if (username == this.props.navigation.state.params.ownername) {
				AsyncStorage.setItem('@githubClient:ownerfollower', JSON.stringify(res.data));
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
		AsyncStorage.getItem('@githubClient:ownerfollower')
			.then((value) => {
				if (value && (username == this.props.navigation.state.params.ownername)) {
					// Use data from storage if it is already stored
					this.setState({
						data: JSON.parse(value)
					})
				} else {
					// Fetch data from github api
					((username == this.props.navigation.state.params.ownername) ?
						getOwnerFollowers(username, this.props.navigation.state.params.ownertoken) : api.getFollower(username))
					.then((res => {
						if (username == this.props.navigation.state.params.ownername) {
							AsyncStorage.setItem('@githubClient:ownerfollower', JSON.stringify(res.data));
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
			navigation = {
				this.props.navigation
			}
			isRefreshing = {
				this.state.isRefreshing
			}
			onRefresh = {
				this._onRefresh
			}
		/>
		)
	}
}