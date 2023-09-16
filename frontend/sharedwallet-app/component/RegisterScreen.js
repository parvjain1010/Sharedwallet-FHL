import { View, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../api/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    const user_id = AuthService.register(name, email, password, phone)
    if (user_id !== -1) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Could not register the user');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email ID"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone No"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
