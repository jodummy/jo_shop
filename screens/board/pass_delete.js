import React, { Component } from 'react';
import { View, Button,Text, StyleSheet, ScrollView,RefreshControl,TextInput,TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Constants } from 'expo';
import { createStackNavigator,createAppContainer,withNavigation} from 'react-navigation';
import firebase, { database } from 'firebase';
import BoardList from './BoardList';
import PropTypes from "prop-types";

export default class pass_modify extends Component{
    constructor(props){
        super(props)
        this.state={
            password:this.props.navigation.getParam('password'),
            inputPassword:'',
            key:this.props.navigation.getParam('key')
        };
    }
    static navigationOptions={
        title:'check'
    }
    setInputPassword=(text)=>{
        const {inputPassword}=this.state;
        this.setState({
            inputPassword:text
        })
    }
    isCorrect=()=>{
        const {password,inputPassword,key}=this.state;
        const {navigate}=this.props.navigation;
        if(password==inputPassword){
            firebase.database().ref('board/'+(this.state.key)).remove();
             alert('삭제됨')
            navigate('BoardTab')
        }
        else{
            alert('비밀번호가 일치하지 않습니다')
           
        }
    }
    render(){
        const {inputPassword}=this.state;
        return(
            <View style={styles.container}>
                <View>
                    <Text style={{marginBottom:10,fontSize:20}}>비밀번호를 입력하세요</Text>
                    </View>
                <View style={{justifyContent:'space-around'}}>
                    <TextInput style={{fontSize:20,borderWidth:1}} placeholder={'비밀번호'}
                    value={inputPassword} onChangeText={this.setInputPassword}
                    placeholderTextColor={'#999'}
                    returnKeyType={'done'}
                    autoCorrect={false}/>
                    <Button title='확인' onPress={this.isCorrect} />
                </View>
            </View>


        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    }
})