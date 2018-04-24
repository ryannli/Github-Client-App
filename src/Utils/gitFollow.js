import axios from 'axios';

/** Follow user by username
 * @param  username   the input username
 * @param  token   the input token
 * @return the promise of http request result
 */
export const followUser = (username, token) =>
	axios.put(`https://api.github.com/user/following/${username}`, null, {
		headers: {
			'Authorization': 'token ' + token,
			'User-Agent': 'GitHub Client',
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': "0"
		}
	});


/** Unfollow data by username 
 * @param  username   the input username
 * @param  token   the input token
 * @return the promise of http request result
 */
export const unfollowUser = (username, token) =>
	axios.delete(`https://api.github.com/user/following/${username}`, {
		headers: {
			'Authorization': 'token ' + token,
			'User-Agent': 'GitHub Client',
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': "0"
		}
	});

/** Get owner's follower data by username 
 * @param  username   the input username
 * @param  token   the input token
 * @return the promise of http request result
 */
export const getOwnerFollowers = async (username, token) => {
	var url = `https://api.github.com/user/followers`;
	return await axios.get(url, {
		headers: {
			'Authorization': 'token ' + token,
			'User-Agent': 'GitHub Client',
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
}

/** Get owner's following data by username 
 * @param  username   the input username
 * @param  token   the input token
 * @return the promise of http request result
 */
export const getOwnerFollowings = async (username, token) => {
	var url = `https://api.github.com/user/following`;
	return await axios.get(url, {
		headers: {
			'Authorization': 'token ' + token,
			'User-Agent': 'GitHub Client',
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
}