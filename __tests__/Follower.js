import 'react-native';
import React from 'react';
import Follower from '../src/Component/Follower';

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
		<Follower navigation={navigation}/>
	);
	expect(tree).toMatchSnapshot();
});

test('renders with same username and ownername', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli",
				ownername: "ryannli"
			}
		}
	};
	const tree = renderer.create(
		<Follower navigation={navigation}/>
	);
	expect(tree).toMatchSnapshot();
});