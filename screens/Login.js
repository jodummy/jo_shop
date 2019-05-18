import React, { Component } from 'react'
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import firebase, { database } from 'firebase';

export default class Login extends Component {
    state = {
        id: '',
        email: '',
        username: '',
        password: '',
    }

    handleLogin() {
        const { navigation } = this.props;
        const { id, password } = this.state;

        Keyboard.dismiss();
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
        let result = '';
        let userPassword = password;
        console.log('내가 적은 비밀번호 : ' + userPassword);
        firebase.database().ref('/user/' + id).once('value').then(function (snapshot) {
            result = (snapshot.val() && snapshot.val().password) || 'null';
            console.log(result);

            if (userPassword === result) {
                navigation.navigate('Browse');
            } else if (userPassword == "") {
                Alert.alert(
                    '비밀번호를 적지 않았습니다',
                    '확인해 주세요.'
                )
            } else if (result === 'null') {
                Alert.alert(
                    '아이디가 없습니다.',
                    '회원 가입을 먼저 해주세요.',
                )
            } else if (userPassword != result) {
                Alert.alert(
                    '비밀번호가 틀립니다.',
                    '비밀번호 확인해주세요.',

                )
            }
        });
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;

        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label="ID"
                            style={[styles.input]}
                            defaultValue={this.state.id}
                            onChangeText={text => this.setState({ id: text })}
                        />
                        <Input
                            secure
                            label="Password"
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>

                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>Forgot your password?</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    login: {
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
