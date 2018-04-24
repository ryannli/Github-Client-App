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
import {
	SafeAreaView
} from "react-navigation"
import {
	getOwnerFollowers,
} from '../Utils/gitFollow';

import api from '../Utils/basicApi';

// Define design styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	safeArea: {
		flex: 1,
		// backgroundColor: '#03A9F4',
	},
	name: {
		fontSize: 20,
		paddingLeft: 5,
		fontFamily: 'Cochin',
		fontWeight: 'bold',
	},
});

export default class FollowScreen extends Component {
	/** Render function. */
	render() {
		var followers = this.props.data;

		// Check if data is ready; otherwise, show "loading" on screen
		var follower_list = followers ? followers.map((item, index) => {
			return (
				<ListItem key={followers[index].login} onPress={() => { this.props.navigation.navigate('TabScreen', 
					{'username': followers[index].login, 
					'ownername': this.props.navigation.state.params.ownername, 
					'ownertoken': this.props.navigation.state.params.ownertoken,})}}>
				<Thumbnail size={60} source={{ uri: followers[index].avatar_url}} />
				<Body>
				<Text style={styles.name}>{followers[index].login}</Text>
			<Text note> {""} </Text>
				</Body>
				</ListItem>
			)
		}) : <Text>loading</Text>;

		return (
			<SafeAreaView style={styles.safeArea}>
			<ScrollView refreshControl={
			<RefreshControl
	            refreshing={this.props.isRefreshing}
	            onRefresh={this.props.onRefresh} />
       		 }>
			<Content style={styles.container}>
			<List>
			{follower_list}  
			</List>
			</Content>
			</ScrollView>
			</SafeAreaView>
		)
	}
}