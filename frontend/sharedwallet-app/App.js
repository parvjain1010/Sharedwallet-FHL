import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import ApiService from './api/api';

import AllUsers from './component/AllUsers';
import ProfileScreen from './component/ProfileScreen';
import HomeScreen from './component/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './component/Navigation';
const Stack = createStackNavigator();
export default function App() {

  const [users, setUsers] = useState([]);
  const AppName = "Hisaab";

  // useEffect(() => {
  //   (async() => {
  //       try {
  //         console.log("Hey there");
  //         const fetchedData = await ApiService.getAllUsers();
  //         console.log(fetchedData);
  //         setUsers(fetchedData);
  //       }
  //       catch (err) {
  //         throw err;
  //       }
  //   })();
  // }, []);
  
  return (

    <Navigation />
  );
};
