import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakePaymentScreen2 = ({ route, navigation }) => {
  const [amount, setAmount] = useState('');
  const [transactionDetails, settransactionDetails] = useState('');
  const [paymentFor, setpaymentFor] = useState(null);


  useEffect(()=>{
    async function get_current_wallet(){
      const paymentFor = route.params.paymentFor;
      console.log(paymentFor);
      setpaymentFor(paymentFor.toString());

    };
    get_current_wallet();

  },[navigation]);
  const handlePayment = async() => {
    console.log("Fetching current user!");
      const user_id = await AsyncStorage.getItem("userId");
    if(paymentFor == "User")
    {
      console.log("Payment of amount ${amount} is done by User Wallet");

      
      console.log("make payment for current user!");
      await ApiService.makePaymentViaUser(user_id,transactionDetails,amount);
    }
    else{
      console.log("Payment of amount ${amount} is done by Group Wallet");
      console.log("Fetching current group!");
      const group_id = await AsyncStorage.getItem("currentGroupId");
      console.log("make payment for current group!");
      await ApiService.makePaymentViaGroup(group_id,transactionDetails,amount,user_id);

    }
    navigation.navigate("GroupPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Make Payment</Text>
      </View>
      {paymentFor&&(
        <Text style={styles.subHeaderText}>Making Payment by {paymentFor} wallet</Text>
        )
      }
      <TextInput
        placeholder="Enter amount"
        style={styles.input}
        onChangeText={text => setAmount(text)}
        value={amount}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Transaction Details"
        style={styles.input}
        onChangeText={text =>settransactionDetails(text)}
        value={transactionDetails}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
      >
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate("AllScreens")}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: 'white',
    width: '80%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    width: '80%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MakePaymentScreen2;
