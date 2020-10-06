import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Avatar,Badge,Header,Icon,Card } from "react-native-elements";
import firebase from 'firebase';

import db from '../config.js';

export default class ActivityDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId                    : firebase.auth().currentUser.email,
      userName                  : "",
      recieverId                : this.props.navigation.getParam('details')["Name"],
      requestId                 : this.props.navigation.getParam('details')["Location"],
      recieverName              : '',
      recieverContact           : '',
      recieverAddress           : '',
      recieverRequestDocId      : '',
      creator                   : this.props.navigation.getParam('details')["Creator"],
      Activitytime               : this.props.navigation.getParam('details')["Time"],
      Duration                   : this.props.navigation.getParam('details')["Duration"],
      AboutEvent                  : this.props.navigation.getParam('details')["About"],
      ShowedInterestActName     : '',
    }
  }



  getRecieverDetails(){
    db.collection('Users').where('Email','==',this.state.creator).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverName    : doc.data().Name,
        })
      })
    });

    }


  getUserDetails=(userId)=>{
    db.collection("Users").where('Email','==', this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

  
  getUserIntrestStatus =()=>{
    db.collection("all_notifications").where('donor_id','==', this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          ShowedInterestActName  :doc.data().Name
        })
      })
    })
  }

  code=()=>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    var phoneNumber = '+918892517493'
   var appVerifier = window.recaptchaVerifier;
 firebase.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
     .then(function (confirmationResult) {
       
       window.confirmationResult = confirmationResult;
     }).catch(function (error) {
       // Error; SMS not sent
       // ...
     });
   }

  sendNotification=()=>{
    var message = this.state.userName + " has shown interest in donating the book"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.creator,
      "donor_id"            : this.state.userId,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message,
      "Name"                : this.state.recieverId,
    })
  }


  



  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId);
    this.getUserIntrestStatus()
  }


    render(){
      return(
        <View style={styles.container}>
          
          <Card>
          <Text style={{fontWeight:'bold'}}>Activity Name: {this.state.recieverId}</Text>
          <Text style={{fontWeight:'bold'}}>Activity Location: {this.state.requestId}</Text>
          <Text style={{fontWeight:'bold'}}>Created By: {this.state.recieverName}</Text>
          <Text style={{fontWeight:'bold'}}>Date and Time: {this.state.Activitytime}</Text>
          <Text style={{fontWeight:'bold'}}>Duration: {this.state.Duration}</Text>
          <Text style={{fontWeight:'bold'}}>About Event: {this.state.AboutEvent}</Text>
          {
            // this.state
          
          }
          {
            this.state.ShowedInterestActName === this.state.recieverId
            ?(
              <View style={styles.subContainer}>
              <Text style={{ fontSize: 20}}>Joined</Text>
            </View>              
            )
            :(              
            <TouchableOpacity style={styles.button} onPress={()=>{
              this.code()
          }}>
          <Text style={{alignSelf:'center',color:'white',margin:'3%'}}>Show Interest</Text>
          </TouchableOpacity>
            )
          }
          </Card>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    alignSelf:'center',
    width:'90%',
    height:50,
    borderWidth:1,
    borderRadius:7,
    margin:20,
    // paddingTop:20,
    backgroundColor:'#ff9130',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,   
    borderColor:'#ff9130',
    alignItems:'center'
},
})
