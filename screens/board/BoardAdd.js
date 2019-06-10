import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity} from 'react-native';
import firebase,{database} from 'firebase';


export default class BoardAdd extends Component{
 
  static navigationOptions={
  title:'BoardAdd'
  }
  
  constructor(props){
        super(props)
        this.state={
            title:'',
            content:'',
            writer:'익명', 
           lastKey:this.props.navigation.getParam('lastKey'),//+1 해서 게시물 저장할 때 쓴다
           password:''
        
        };
    }
 
     
      setTitle=(text)=>{
       
        this.setState({
          title:text
        });
      };
      
      setPassword=(text)=>{
        const {password}=this.state;
        this.setState({
          password:text
        })
      }
      setContent=(text)=>{
        this.setState({
          content:text
        });
      };

      addArticle=()=>{
        const {lastKey,title,content,writer,password}=this.state;
       const {navigate}=this.props.navigation;
       

        firebase.database().ref('board/' + ++(this.state.lastKey)).set(
          {
           title: this.state.title,
            content: this.state.content,
          writer: this.state.writer,
          password:this.state.password
          }
        ).then(() => {
          console.log('inserted !');
        }).catch((error) => {
          console.log(error);
        }); 
        navigate('BoardTab')
      }
   
     
      render(){
       const {navigate}=this.props.navigation;
        const {title,content,password}=this.state;
       
        return(
          <View style={styles.container}>

          <View style={{marginTop:20,height:'10%',width:'90%',alignContent:'center',padding:5,
        borderWidth:1,borderRadius:5}}>
        <TextInput style={{fontSize:15}} placeholder={"제목을 작성하세요"}
        value={title} onChangeText={this.setTitle}
        placeholderTextColor={'#999'}
        returnKeyType={"done"}
        autoCorrect={false}
        />
        </View>
        
        <View style={{marginTop:5,height:'70%',width:'90%',alignContent:'center',padding:5,
      borderWidth:1,borderRadius:5}}>
      <ScrollView>
      <TextInput style={{fontSize:15}} placeholder={'내용을 작성하세요'}
      value={content} onChangeText={this.setContent}
      placeholderTextColor={'#999'}
      returnKeyType={'done'}
      autoCorrect={false}
      />
      </ScrollView>
      </View>

      
        <TextInput style={{borderWidth:1,marginTop:5,height:'10%',padding:5}} placeholder={'비밀번호'}
value={password} onChangeText={this.setPassword} placeholderTextColor={'#999'} returnKeyType={'done'}
autoCorrect={false}/>


    <View style={{height:'10%',width:'90%',
      borderWidth:1,borderRadius:5,backgroundColor:'#88ade8',borderColor:'white',alignItems:'center',
    justifyContent:'space-around'}}>
      <TouchableOpacity transparent onPress={this.addArticle}
    >
    <View><Text style={{fontSize:20}}>저장</Text></View>
    </TouchableOpacity>
    </View>

    </View>

        )
      }
    }
    
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});