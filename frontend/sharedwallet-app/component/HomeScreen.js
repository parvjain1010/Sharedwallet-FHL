import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation }) {
  const userName = "Parv Jain"
  useEffect(() =>{
    async function func(){
      await AsyncStorage.setItem("userName", userName);
    };
  func();
},[]);
  return (
    <View>
      <Text>Welcome to Hisaab</Text>
      {/* <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile', {userName})}
      /> */}
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile'  )}
      />
      {/* <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      /> */}
    </View>
  );
}

export default HomeScreen;
