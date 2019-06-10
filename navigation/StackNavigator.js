import React from 'react';
import {StyleSheet,Button,Text,View} from 'react-native';
import {createStackNavigator,createAppContainer}from 'react-navigation';
import BoardTab from '../screens/Board/BoardTab'
import BoardAdd from '../screens/Board/BoardAdd'
import BoardView from '../screens/Board/BoardView'
import BoardList from '../screens/Board/BoardList'
import BoardModify from '../screens/Board/BoardModify'
import pass_modify from '../screens/Board/pass_modify'
import pass_delete from '../screens/Board/pass_delete'
import BoardComment from '../screens/Board/BoardComment'



const AppNavigator=createStackNavigator(
   { BoardTab:{
        screen:BoardTab
    },
    BoardAdd:{
        screen:BoardAdd
    },
    BoardView:{
        screen:BoardView
    },
    BoardList:{
        screen:BoardList
    },
    BoardModify:{
        screen:BoardModify
    },
    pass_modify:{
        screen:pass_modify
    },
    pass_delete:{
        screen:pass_delete
    },
    BoardComment:{
        screen:BoardComment
    },
},
{
    initialRouteName:'BoardTab'
}
);
const AppContainet = createAppContainer(AppNavigator);

export default class StackNavigator extends React.Component{
    static navigationOptions={
        header:null
    }
    render(){
        return <AppContainet/>;
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});