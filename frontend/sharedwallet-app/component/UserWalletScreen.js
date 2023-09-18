import { View, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import { Layout, Text, Input, Button, Card, withStyles } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserWalletScreenCore = ({ eva, navigation, ...props }) => {

  const [ walletBalance, setWalletBalance ] = useState(null);
  const [ userName, setuserName ] = useState(null);

  useEffect(() => {

    async function fetchuserdetail() {
      console.log("Fetching user wallet balance and user details!");
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

  }, [ navigation ]);

  const fetchWalletBalanceAPI = async (userId) => {
    const balance = await ApiService.getWalletBalanceByUserId(userId);
    console.log(balance.toString());
    return { data: { balance: balance } };
  };

  const onAddMoneyClick = () => {
    console.log("Taking to add money page");
  }
  return (
    <Layout style={eva.style.container}>
      <Text category="h2" style={eva.style.title}>{userName}'s Wallet</Text>
      <Card style={eva.style.card}>
        <Text category="s1" style={eva.style.text}>Wallet Balance</Text>
        <Text category="h3" style={eva.style.text}>Rs. {walletBalance}</Text>
      </Card>
      <Button style={eva.style.button}
        onPress={onAddMoneyClick}>ADD MONEY</Button>
      <Button style={eva.style.button}
        onPress={onAddMoneyClick}>WITHDRAW MONEY</Button>
    </Layout>
  );
};

const UserWalletScreen = withStyles(UserWalletScreenCore, (theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  title: {
    marginVertical: 8,
  },
  card: {
    width: '80%',
    padding: 16,
  },
  button: {
    marginVertical: 16,
    width: '100%',
  },
  text: {
    marginVertical: 4, // Adjust as needed
  },
}));

export default UserWalletScreen;