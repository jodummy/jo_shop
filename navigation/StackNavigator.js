import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import BoardTab from '../screens/board/BoardTab'
import BoardAdd from '../screens/board/BoardAdd'
import BoardView from '../screens/board/BoardView'
import BoardList from '../screens/board/BoardList'
import BoardModify from '../screens/board/BoardModify'
import pass_modify from '../screens/board/pass_modify'
import pass_delete from '../screens/board/pass_delete'
import BoardComment from '../screens/board/BoardComment'



const AppNavigator = createStackNavigator(
    {
        BoardTab: {
            screen: BoardTab
        },
        BoardAdd: {
            screen: BoardAdd
        },
        BoardView: {
            screen: BoardView
        },
        BoardList: {
            screen: BoardList
        },
        BoardModify: {
            screen: BoardModify
        },
        pass_modify: {
            screen: pass_modify
        },
        pass_delete: {
            screen: pass_delete
        },
        BoardComment: {
            screen: BoardComment
        }, 

    },
    {
        initialRouteName: 'BoardTab'
    }
);
const AppContainet = createAppContainer(AppNavigator);

export default class StackNavigator extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <AppContainet />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});