import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Dimensions,
	Alert,
	SafeAreaView,
	AsyncStorage
} from 'react-native';
import {
	Container,
	Header,
	Content,
	Form,
	Item,
	Input,
	Button,
	Text,
	Body
} from 'native-base';
import {
	TextInput
} from 'react-native';
import Zocial from 'react-native-vector-icons/Zocial';
import api from '../Utils/basicApi';

export default class LoginScreen extends Component {
	state = {}

	/** Handle mouse click event of login. */
	handlePress() {
		if (this.state.username && this.state.password) {
			// Navigate to Tab screen
			var username = this.state.username;
			api.login(this.state.username, this.state.password)
				.then((res => {
					const isValid = res.status < 400;
					if (isValid) {
						AsyncStorage.clear();
						AsyncStorage.setItem('@githubClient:ownername', JSON.stringify(username));
						AsyncStorage.setItem('@githubClient:ownertoken', JSON.stringify(res.data.token));
						this.props.navigation.navigate('TabScreen', {
							'username': username,
							'token': res.data.token,
							'ownername': username,
							'ownertoken': res.data.token,
						});
					}
				})).catch(function(e) {
					Alert.alert(
						'Login Failure',
						'Username and password do not match', );
				});

		} else if (!this.state.username) {
			// The input username cannot be empty
			Alert.alert(
				'Empty Username',
				'Please input a username', );
		} else {
			Alert.alert(
				'Empty Password',
				'Please input a password', );
		}
	}

	/** Render function. */
	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
		      <Container style={styles.container}>
		        <Body style={styles.image}>
		        <Zocial name={'github'} size={px2dpH(225)} />
		        </Body>
		          <Form style={styles.contentInput}>
		            <Item style={styles.input} >
		              <Input placeholder="Username" 
		              		placeholderTextColor="rgba(255,255,255,0.7)" 
		              		onChangeText={(text) => this.setState({'username': text})}
		              		/>
		            </Item>
		            <Item style={styles.input}>
		              <Input placeholder="Password" 
		              		placeholderTextColor="rgba(255,255,255,0.7)" 
		              		onChangeText={(text) => this.setState({'password': text})} 
		              		secureTextEntry />
		            </Item>
		            <Button block style={styles.buttonContainer} onPress={() => this.handlePress()}>
		            	<Text style={styles.buttonText}>Sign In</Text>
		            </Button>
		          </Form>
		          
		      </Container>
		   </SafeAreaView>
		);
	}

}

const deviceW = Dimensions.get('window').width
const deviceH = Dimensions.get('window').height

const basePxW = 375
const basePxH = 750

// Convert to relative width
function px2dpW(px) {
	return px * deviceW / basePxW
}

// Convert to relative height
function px2dpH(px) {
	return px * deviceH / basePxH
}

// Define style sheets
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03A9F4",
	},
	content: {
		marginBottom: px2dpH(150),
	},
	contentInput: {
		flex: 2,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	input: {
		height: px2dpH(60),
		marginBottom: px2dpH(15),
	},
	image: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 3,
		height: px2dpH(750),
		marginTop: px2dpH(45),
		marginBottom: px2dpH(45),
	},
	buttonContainer: {
		backgroundColor: "#0277BD",
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	},
	buttonText: {
		textAlign: "center",
	},
	safeArea: {
		flex: 1,
		backgroundColor: '#03A9F4',
	}
})