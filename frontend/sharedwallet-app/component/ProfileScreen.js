import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { ApiService } from '../api/api';

function ProfileScreen({ navigation }) {
  const [userId, setuserId] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [userGroups, setuserGroups] = useState(null);
  const [userUpis, setuserUpis] = useState(null);

  const renderUpiItem = ({ item }) => (
    <View>
      <Text>UPI ID : {item.upi_id}</Text>
    </View>
  );
  const renderGroupItem = ({ item }) => (
    <View>
      <Text>Group Name: {item.name}</Text>
    </View>
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("ProfileScreen is focused");
      async function func() {
        const storedUserId = await AsyncStorage.getItem("userId");
        setuserId(storedUserId);

        const user = await ApiService.getUserByUserId(storedUserId);
        setuserDetails(user);
        console.log("Fetching user groups!");

        const groups = await ApiService.getGroupsForUserId(storedUserId);
        setuserGroups(groups)
        console.log("Fetching user upis");
        const upis = await ApiService.getUpisForUserId(storedUserId);
        setuserUpis(upis)
      };
      func();
      // You can add additional logic to run when the screen is focused here
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  },
    [navigation]
  );

  useEffect(() => {
    // This effect will run whenever userDetails changes
    console.log("userDetails updated:", userDetails);
  }, [userDetails]);

  const logout = async () => {
    console.log("User logout!");
    await AsyncStorage.setItem("userId", '0');
    navigation.navigate('Start');
  };
  return (
    <View>
      <Text>Welcome to the Profile Screen of {userId}</Text>

      {userDetails && (
        <View>
          <View>
            <Text>User Details:</Text>
            <Text>Name: {userDetails.name}</Text>
            <Text>Email: {userDetails.email}</Text>
            {/* Add more user details here */}
          </View>
          {/* Render the list of groups here */}
          {userGroups&&(<View>
            <Text>User Groups:</Text>
            <FlatList
              data={userGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item}
              ListEmptyComponent={<Text>No groups found.</Text>}
            />
          </View>)}
          {userUpis&&(<View>
            <Text>User UPIs:</Text>
            <FlatList
              data={userUpis}
              renderItem={renderUpiItem}
              keyExtractor={(item) => item}
              ListEmptyComponent={<Text>No UPI Id found.</Text>}
            />
          </View>)}
        </View>
      )}
      
      <Button
        title="My Transactions"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}

export default ProfileScreen;
