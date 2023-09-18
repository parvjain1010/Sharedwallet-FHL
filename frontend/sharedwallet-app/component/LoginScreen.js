import { View, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout, Text, Input, Button, withStyles } from '@ui-kitten/components';


const LoginScreenCore = ({ eva, navigation, ...props }) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = async () => {
    const user_id = await AuthService.login(email, password);
    if (user_id !== -1) {
      await AsyncStorage.setItem("userId", user_id.toString());
      const checkSavedId = await AsyncStorage.getItem("userId");
      console.log("From Login Screen");
      console.log(checkSavedId);
      navigation.navigate('UserTab');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  useEffect(() => {

  }, [ navigation ])

  return (
    <Layout style={eva.style.container}>
      <Text category="h2" style={eva.style.title}>Welcome to hisaab</Text>
      <Input
        style={eva.style.input}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />

      <Input
        style={eva.style.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button style={eva.style.button} onPress={handleLogin}>
        LOGIN
      </Button>

    </Layout>
  );
};

const LoginScreen = withStyles(LoginScreenCore, (theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  title: {
    marginVertical: 8,
  },
  input: {
    marginVertical: 8,
    width: '100%',
  },
  button: {
    marginVertical: 16,
    width: '100%',
  },
}));

export default LoginScreen;
