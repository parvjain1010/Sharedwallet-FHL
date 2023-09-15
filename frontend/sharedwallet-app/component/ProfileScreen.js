import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

function ProfileScreen({ navigation }) {
  const [userName,setuserName] = useState(null);
  useEffect (() => {
    async function func(){
      const storedUserName = await AsyncStorage.getItem("userName");
      setuserName(storedUserName);
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
      <Text>Welcome to the Profile Screen of {userName}</Text>

      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}

export default ProfileScreen;
