import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../api/api';

function GroupPageScreen({ navigation }) {

  const [ group, setGroup ] = useState({ name: "" });
  const [ wallet, setWallet ] = useState(null);
  //   const [ groupDesposits, setGroupDeposits ] = useState([]);
  //   const [ groupExpenses, setGroupExpenses ] = useState([]);
  const [ groupTransactions, setGroupTransactions ] = useState([]);

  useEffect(() => {

    async function FetchGroupDetails() {

      const group_id = await AsyncStorage.getItem("currentGroupId");
      console.log(group_id)
      const _group = await ApiService.getGroupByGroupId(group_id);
      setGroup(_group);
      console.log(JSON.stringify(_group));

      // const _wallet = await ApiService.getGroupWalletByGroupId(group_id);
      // setWallet(_wallet);

      // const _deposits = await ApiService.getIncomingTransactionsForGroup(group_id);
      // setGroupDeposits(_deposits);

      // const _expenses = await ApiService.getOutgoingTransactionsForGroup(group_id);
      // setGroupExpenses(_expenses);

      // const _transactions = orderDepositsExpensesByDate(_deposits, _expenses);
      // const _transactions = await ApiService.getTransactionsForGroup(group_id);
      // setGroupTransactions(_transactions);
    }

    FetchGroupDetails();
  }, [ navigation ]);

  const navigateToTransactionDetailPage = ({ transaction_id }) => {
    navigation.navigate("TransactionDetails", { transaction_id: transaction_id });
  }

  const renderItem = ({ item }) => (
    <View>
      if(item.type === "DEPOSITS") {
        <View>
          <Text>{item.transaction.title}</Text>
          <Text>{item.transaction.amount}</Text>
          <Text>{item.transaction.date}</Text>
        </View>
      }
      else {
        <Pressable key={item.transaction.id} onPress={() => navigateToTransactionDetailPage(item.transaction.id)}>
          <Text>{item.transaction.title}</Text>
          <Text>{item.transaction.amount}</Text>
          <Text>{item.transaction.date}</Text>
        </Pressable>
      }
    </View>
  );

  return (
    <View>
      <View>
        <Text>Group Page</Text>
        <Text>{group.name}</Text>
        <Button title="Group Settings" onPress={() => navigation.navigate("GroupSettings")} />
        <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      </View>
      <View>
        <Text>Wallet Details</Text>
      </View>
      <View>
        <Text>Transactions</Text>
        <SafeAreaView>
          {/* <FlatList data={groupTransactions} renderItem={renderItem} keyExtractor={(item) => item.transaction.id} /> */}
        </SafeAreaView>
      </View>
      <View>
        <Button title="Add Expense" onPress={() => navigation.navigate("AddExpense")} />
        <Button title="Make Payment" onPress={() => navigation.navigate("MakePayment")} />
      </View>
    </View>
  );
}

export default GroupPageScreen;
