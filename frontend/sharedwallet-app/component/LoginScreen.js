import { View, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../api/api';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock authentication for the sake of this example
    const user_id = AuthService.login(username, password)
    if (user_id !== -1) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

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
