import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Button} from 'react-native';
import firebase,{database} from 'firebase';


export default class BoardModify extends Component{
    constructor(props){
        super(props)
        this.state={
            title:this.props.navigation.getParam('title'),
            content:this.props.navigation.getParam('content'),
            key:this.props.navigation.getParam('key')
        };
    }

    static navigationOptions={
        title:'BoardModify'
    }

    

    componentWillMount(){
   
        
         console.log(this.state.title)
         console.log(this.state.content)
         console.log(this.state.key)
       
    }
   modify=()=>{
       
        const {navigate}=this.props.navigation;
        /*var config = {
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
          }*/
          firebase.database().ref('board/'+this.state.key).update({
            title: this.state.title,
            content:this.state.content
          });
        alert('수정됨')
        navigate('BoardTab')
        
    }
    setTitle=(text)=>{
      
        this.setState({
            title:text
        })
    }
    setContent=(text)=>{
      
        this.setState({
            content:text
        })
    }

    render(){
        const {navigate}=this.props.navigation;
        const {title,content,writer}=this.state;
        
       
        return(

            <View style={styles.container}>
          <View style={{borderRadius:5,borderWidth:1,borderColor:'#b9d0f7',width:'90%',height:'10%',
          justifyContent:'space-around',marginTop:5,marginLeft:5}}>
            <TextInput style={{marginLeft:5}}
            value={title} onChangeText={this.setTitle} returnKeyType={"done"}
           autoCorrect={false} />
          
          </View>

          <View style={{alignItems:'flex-start',width:'90%',marginTop:5,marginBottom:5}}>
              <Text style={{color:'grey'}}>글쓴이:{writer}</Text>
              </View>
         
          <View style={{borderRadius:5,borderWidth:1,borderColor:'#b9d0f7',width:'90%',height:'70%',
          marginTop:5,marginLeft:5}}>
            <TextInput style={{marginLeft:5,marginTop:5}} 
            value={content} onChangeText={this.setContent} returnKeyType={"done"}
            autoCorrect={false} />
        
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{marginTop:10}}>
              <Button style={{height:'10%'}} title='완료' onPress={()=>this.modify()}/>
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