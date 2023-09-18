import { Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../api/api';
import { Layout, Text, Input, Button, withStyles } from '@ui-kitten/components';


const RegisterScreenCore = ({ eva, navigation, ...props }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    const user_id = AuthService.register(name, email, password, phone)
    if (user_id !== -1) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Could not register the user');
    }
  };

  return (
    <Layout style={eva.style.container}>
      <Text category="h2" style={eva.style.title}>Register !!</Text>
      <Input
      style={eva.style.input}
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        />
      <Input
      style={eva.style.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email ID"
        />
      <Input
      style={eva.style.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        />
      <Input
      style={eva.style.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone No"
        />
      <Button style={eva.style.button} onPress={handleRegister}>Register</Button>
        </Layout>
  );
};

const RegisterScreen = withStyles(RegisterScreenCore, (theme) => ({
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

export default RegisterScreen;
