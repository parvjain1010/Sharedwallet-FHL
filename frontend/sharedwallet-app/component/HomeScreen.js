import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const userId = '1'
  useEffect(() => {
    async function func() {
      await AsyncStorage.setItem("userId", userId);
    };
    func();
  }, []);
  return (
    <View>
      <Text>Welcome to Hisaab</Text>
      {/* <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile', {userName})}
      /> */}
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
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
