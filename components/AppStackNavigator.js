import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ActivityScreen from '../Screens/Activity';
import ActivityDetailsScreen  from '../Screens/ActivityDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  Activities : {
    screen : ActivityScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  ActivityDetails : {
    screen : ActivityDetailsScreen,
    navigationOptions:{
      headerTitle:"About"
    }
    
  }
},
  {
    initialRouteName: 'Activities'
  }
);
