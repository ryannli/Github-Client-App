import {
	AppRegistry
} from 'react-native';
import App from './src/View/App';
import {
	YellowBox
} from 'react-native';

YellowBox.ignoreWarnings([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader requires',
	'Class RCTCxxModule was not exported',
]);

AppRegistry.registerComponent('Assignment3', () => App);