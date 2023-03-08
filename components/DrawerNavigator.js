import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CreatePost from '../screens/CreatePost';
import LoginScreen from '../screens/LoginScreen';

import { MainStackNavigator, DrawerTest } from './StackNavigator'
import BottomTabs from './TabsNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={BottomTabs} /> 
        <Drawer.Screen name="Home" component={MainStackNavigator} />
      </Drawer.Navigator>
  )
}

export default DrawerNavigator