import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Alert,Vibration,TextInput,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Avatar,Badge,Input,Icon } from "react-native-elements";

export default class CreateScreen extends React.Component{
    constructor(){
        super();
        this.state={
            eventName:'',
            eventlocation:'',
            eventTime:'',
            creator:firebase.auth().currentUser.email,
            isDatePickerVisible:false,
            aboutEvent:'',
            duration:'',
            username:''
        }
    }

    
    

    initiateActivity = async()=>{
        //add a transaction
        db.collection("Events").add({
          'Name': this.state.eventName,
          'Location' : this.state.eventlocation,
          'Creator':this.state.creator,
          'Time':"'" + this.state.eventTime + "'" ,
          'About':this.state.aboutEvent,
          'Duration':this.state.duration,
          'creatorUsername':this.state.username,
        })
        Alert.alert("Activity Created!")
        this.props.navigation.navigate('Activities')
        const ONE_SECOND_IN_MS = 1000;
        Vibration.vibrate(0.2 * 1000)  
        
      }
      getUserProfile(){
        db.collection('UserInfo')
        .where('Email','==',this.state.creator)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            var name = doc.data().FirstName+ " " + LastName
            this.setState({
              username : name          
            })
            console.log(this.state.username)
          })
        })
      }

      componentDidMount(){
        this.getUserProfile();        
      }
      

    render(){
        const handleConfirm = (date) => {
            this.setState({
                isDatePickerVisible:false,
                eventTime:date
            })
            console.log(date)
            
          };
          const handleDecline = () => {
            this.setState({
                isDatePickerVisible:false
            })
          };
        return(
            <ScrollView>
                <View>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Activity')}} style = {{marginTop:'12%'}}>
                <Icon
                        name='back'
                        size={24}
                        color='black'
                      /></TouchableOpacity>
                </View>
            <View style={{alignItems:'center'}}>
            <Text style={{fontSize:25,marginTop:-25}}>Enter Details</Text>
            <Input style = {[styles.loginBox,{marginTop:'5%'}]}
                    placeholder = "Enter Activity name"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({eventName:text})
                    }}
                    rightIcon={
                      <Icon
                        name='edit'
                        size={24}
                        color='black'
                      />
                    }
            />
            <Input style = {styles.loginBox}
                    placeholder = "Enter Activity Location"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({eventlocation:text})
                    }} 
            />
            <Input style = {styles.loginBox}
                    placeholder = "Enter About Activity"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({aboutEvent:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
            <Input style = {styles.loginBox}
                    placeholder = "Enter Activity Duration"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({duration:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
            <TextInput style = {styles.loginBox}
                    placeholder = "Selected Time"
                    keyboardType = 'default'   
                    value={this.state.eventTime} 
                    editable={false}                
                    rightIcon={
                      <Icon
                      name='av-timer'
                      size={24}
                      color='black'
                    />
                    }
            />
                     <TouchableOpacity
             style={styles.button}
             onPress={() => {
              this.initiateActivity()
            }}
          >
            <Text style={styles.buttonText}>Create Activity</Text>
          </TouchableOpacity>

            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:20,
      fontWeight:"bold",
      color:"#fff"
    }
})


