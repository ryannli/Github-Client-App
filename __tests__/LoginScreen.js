import 'react-native';
import React from 'react';
import LoginScreen from '../src/View/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly with no password', () => {
	const navigation = {
		state: {
			params: {
				username: "ryannli"
			}
		}
	};
	const tree = renderer.create(
		<LoginScreen navigation={navigation}/>
	);
	expect(tree).toMatchSnapshot();
});

test('renders correctly with no username', () => {
	const navigation = {
		state: {
			params: {
				password: "ryannli"
			}
		}
	};
	const tree = renderer.create(
		<LoginScreen navigation={navigation}/>
	);
	expect(tree).toMatchSnapshot();
});