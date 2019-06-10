import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,RefreshControl,TextInput,TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Constants } from 'expo';
import { createStackNavigator,createAppContainer,withNavigation} from 'react-navigation';
import firebase, { database } from 'firebase';
import BoardList from './BoardList';
import PropTypes from "prop-types";
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';






export default class BoardTab extends Component {

  static navigationOptions = {

    title:'BoardTab'
    /*,tabBarIcon: ({ tintColor }) => (
      <Icon name='md-list-box' style={{ color: tintColor }} />),*/
     
  }

  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      name: '',
      password: '',
      number: 0, //게시물 개수
      wholeData: {},
      username:'디폴트',
      search:'',
      object:{},
      lastKey:0, //게시글의 가장 최근 객체 키값
      refresh:false,
     
     
    };
    onRefresh=()=>{
      this.setState({refresh:true});
      fetchData().then(()=>{
        this.setState({refresh:false});
      })
    }

    
  }

  componentWillMount() {

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
    firebase.database().ref('board').on('value', (data) => {
     
     // console.log(data.toJSON());
    
    }) //객체 전부다 출력


    firebase.database().ref().on('value', snapshot => {
      this.setState({ wholeData: snapshot.val()
      });
     
    this.setObject((Object.values(this.state.wholeData))[0])

    this.setNumber(Object.keys(this.state.object).length)//게시물 개수 설정

    var data=Object.keys(this.state.object);//게시물 키 배열 중 마지막값=(+1해서 글쓰기하면됨)
    this.setLastKey(data[data.length-1]) 
   
    })
 
   /* "dog": [
      "웰시코기",
      "포메라니안",
      "푸들"
  ] 배열 인서트*/
  

 /* firebase.database().ref('board/' + 95).set(
    {
     title: '시험 잘보고싶다 ',
      content : '젭알',
      writer: '익명',
      password: 1234,
      comment:["댓글1","댓글2"]
    }
  ).then(() => {
    console.log('inserted !');
  }).catch((error) => {
    console.log(error);
  }); */
  /*firebase.database().ref('board/95').update({
    comment:["나도","저도요"]
  });*/
  
  }
  


setLastKey=(key)=>{
  const {lastKey}=this.state;
  this.setState({
    lastKey:key
  })
console.log(this.state.lastKey)
}


  setObject=(text)=>{
    const{object}=this.state;
    this.setState({
      object:text
    })
  }

  setNumber=(num)=>{
    const{number}=this.state;
    this.setState({
      number:num
    })
   
   
  }

  touchTitle=(text,text2,text3,key,password,comment)=>{
    const {navigate}=this.props.navigation;
    
    navigate('BoardView',{title:text,content:text2,writer:text3,key:key,password:password,comment:comment})
    

  }


  render() {
    const {navigate} = this.props.navigation;
    const { lastKey,object} = this.state;
  
    
    
    return (

      <View style={styles.container}>
        
 
        <ScrollView style={{flex:1, width:'100%'}}
        refreshControl={
        <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh}/>}
          >
{Object.values(object).reverse().map((info,i)=>{
    return(
      <BoardList title={info.title} content={info.content} writer={info.writer} 
      onPressTitle={()=>this.touchTitle(info.title,info.content,info.writer,lastKey-i,info.password,info.comment)}/>//lastKey-i
    )
})
}   

   </ScrollView>
   
   <View style={{flexDirection:'row',height:'10%',width:'100%',borderRadius:5,justifyContent:'space-around',
   backgroundColor:'#78c8e8',borderWidth:1,alignItems:'center',borderColor:'white'}}>
     <TouchableOpacity 
     onPress={()=>navigate('BoardAdd',{lastKey:lastKey})}
     style={{width:'70%'}}> 
       <Text style={{fontSize:20,color:'#575859'}}>글쓰기</Text>
     </TouchableOpacity>
     <TouchableOpacity 
     onPress={()=>this.componentWillMount()}> 
       <Text style={{fontSize:20,color:'#575859'}}>새로고침</Text>
     </TouchableOpacity>
    
   </View>
     </View>
    
    )
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
