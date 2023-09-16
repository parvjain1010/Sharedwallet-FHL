import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from './api/api';

import AllUsers from './component/AllUsers';
import ProfileScreen from './component/ProfileScreen';
import HomeScreen from './component/HomeScreen';
import LoginScreen from './component/LoginScreen';
import RegisterScreen from './component/RegisterScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
export default function App() {

  const [users, setUsers] = useState([]);
  const title = "Parv Jain";

  useEffect(() => {
    (async() => {
        try {
          console.log("Hey there");
          const fetchedData = await ApiService.getAllUsers();
          console.log(fetchedData);
          setUsers(fetchedData);
        }
        catch (err) {
          throw err;
        }
    })();
  }, []);
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AllUsers" component={AllUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
