import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import ApiService from '../api/api';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ProfileScreen({ navigation }) {
  const [userId, setuserId] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  useEffect(() => {
    async function func() {
      const storedUserId = await AsyncStorage.getItem("userId");
      setuserId(storedUserId);
      console.log(storedUserId);

      const user = await ApiService.getUserByUserId(storedUserId);
      console.log(user)
      setuserDetails(user);
      await sleep(2000);
      console.log("TESt");
      console.log(userDetails);
    };
    func();
  },
    []
  );
  const logout = () => {
    console.log("User logout!");
    navigation.navigate('Home');
  };
  return (
    <View>
      <Text>Welcome to the Profile Screen of {userId}</Text>


      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}

export default ProfileScreen;
