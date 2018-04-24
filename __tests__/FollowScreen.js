import 'react-native';
import React from 'react';
import FollowScreen from '../src/View/FollowScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const tree = renderer.create(
		<FollowScreen navigation={navigation}/>
	);
	expect(tree).toMatchSnapshot();
});


test('renders correctly with refreshing', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const refreshing = true;
	const tree = renderer.create(
		<FollowScreen navigation={navigation} refreshing={refreshing}/>
	);
	expect(tree).toMatchSnapshot();
});



test('renders correctly with data', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const refreshing = true;
	const data = [{
		"login": "rijn",
		"id": 6976367,
		"avatar_url": "https://avatars0.githubusercontent.com/u/6976367?v=4",
		"gravatar_id": "",
		"url": "https://api.github.com/users/rijn",
		"html_url": "https://github.com/rijn",
		"followers_url": "https://api.github.com/users/rijn/followers",
		"following_url": "https://api.github.com/users/rijn/following{/other_user}",
		"gists_url": "https://api.github.com/users/rijn/gists{/gist_id}",
		"starred_url": "https://api.github.com/users/rijn/starred{/owner}{/repo}",
		"subscriptions_url": "https://api.github.com/users/rijn/subscriptions",
		"organizations_url": "https://api.github.com/users/rijn/orgs",
		"repos_url": "https://api.github.com/users/rijn/repos",
		"events_url": "https://api.github.com/users/rijn/events{/privacy}",
		"received_events_url": "https://api.github.com/users/rijn/received_events",
		"type": "User",
		"site_admin": false
	}, ]
	const tree = renderer.create(
		<FollowScreen navigation={navigation} refreshing={refreshing} data={data}/>
	);
	expect(tree).toMatchSnapshot();
});