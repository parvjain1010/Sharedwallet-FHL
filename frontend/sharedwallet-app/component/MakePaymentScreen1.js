import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ApiService } from '../api/api';

const MakePaymentScreen1 = ({ navigation }) => {
  const[groups,setGroups] = useState(null);
  useEffect(()=>{
    async function get_current_group(){
      const groupId = await AsyncStorage.getItem("currentGroupId");

      const group = await ApiService.getGroupByGroupId(groupId);
      setGroups(group);

    };
    get_current_group();

  },[navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Make Payment</Text>
      </View>
      {groups&&(
        <Text style={styles.subHeaderText}>Making Payment for Group: {groups.name}</Text>
        )
      }
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MakePaymentScreen2',{paymentFor : "Group"})}
        >
          <Text style={styles.buttonText}>Make Payment by Group Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MakePaymentScreen2',{paymentFor : "User"})}
        >
          <Text style={styles.buttonText}>Make Payment by User Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5BCFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: 'lightgray',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10, // Adjust the spacing
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    width: 250,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MakePaymentScreen1;
