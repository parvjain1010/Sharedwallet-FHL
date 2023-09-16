import { View, TextInput, Button, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserWalletScreen = ({ navigation }) => {
  // const [userId, setuserId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [userName, setuserName] = useState(null);


  useEffect(() => {

    async function fetchuserdetail() {
      console.log("Fetching user wallet balance and user details!");
      // fetch current user from local storage
      const storedUserId = await AsyncStorage.getItem("userId");
      // fetch current users name and wallet balance using api calls

      fetchWalletBalanceAPI(storedUserId)
      .then((response) => {
        setWalletBalance(response.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching wallet balance:', error);
      });

      const user = await ApiService.getUserByUserId(storedUserId);
      setuserName(user.name);
    };

    fetchuserdetail();
  
  }, [navigation]);

  const fetchWalletBalanceAPI = async (userId) => {
    const balance = await ApiService.getWalletBalanceByUserId(userId);
    console.log(balance.toString());
    return { data: { balance: balance } };
  };

  const onAddMoneyClick = () => {
    console.log("Taking to add money page");
  }
  return (
    <View>
      <View>
        <Text>Wallet Balance for {userName}: ${walletBalance}</Text>
      </View>
      <Button
        title="Add Money"
        onPress={onAddMoneyClick}
      />
    </View>
  );
};

export default UserWalletScreen;