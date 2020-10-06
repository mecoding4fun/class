import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Alert,ScrollView,Image } from 'react-native';
import { ListItem,Header } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class ActivityScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedActivityList : [],
      userId:firebase.auth().currentUser.email,
      Creator:'',
      image:'#',
      participants:0,
      username:''
    }
  this.requestRef= null
  }

  getRequestedActivityList =()=>{
    this.requestRef = db.collection("Events")
    .onSnapshot((snapshot)=>{
      var requestedActivityList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedActivityList : requestedActivityList
      });
    })
  }


  //firebase.firestore.FieldValue.increment(1)
  getUserProfile(){
    db.collection('Events')
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          participants : doc.data().Participants,
        })
      })
    })
  }

  
  

  getMaxParticipants(){
    db.collection('Events')
    .where('Participants','>','1')
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          participants : doc.data().Participants,
        })
      })
    })
  }

  

  
    componentDidMount(){
      this.getRequestedActivityList();    
      this.getMaxParticipants();
      console.log(this.state.participants)
    }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()  

  renderItem = ( {item, i} ) =>{    
    return (    
      <ListItem  
        key={i}
        title={item.Name}
        subtitle={item.Location +' '+item.Time}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}        
        bottomDivider              
      />
    )
  }

  
  


  getUserProfile(){
    db.collection('Users')
    .where('EmailId','==',this.state.userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          username : doc.data().Name,          
        })
      })
    })
  }

  render(){
    return(
      <View>
        <View>
          {
            this.state.requestedActivityList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Header 
                backgroundColor = {'blue'}
                centerComponent = {{
                    text : 'Activity',
                    style : { color: 'white', fontSize: 20}
                }}
                
                
            />      
                <Text style={{ fontSize: 20}}>There are no activities available Try Creating One?</Text>
              </View>
            )
            :(
              
              <ScrollView style={{marginTop:10}}>    
              <Header 
                backgroundColor = {'blue'}
                centerComponent = {{
                    text : 'Activity',
                    style : { color: 'white', fontSize: 20}
                }}
                
                
            />      
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedActivityList}
                renderItem={this.renderItem}
              />
              
              </ScrollView>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    fontSize: 20,
    // justifyContent:'center',
    
  },
  button:{
    width:120,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#800000",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
