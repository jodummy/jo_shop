import React, { Component } from 'react';
import { Icon,Container,Content,Header,Left,Body,Right,Button} from 'native-base';
import {StyleSheet,Text,View} from 'react-native'
import {WebView} from "react-native"
 

export default class Inform extends Component {

    static navigationOptions = {

        title:'InformTab'
        
      }

    constructor(props){
      super(props)

      this.state = {
         
      };
  }
render() {
     
      return (
       <WebView
       source={{ uri:"https://ko-kr.facebook.com/skhunews/" }}
       style={{marginTop:20}}
       />
               
    )
    }

    
      
      
     
}
 
