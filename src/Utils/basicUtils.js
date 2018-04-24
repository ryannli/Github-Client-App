import {
	AsyncStorage
} from 'react-native';

/** Get token from AsyncStorage. */
export const getToken = () =>
	AsyncStorage.getItem('@githubClient:ownertoken')
	.then((value) => {
		return JSON.parse(value);
	});

/** Get authorization header. */
export const getHeader = () =>
	getToken().then(token =>
		({
			'Authorization': 'token ' + token,
			'User-Agent': 'GitHub Client',
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json; charset=utf-8',
		}));