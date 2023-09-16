import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homescrenbutton from './images/HomescreenButton.png'
import { ApiService } from '../api/api';

function HomeScreen({ navigation }) {
  const [userId,setUserId] = useState('1');
  const [walletBalance, setWalletBalance] = useState(null);
  const [groups, setGroups] = useState([]);
  
  
  useEffect(() => {
    
  // Add a listener to execute code when the screen is focused
  const unsubscribe = navigation.addListener('focus', () => {
    console.log("HomeScreen is focused");
    async function func() {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log(storedUserId);

      fetchWalletBalanceAPI(storedUserId)
      .then((response) => {
        console.log("We are here!")
        setWalletBalance(response.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching wallet balance:', error);
      });

    // Fetch user groups
    fetchUserGroupsAPI(storedUserId)
      .then((response) => {
        setGroups(response.data.groups);
      })
      .catch((error) => {
        console.error('Error fetching user groups:', error);
      });
    };
    func();
  });

  return unsubscribe;

}, [navigation]); // Include navigation in the dependency array

const renderItem = ({ item }) => (
  <View>
    <Text>{item}</Text>
  </View>
);


useEffect(()=> {
  console.log("WalletBalanceUpdated!");
}, [walletBalance])

useEffect(()=> {
  console.log("User Groups Updated!");
}, [groups])

const fetchWalletBalanceAPI = async (userId) => {
  // Simulate an API call to fetch wallet balance for the user
  // Replace this with your actual API endpoint
  const balance = await ApiService.getWalletBalanceByUserId(userId);
  console.log(balance.toString());
  return { data: { balance: balance } };
};

const fetchUserGroupsAPI = async (userId) => {
  // Simulate an API call to fetch groups for the user
  // Replace this with your actual API endpoint
  return { data: { groups: ['Group A', 'Group B', 'Group C'] } };
};

  const scanToPay = () => {
    console.log('Scanning to pay...');
  };

  const addMoneyToWallet = () => {
    console.log('Adding money to wallet...');
  };

  const sendMoney = () => {
    console.log('Sending money...');
  };

  const goToWallet = () => {
    console.log('On Wallet Page...');
  };




  return (
    <View>
    <View>
      <Text>Welcome to Hisaab</Text>
      <Text>Wallet Balance: {walletBalance !== null ? `$${walletBalance}` : 'Loading...'}</Text>
    </View>
    <View>
      <Button title="Scan to Pay" onPress={scanToPay} />
      <Button title="Add Money to Wallet" onPress={addMoneyToWallet} />
      <Button title="Send Money" onPress={sendMoney} />
    </View>
    {/* Render the list of groups here */}
    <View>
        <Text>User Groups:</Text>
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          ListEmptyComponent={<Text>No groups found.</Text>}
        />
      </View>
    <View>
      {/* Bottom navigation */}
      <Button title="Home" />
      <Button title="Wallet" onPress={goToWallet} />
      <Button title="+" />
      <Button title="History" />
      <Button title="Account" onPress={() => navigation.navigate("Profile")}/>
      <Image
          source={homescrenbutton}
          style={{ width: 50, height: 50 }} // Adjust the dimensions as needed
          onPress={() => {
            // Handle the Home button press here
            console.log('Home button pressed');
          }}
        />
    </View>

  </View>

  );
}

export default HomeScreen;
