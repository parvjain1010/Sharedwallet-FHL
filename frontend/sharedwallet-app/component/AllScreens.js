import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllScreens ({navigation}) {

  return (
    <View> 
      <Button title="Profile Screen" onPress={() => navigation.navigate('Profile')} />
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
      <Button title="Start Screen" onPress = {() => navigation.navigate('Start')}/>
      <Button title="Wallet Screen" onPress = {() => navigation.navigate('UserWallet')}/>
      <Button title="Add Money to Wallet Screen" onPress = {() => navigation.navigate('AddMoneyToWallet')}/>
      <Button title="Transactions Screen" onPress = {() => navigation.navigate('Transactions')}/>
    </View>
  )
}

