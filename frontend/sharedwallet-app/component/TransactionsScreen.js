import { View, TextInput, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout, Text, Input, Button, List, Card, withStyles } from '@ui-kitten/components';


const TransactionsScreenCore = ({ eva, route, navigation, ...props }) => {
  const [ userId, setuserId ] = useState(null);
  const [ incomingtransactions, setincomingtransactions ] = useState(null);
  const [ outgoingtransactions, setoutgoingtransactions ] = useState(null);
  const [ transactionFor, settransactionFor ] = useState(null);


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

  }, [ navigation ]);

  const renderTransactionItem = ({ item }) => (
    <Card style={eva.style.card}>
      <Text category="s2">{item.title}</Text>
      <Text category="h6">Rs. {item.amount}</Text>
      {/* <Text category="s1">{item.date}</Text> */}
    </Card>
  );

  const renderEmptyComponent = () => {
    <Card style={eva.style.card}>
      <Text category='h6'>No transactions</Text>
    </Card>
  }
  return (
    <Layout style={eva.style.container}>
      <Text category="h4" style={eva.style.title}>{transactionFor} Transactions</Text>
      <Layout style={eva.style.container2}>
        <Text category="h6" style={eva.style.title}>Deposits</Text>

        {/* Render the list of groups here */}
        {incomingtransactions && (
          <List
            data={incomingtransactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </Layout>
      <Layout style={eva.style.container2}>
        <Text category="h6" style={eva.style.title}>Withdrawls</Text>

        {/* Render the list of groups here */}
        {outgoingtransactions && (
          <List
            data={outgoingtransactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </Layout>
    </Layout>
  );
};

const TransactionsScreen = withStyles(TransactionsScreenCore, (theme) => ({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 8,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  title: {
    marginVertical: 8,
  },
  card: {
    width: '100%',
    padding: 4,
  },
  button: {
    marginVertical: 16,
    width: '100%',
  },
  text: {
    marginVertical: 4, // Adjust as needed
  },
}));

export default TransactionsScreen;