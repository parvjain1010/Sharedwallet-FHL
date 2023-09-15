import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import ApiService from './api/api';

export default function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async() => {
        try {
          console.log("Hey there");
          const fetchedData = await ApiService.getAllUsers();
          console.log(fetchedData);
          setUsers(fetchedData);
        }
        catch (err) {
          throw err;
        }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(users)}</Text>
      <Text>Apple</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
