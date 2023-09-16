import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const userId = '1'
  useEffect(() => {
    
  // Add a listener to execute code when the screen is focused
  const unsubscribe = navigation.addListener('focus', () => {
    console.log("HomeScreen is focused");
    async function func() {
      await AsyncStorage.setItem("userId", userId);
    };
    func();
    // You can add additional logic to run when the screen is focused here
  });

  // Cleanup the listener when the component unmounts
  return unsubscribe;
}, [navigation]); // Include navigation in the dependency array

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
