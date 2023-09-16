import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import ApiService from '../api/api';

function ProfileScreen({ navigation }) {
  const [userId, setuserId] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("ProfileScreen is focused");
    async function func() {
      const storedUserId = await AsyncStorage.getItem("userId");
      setuserId(storedUserId);

      const user = await ApiService.getUserByUserId(storedUserId);
      setuserDetails(user);
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

  const logout = async() => {
    console.log("User logout!");
    await AsyncStorage.setItem("userId",'0');
    navigation.navigate('Home');
  };
  return (
    <View>
      <Text>Welcome to the Profile Screen of {userId}</Text>

      {userDetails && (
        <View>
          <Text>User Details:</Text>
          <Text>Name: {userDetails.name}</Text>
          <Text>Email: {userDetails.email}</Text>
          {/* Add more user details here */}
        </View>
      )}
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}

export default ProfileScreen;
