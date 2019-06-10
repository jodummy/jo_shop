import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";

export default class BoardList extends Component{

    constructor(props){
        super(props)
        
    }

    static propTypes={
      title:PropTypes.string.isRequired,
      content:PropTypes.string.isRequired,
      writer:PropTypes.string.isRequired,
    };

    render(){
        
        const {title,content,writer,password}=this.props;
        
         
             return (
           
            <TouchableOpacity style={{flex:1,width:'100%', height:50,marginTop:5,marginBottom:5,
            borderBottomColor:'#c9cacc',borderBottomWidth:1,padding:5}}  
            onPress={()=>this.props.onPressTitle(this.props.title,this.props.content,this.props.writer,this.props.lastKey,this.props.password,this.props.comment)}>
                <Text style={{color:'black'}}>{title} </Text>
                </TouchableOpacity>
               
            
        )
         
         
        };
    



}
