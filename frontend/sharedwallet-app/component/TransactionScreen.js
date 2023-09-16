import { View, TextInput, Button, Alert, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionScreen = ({route, navigation }) => {
  const [userId, setuserId] = useState(null);
  const [incomingtransactions, setincomingtransactions] = useState(null);
  const [outgoingtransactions, setoutgoingtransactions] = useState(null);
  const [transactionFor, settransactionFor] = useState(null);


  useEffect(() => {

    async function fetch_transaction_details() {
      console.log("Fetching is the current page is for user or group");
      
      const curtransactionFor = route.params?.transactionfor || "User";
      settransactionFor(curtransactionFor)
      console.log("Fetching current user or group");

      let storedValue;
      let incomingtransactions;
      let outgoingtransactions;
      if (curtransactionFor === "User") {
        storedValue = await AsyncStorage.getItem("userId");
        setuserId(storedValue);
         console.log("Fetching all Transactions");
         incomingtransactions = await ApiService.getIncomingTransactionsForUser(storedValue);
         setincomingtransactions(incomingtransactions);
         outgoingtransactions = await ApiService.getOutgoingTransactionsForUser(storedValue);
         setoutgoingtransactions(outgoingtransactions);
      } else {
        storedValue = await AsyncStorage.getItem("groupId");
        setuserId(storedValue);
         console.log("Fetching all Transactions");
         incomingtransactions = await ApiService.getIncomingTransactionsForGroup(storedValue);
         setincomingtransactions(incomingtransactions);
         outgoingtransactions = await ApiService.getOutgoingTransactionsForGroup(storedValue);
         setoutgoingtransactions(outgoingtransactions);
      }


    };

    fetch_transaction_details();
  
  }, [navigation]);

  const renderTransactionItem = ({ item }) => (
    <View>
      <Text>Transaction title: {item.title}</Text>
      <Text>Transaction amount: {item.amount}</Text>
      <Text>Transaction date: {item.date}</Text>
      <Text> </Text>
    </View>
  );
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text>{transactionFor} Transactions: {userId}</Text>
      <Text> </Text>
      {/* Render the list of groups here */}
      {incomingtransactions && (<View>
        <Text>Incoming Transactions:</Text>
        <FlatList
          data={incomingtransactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item}
          ListEmptyComponent={<Text>No incoming transaction found.</Text>}
        />
      </View>)}

      {/* Render the list of groups here */}
      {outgoingtransactions && (<View>
        <Text>Outgoing Transactions:</Text>
        <FlatList
          data={outgoingtransactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item}
          ListEmptyComponent={<Text>No Outgoing Transactions.</Text>}
        />
      </View>)}
    </View>
  );
};

export default TransactionScreen;