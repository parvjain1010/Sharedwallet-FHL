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
import TransactionsScreen from './TransactionsScreen';
import AddGroupScreen from './AddGroupScreen';
import AddExpenseScreen from './AddExpenseScreen';
import AddParticipantsScreen from './AddParticipantsScreen';
import GroupPageScreen from './GroupPageScreen';
import ExpenseSplitScreen from './ExpenseSplitScreen';
// import FigmaHomeScreen from './FigmaHomeScreen';
import MakePaymentScreen1 from './MakePaymentScreen1';
import MakePaymentScreen2 from './MakePaymentScreen2';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Home'/>
    <BottomNavigationTab title='Wallet'/>
    <BottomNavigationTab title='+'/>
    <BottomNavigationTab title='History'/>
    <BottomNavigationTab title='Profile'/>
  </BottomNavigation>
);

const UserTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} screenOptions={{ headerShown: false }}/>}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="UserWallet" component={UserWalletScreen} />
        <Tab.Screen name="AddGroup" component={AddGroupScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserTab" component={UserTabNavigator}/>
        <Stack.Screen name="GroupPage" component={GroupPageScreen} />
        <Stack.Screen name="AllScreens" component={AllScreens} />
        <Stack.Screen name="AddMoneyToWallet" component={AddMoneyToWalletScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="ExpenseSplit" component={ExpenseSplitScreen} />
        <Stack.Screen name="AddParticipants" component={AddParticipantsScreen} />
        {/* <Stack.Screen name="Figma" component={FigmaHomeScreen} /> */}
        <Stack.Screen name="MakePaymentScreen1" component={MakePaymentScreen1} />
        <Stack.Screen name="MakePaymentScreen2" component={MakePaymentScreen2} />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
