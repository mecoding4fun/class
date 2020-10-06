import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import CalendarPicker from react-native-calendar-picker;

export default class Calendar extends Component{
    constructor(props){
        super();
        this.state={
            SelectedDate: null,            
        }
        this.onDateChange = this.onDateChange.bind(this)
    }
    onDateChange(date){
        this.setState({
            SelectedDate:date
        })
    }
    render(){
        const {SelectedDate} = this.state;
        const minimumDate = new Date(2018,1,1);
        const maximumDate = new Date(2050,1,1);
        const EventDate = SelectedDate ? SelectedDate.toString() : "";

        return(
            <View style={styles.container}>
                <CalendarPicker 
                StartFromMonday = {true}
                allowRangeSelection = {true}
                minimumDate = {minimumDate}
                maximumDate = {maximumDate}
                weekDays = {["Mon","Tue","Wed","Thur","Fri","Sat","Sun"]}  
                Months = {["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]}     
                PreviousTitle = "Previous"      
                NextTitle = "Next"  
                todayBackgroundColor = {'Blue'}
                SelectedDayColor = {'Red'}
                onDateChange = {this.onDateChange}
                />
                <View><Text>Selected Date : {EventDate} </Text></View>
            </View>
        )
    }
}
const styles = StyleSheet.Create({
container:{
    alignItems:'center',
    flex:1,
    backgroundColor:'white',
    margin:150
}
})