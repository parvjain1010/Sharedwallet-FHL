import { View, TextInput, Button, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionScreen = ({route, navigation }) => {
  const [userId, setuserId] = useState(null);
  const [transactions, settransactions] = useState(null);
  const [transactionFor, settransactionFor] = useState(null);


  useEffect(() => {

    async function fetch_transaction_details() {
      console.log("Fetching is the current page is for user or group");
      
      const curtransactionFor = route.params?.transactionfor || "User";
      setwalletFor(curtransactionFor)
      console.log("Fetching current user or group");

      let storedValue;
      if (curtransactionFor === "User") {
        storedValue = await AsyncStorage.getItem("userId");
        setuserId(storedValue);
         console.log("Fetching all Transactions");
        //  transactions = await ApiService.getWalletIdForUser(storedValue);
        //  settransactions(curWallet);
      } else {
        storedValue = await AsyncStorage.getItem("groupId");
        setuserId(storedValue);
         console.log("Fetching all Transactions");
        // transactions = await ApiService.getWalletIdForGroup(storedValue);
        // setwalletId(curWallet);
      }


    };

    fetch_transaction_details();
  
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

export default TransactionScreen;