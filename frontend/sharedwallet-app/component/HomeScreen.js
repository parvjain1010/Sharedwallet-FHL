import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homescrenbutton from './images/HomescreenButton.png'
import { ApiService } from '../api/api';

function HomeScreen({ navigation }) {
  const [ userId, setUserId ] = useState('1');
  const [ walletBalance, setWalletBalance ] = useState(null);
  const [ groups, setGroups ] = useState([]);


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
        const groups = await ApiService.getGroupsForUserId(storedUserId);
        setGroups(groups)
      };
      func();
    });

    return unsubscribe;

  }, [ navigation ]); // Include navigation in the dependency array

  const renderItem = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

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
    return { data: { groups: [ 'Group A', 'Group B', 'Group C' ] } };
  };

  const scanToPay = () => {
    console.log('Scanning to pay...');
  };

  const addMoneyToWallet = () => {

    console.log('Adding money to wallet...');
    navigation.navigate("AddMoneyToWallet",{"walletfor": "User"})
  };

  const sendMoney = () => {
    console.log('Sending money...');
  };

  const goToWallet = () => {
    console.log('On Wallet Page...');
  };

  const navigateToGroupPage = async (group_id) => {
    console.log("navigateToGroupPage");
    console.log(group_id);
    await AsyncStorage.setItem("currentGroupId", group_id.toString());
    const _groupId = await AsyncStorage.getItem("currentGroupId");
    console.log(_groupId);
    navigation.navigate("GroupPage");
  }

  const renderGroupItem = ({ item, index }) => (
    <Pressable key={index} onPress={() => navigateToGroupPage(item.id)} >
      <Text>Group Name: {item.name}</Text>
    </Pressable>
  );

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
      {groups && (<View>
        <Text>User Groups:</Text>
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No groups found.</Text>}
        />
      </View>)}
      <View>
        {/* Bottom navigation */}
        <Button title="Home" />
        <Button title="Wallet" onPress={goToWallet} />
        <Button title="+" onPress={() => navigation.navigate("AddGroup")} />
        <Button title="History" onPress={() => navigation.navigate("Transactions")} />
        <Button title="Account" onPress={() => navigation.navigate("Profile")} />
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
