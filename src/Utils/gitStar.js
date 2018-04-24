import axios from 'axios';
import {
  getHeader
} from './basicUtils'

/** Star user by username
 * @param  owner  the owner
 * @param  repo   the repository to star  
 * @param  token  the authorization token 
 * @return the promise of http request result
 */
export const starRepo = async (owner, repo, token) => {
  var url = `https://api.github.com/user/starred/${owner}/${repo}`;
  await axios.put(url, null, {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'GitHub Client',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': 0
    }
  });
}

/** Unstar user by username
 * @param  owner  the owner
 * @param  repo   the repository to unstar  
 * @param  token  the authorization token 
 * @return the promise of http request result
 */
export const unstarRepo = async (owner, repo, token) => {
  var url = `https://api.github.com/user/starred/${owner}/${repo}`;
  await axios.delete(url, {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'GitHub Client',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': "0"
    }
  });
};

/** Get star repositories by username
 * @param  username  the username of user
 * @return the promise of http request result
 */
export const getStarRepo = async (username) => {
  username = username.trim();
  var url = `https://api.github.com/users/${username}/starred`;
  return getHeader().then(header => axios.get(url, {
    headers: header
  }));
}