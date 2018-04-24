import axios from 'axios';
import base64 from 'base-64';
import Config from '../Config/Config'
import {
	getHeader
} from './basicUtils'

// Set axios to not cache data, so the refresh function can work
axios.interceptors.request.use(function(config) {
	config.headers['Cache-Control'] = "no-cache,no-store,must-revalidate,max-age=-1,private";
	return config;
}, function(err) {
	return Promise.reject(err);
});

var api = {
	/** Get profile data by username 
	 * @param  username   the input username
	 * @return the promise of http request result
	 */
	getProfile(username) {
		username = username.trim();
		var url = `https://api.github.com/users/${username}`;
		return getHeader().then(header => axios.get(url, {
			headers: header
		}));
	},

	/** Get profile data by token of the owner
	 * @param  token   the user authorization token
	 * @return the promise of http request result
	 */
	getOwnerProfile(token) {
		var profile_url = `https://api.github.com/user`;
		return axios.get(profile_url, {
			headers: {
				Authorization: `bearer ${token}`
			}
		});
	},

	/** Get repository data by username
	 * @param  username   the input username
	 * @return the promise of http request result
	 */
	getRepo(username) {
		username = username.trim();
		var url = `https://api.github.com/users/${username}/repos`;
		return getHeader().then(header => axios.get(url, {
			headers: header
		}));
	},

	/** Get follower data by username
	 * @param  username   the input username
	 * @return the promise of http request result
	 */
	getFollower(username) {
		username = username.trim();
		var url = `https://api.github.com/users/${username}/followers`;
		return getHeader().then(header => axios.get(url, {
			headers: header
		}));
	},

	/** Get following data by username
	 * @param  username   the input username
	 * @return the promise of http request result
	 */
	getFollowing(username) {
		username = username.trim();
		var url = `https://api.github.com/users/${username}/following`;
		return getHeader().then(header => axios.get(url, {
			headers: header
		}));
	},

	/** Get login data by username
	 * @param  username   the input username
	 * @param  password   the input raw password
	 * @return the promise of http request result
	 */
	login(username, password) {
		const bytes = username.trim() + ':' + password.trim();
		const encoded = base64.encode(bytes);

		let data = JSON.stringify({
			'client_id': Config.GIT_CLIENT_ID,
			'client_secret': Config.GIT_CLIENT_SECRET,
			'scopes': ['user', 'repo'],
			'note': 'not abuse'
		})

		return axios.post(Config.AUTH_URL_PATH, data, {
			headers: {
				'Authorization': 'Basic ' + encoded,
				'User-Agent': 'GitHub Client',
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
	},
}

module.exports = api;