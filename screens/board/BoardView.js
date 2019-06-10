import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Button} from 'react-native';
import firebase,{database} from 'firebase';


export default class BoardView extends Component{
    constructor(props){
        super(props)
        this.state={
            title:this.props.navigation.getParam('title'),
            content:this.props.navigation.getParam('content'),
            writer:this.props.navigation.getParam('writer'),
            key:this.props.navigation.getParam('key'),
            password:this.props.navigation.getParam('password'),
            comment:this.props.navigation.getParam('comment')
        };
    }

    static navigationOptions={
        title:'BoardView'
    }

    

    componentWillMount(){
      
        
         console.log(this.state.title)
         console.log(this.state.content)
         console.log(this.state.writer)
         console.log(this.state.key)
         console.log(this.state.password)
         console.log(this.state.comment)

    }
    delete=()=>{
        const {key,password}=this.state;
        const {navigate}=this.props.navigation;
       /* firebase.database().ref('board/'+(this.state.key)).remove();
        alert('삭제됨')
        navigate('BoardTab')*/
        navigate('pass_delete',{password:password,key:key})
        
    }
    goModify=()=>{
        const {navigate}=this.props.navigation;
        const {title,content,key,password,writer}=this.state;
       
       /* navigate('BoardModify',{title:title,content:content,key:key})*/
       navigate('pass_modify',{password:password,title:title,content:content,key:key,writer:writer})
        
    }
    render(){
        const {navigate}=this.props.navigation;
        const {title,content,writer,key,comment}=this.state;
        
       
        return(

            <View style={styles.container}>

              
          <View style={{borderRadius:5,borderWidth:1,borderColor:'#b9d0f7',width:'90%',height:'10%',
          justifyContent:'space-around',marginTop:5,marginLeft:5}}>
            <Text style={{marginLeft:5}}>{title}</Text>
          </View>

          <View style={{alignItems:'flex-start',width:'90%',marginTop:5,marginBottom:5}}>
              <Text style={{color:'grey'}}>글쓴이:{writer}</Text>
              </View>
         
          <View style={{borderRadius:5,borderWidth:1,borderColor:'#b9d0f7',width:'90%',height:'70%',
          marginTop:5,marginLeft:5}}>
            <Text style={{marginLeft:5,marginTop:5}}>{content}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{marginTop:10}}>
              <Button style={{height:'10%'}} title='댓글' onPress={()=>navigate('BoardComment',{comment:comment,key:key})}/>
                </View>
                <View style={{marginTop:10,marginLeft:10}}>
              <Button style={{height:'10%'}} title='삭제' onPress={()=>this.delete()}/>
                </View>
                <View style={{marginTop:10,marginLeft:10}}>
              <Button style={{height:'10%'}} title='수정' onPress={()=>this.goModify()}/>
                </View>
</View>
                </View>
       

        )
    }



}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})