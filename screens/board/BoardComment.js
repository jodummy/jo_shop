import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Button,TextInput,TouchableOpacity} from 'react-native';
import firebase,{database} from 'firebase';

export default class BoardComment extends Component{
    static navigationOptions={
        title:'BoardComment'
    }
    constructor(props){
        super(props)
        this.state={
            comment:this.props.navigation.getParam('comment'),
            key:this.props.navigation.getParam('key'),
            inputComment:''
        }
    }
  
    setComment=(text)=>{
        this.setState({
            inputComment:text
        })
    }
    addComment=()=>{
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
        const {comment,inputComment}=this.state;
        
      this.setState({
          comment:[...this.state.comment,inputComment]
      })
      console.log(this.state.comment);

      firebase.database().ref('board/'+(this.state.key)).update({
        comment : this.state.comment
      });
     
    }
    addFirstComment=()=>{
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
        const {inputComment}=this.state;
      
          
        firebase.database().ref('board/'+(this.state.key)).update({
            comment : [this.state.inputComment]
          });
        this.setState({
           comment:[this.state.inputComment]
        })
    }
   
    render(){
        const {comment,key,inputComment}=this.state;

        if(comment){
        return(
           
            <View style={styles.container}> 
            <ScrollView>
                {Object.values(comment).map(cmt=>{
                    return(
                        <TouchableOpacity style={{flex:1,justifyItem:'flex-start',width:'100%', height:50,marginTop:5,marginBottom:5,
                    borderBottomColor:'#c9cacc', borderBottomWidth:1,padding:5}}>
                       <Text style={{color:'black'}}>{cmt}</Text>
                        </TouchableOpacity>

                    )
                })}
 </ScrollView>
 <View style={{justifyItem:'flex-end',justifyContent:'space-around',marginTop:20,height:'20%',width:'90%',alignContent:'center',padding:5, borderWidth:1,borderRadius:5}}>
        <TextInput style={{fontSize:15}} placeholder={"댓글을 입력하세요"}
        value={inputComment} onChangeText={this.setComment} placeholderTextColor={'#999'} returnKeyType={"done"}
        autoCorrect={false}/><Button style={{justifyItem:'flex-end'}}title='저장' onPress={()=>this.addComment()}/>
       </View>
            </View>
           
        )}
        else{
            
            return(<View style={{justifyItem:'flex-end',justifyContent:'space-around',marginTop:20,height:'20%',width:'90%',alignContent:'center',padding:5, borderWidth:1,borderRadius:5}}>
        <TextInput style={{fontSize:15}} placeholder={"댓글을 입력하세요"}
        value={inputComment} onChangeText={this.setComment} placeholderTextColor={'#999'} returnKeyType={"done"}
        autoCorrect={false}/><Button style={{justifyItem:'flex-end'}}title='저장' onPress={()=>this.addFirstComment()}/></View>)}
      
        

    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})