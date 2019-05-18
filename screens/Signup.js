import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import firebase, { database } from 'firebase';

export default class SignUp extends Component {
  state = {
    id: '',
    email: '',
    username: '',
    password: '',
    errors: [],
    loading: false,

  }


  handleSignUp() {
    const { navigation } = this.props;
    const { id, email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    var config = {
      apiKey: "AIzaSyDE01SRVB6g99NCtlYfhgpW-3Ctc4PZdpg",
      authDomain: "reactnativedatabase-e3164.firebaseapp.com",
      databaseURL: "https://reactnativedatabase-e3164.firebaseio.com",
      projectId: "reactnativedatabase-e3164",
      storageBucket: "reactnativedatabase-e3164.appspot.com",
      messagingSenderId: "5654389138",
      appId: "1:5654389138:web:91ada309162d79ce"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    // 없으면 체크해주는 기능
    if (!id) errors.push('id');
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');
    this.setState({ errors, loading: false });

    //빈 것이 0이어야지 들어간다.


    let userId = this.state.id;
    let userEmail = this.state.email;
    let userPassword = this.state.password;
    let userName = this.state.username;
    let result = '';

    console.log('------------------------------------------------------------------------------');
    console.log('에러 갯수: ' + errors.length);
    console.log('id : ' + this.state.id);
    console.log('email : ' + this.state.email);
    console.log('name : ' + this.state.username);
    console.log('pass : ' + this.state.password);

    firebase.database().ref('/user/' + userId).once('value').then(function (snapshot) {
      result = (snapshot.val() && snapshot.val().username) || '없어';
      console.log('tests' + result);
      if (!errors.length && result === '없어') {
        firebase.database().ref('user/' + userId).set(
          {
            email: userEmail,
            password: userPassword,
            username: userName,
          }
        ).then(() => {
          console.log('inserted !');
          Alert.alert(
            '축하드립니다!',
            '가입에 성공하였습니다.',
            [
              {
                text: 'Continue', onPress: () => {
                  navigation.navigate('Browse')
                }
              }
            ],
            { cancelable: false }
          )
        }).catch((error) => {
          console.log(error);
        });
      } else if (!errors.length) {
        Alert.alert(
          '실패입니다.',
          '중복된 아이디가 존재합니다.',
          { cancelable: false }
        )
      }
    });




  }



  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding" >
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            <Text h1 bold>Sign Up</Text>
            <Input
              id
              label="Id"
              error={hasErrors('id')}
              style={[styles.input, hasErrors('id')]}
              defaultValue={this.state.id}
              onChangeText={text => this.setState({ id: text })}
            />
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
