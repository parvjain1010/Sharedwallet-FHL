import { View, TextInput, Button, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMoneyToWalletScreen = ({route, navigation }) => {
  const [userId, setuserId] = useState(null);
  // const [walletId, setwalletId] = useState(null);
  const [walletFor, setwalletFor] = useState(null);
  const [amount, setamount] = useState(0);


  useEffect(() => {

    async function fetch_wallet_details() {
      console.log("Fetching is the current page is for user or group");
      
      const curwalletFor = route.params?.walletfor || "User";
      setwalletFor(curwalletFor)
      console.log("Fetching current user or group");

      let storedValue;
      let curWallet = -1;
      if (curwalletFor === "User") {
        storedValue = await AsyncStorage.getItem("userId");
        setuserId(storedValue);
        // console.log("Fetching current wallet id");
        // curWallet = await ApiService.getWalletIdForUser(storedValue);
        // setwalletId(curWallet);
      } else {
        storedValue = await AsyncStorage.getItem("groupId");
        setuserId(storedValue);
        // console.log("Fetching current wallet id");
        // curWallet = await ApiService.getWalletIdForGroup(storedValue);
        // setwalletId(curWallet);
      }
    };

    fetch_wallet_details();
  
  }, [navigation]);


  const onAddMoneyClick = async() => {
    console.log("Add money to current wallet");
    await ApiService.addMoneyToPersonalWallet(userId,amount);
    console.log("Navigating back to user home page")
    navigation.navigate("Home");
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text>Add money to {walletFor} id: {userId}</Text>
      <TextInput
        value={amount.toString()}
        onChangeText={setamount}
        placeholder="Amount to be added"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
      />
      <Button title="Add Money" onPress={onAddMoneyClick} />
    </View>
  );
};

export default AddMoneyToWalletScreen;