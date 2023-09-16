import { View, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userId = "-1";

  const handleLogin = async () => {
    // Mock authentication for the sake of this example
    const user_id = await AuthService.login(username, password);
    if (user_id !== -1) {
      await AsyncStorage.setItem("userId", user_id.toString());
      const checkSavedId = await AsyncStorage.getItem("userId");
      console.log("From Login Screen");
      console.log(checkSavedId);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  useEffect(() => {

  }, [navigation])

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
