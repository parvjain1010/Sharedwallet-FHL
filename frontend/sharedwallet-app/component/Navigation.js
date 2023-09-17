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
import AddGroupScreen from './AddGroupScreen';
import AddExpenseScreen from './AddExpenseScreen';
import AddParticipantsScreen from './AddParticipantsScreen';
import GroupPageScreen from './GroupPageScreen';
import ExpenseSplitScreen from './ExpenseSplitScreen';
// import FigmaHomeScreen from './FigmaHomeScreen';
import MakePaymentScreen1 from './MakePaymentScreen1';
import MakePaymentScreen2 from './MakePaymentScreen2';

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
        <Stack.Screen name="AddGroup" component={AddGroupScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="ExpenseSplit" component={ExpenseSplitScreen} />
        <Stack.Screen name="GroupPage" component={GroupPageScreen} />
        <Stack.Screen name="AddParticipants" component={AddParticipantsScreen} />
        {/* <Stack.Screen name="Figma" component={FigmaHomeScreen} /> */}
        <Stack.Screen name="MakePaymentScreen1" component={MakePaymentScreen1} />
        <Stack.Screen name="MakePaymentScreen2" component={MakePaymentScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
