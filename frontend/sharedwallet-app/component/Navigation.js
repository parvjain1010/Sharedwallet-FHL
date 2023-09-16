// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import AllScreens from './AllScreens';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserWalletScreen from './UserWalletScreen';
import AddMoneyToWalletScreen from './AddMoneyToWallet';
import TransactionScreen from './TransactionScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllScreens">
        <Stack.Screen name="AllScreens" component={AllScreens} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserWallet" component={UserWalletScreen} />
        <Stack.Screen name="AddMoneyToWallet" component={AddMoneyToWalletScreen} />
        <Stack.Screen name="Transactions" component={TransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
