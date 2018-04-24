import 'react-native';
import React from 'react';
import RepoScreen from '../src/View/RepoScreen';

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
		<RepoScreen navigation={navigation}/>
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
	const data = [{
		"id": 85340242,
		"name": "cogcomp-nlp",
		"full_name": "ryannli/cogcomp-nlp",
		"owner": {
			"login": "ryannli",
		},
		"private": false,
		"html_url": "https://github.com/ryannli/cogcomp-nlp",
		"description": "CogComp's Natural Language Processing libraries",
		"fork": true,
		"stargazers_count": 0,
		"forks_count": 0,
	}]
	const tree = renderer.create(
		<RepoScreen navigation={navigation} data={data}/>
	);
	expect(tree).toMatchSnapshot();
});

test('renders correctly with starred repositories', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const ownerStarredRepos = ["repo1", "repo2"]
	const tree = renderer.create(
		<RepoScreen navigation={navigation} ownerStarredRepos={ownerStarredRepos}/>
	);
	expect(tree).toMatchSnapshot();
});