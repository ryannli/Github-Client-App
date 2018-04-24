import 'react-native';
import React from 'react';
import ProfileScreen from '../src/View/ProfileScreen';

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
		<ProfileScreen navigation={navigation}/>
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
	const data = {
		"login": "ryannli",
		"id": 22183752,
		"avatar_url": "https://avatars2.githubusercontent.com/u/22183752?v=4",
		"gravatar_id": "",
		"url": "https://api.github.com/users/ryannli",
		"html_url": "https://github.com/ryannli",
		"followers_url": "https://api.github.com/users/ryannli/followers",
		"following_url": "https://api.github.com/users/ryannli/following{/other_user}",
		"gists_url": "https://api.github.com/users/ryannli/gists{/gist_id}",
		"starred_url": "https://api.github.com/users/ryannli/starred{/owner}{/repo}",
		"subscriptions_url": "https://api.github.com/users/ryannli/subscriptions",
		"organizations_url": "https://api.github.com/users/ryannli/orgs",
		"repos_url": "https://api.github.com/users/ryannli/repos",
		"events_url": "https://api.github.com/users/ryannli/events{/privacy}",
		"received_events_url": "https://api.github.com/users/ryannli/received_events",
		"type": "User",
		"site_admin": false,
		"name": "Ran Li",
		"company": null,
		"blog": "https://ryannli.github.io/",
		"location": null,
		"email": null,
		"hireable": null,
		"bio": "Love food, sleep and code.",
		"public_repos": 1,
		"public_gists": 0,
		"followers": 3,
		"following": 3,
		"created_at": "2016-09-14T00:14:07Z",
		"updated_at": "2018-03-08T03:05:26Z"
	}
	const tree = renderer.create(
		<ProfileScreen navigation={navigation} data={data}/>
	);
	expect(tree).toMatchSnapshot();
});

test('renders correctly with dictionary features', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const icon = {
		"email": "paper-plane",
		"bio": "user",
	}
	const screenName = {
		"email": "email",
		"bio": "bio",
	}
	const tree = renderer.create(
		<ProfileScreen navigation={navigation} icon={icon} screenName={screenName}/>
	);
	expect(tree).toMatchSnapshot();
});