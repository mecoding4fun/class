import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CreateScreen from '../screens/Create';
import ActivityScreen from '../screens/Activity';
import ChannelScreen from '../screens/Chat';

export const AppTabNavigator = createBottomTabNavigator({  
  Create: {
    screen: CreateScreen,
    navigationOptions :{
      tabBarLabel : "Create Activity",
      tabBarIcon  : <Image source={require("../assets/Add.png")} style={{width:20, height:20}}/>
    }    
  },
  Activity: {
    screen: ActivityScreen,
    navigationOptions :{
      tabBarLabel : "Activity",
      tabBarIcon  : <Image source={require("../assets/jogg.png")} style={{width:20, height:20}}/>
    }
  },
  Chat: {
    screen: ChannelScreen,
    navigationOptions :{
      tabBarLabel : "Chat",
      tabBarIcon  : <Image source={require("../assets/jogg.png")} style={{width:20, height:20}}/>
    }
  },
  
});
