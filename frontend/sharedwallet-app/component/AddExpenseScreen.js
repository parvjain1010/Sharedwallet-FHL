import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../api/api';
import CustomSelectBox from './atoms/CustomSelectBox';

// 
// Group Details Basic                                  Done
// Wallet Details Basic                                 Done
// Input Fields - title, amount, date                   Done
// Checkbox - who's involved , what is the split        
// Buttons - Cancel , Add Expense                       Done
// 

function AddExpenseScreen({ navigation, route }) {

  const selected = route.params?.selected || [];

  const [ groupId, setGroupId ] = useState(-1);
  const [ group, setGroup ] = useState({ name: "" });
  const [ wallet, setWallet ] = useState({ balance: "0"});
  const [ members, setMembers ] = useState([]);
  
  const [ expenseTitle , setExpenseTitle ] = useState("");
  const [ amount, setAmount ] = useState("0");
  const [ transactionDate, setTransactionDate ] = useState("");
  const [ paidBy, setPaidBy ] = useState(-1);
  const [ usersInvolved, setUsersInvolved ] = useState([]);
  const [ splits, setSplits ] = useState([]);

  useEffect(() => {

    async function FetchUserInvolved() {
      if (route.params?.selected) { 
        console.log("selected route.params");
        console.log(selected);
        console.log(route.params);
        setUsersInvolved(route.params.selected);
        console.log(usersInvolved);
      }
    }

    FetchUserInvolved();
  }, [route.params?.selected]);

  useEffect(() => {

    async function FetchDetails() {

      const group_id = await AsyncStorage.getItem("currentGroupId");
      setGroupId(group_id)
      console.log(group_id)

      const _group = await ApiService.getGroupByGroupId(group_id);
      setGroup(_group);
      console.log(JSON.stringify(_group));

      const _wallet = await ApiService.getGroupWalletByGroupId(group_id);
      setWallet(_wallet);

      const _members = await ApiService.getGroupMembersByGroupId(group_id);
      setMembers(_members);
      console.log(members);
      console.log(_members);

      console.log("selected route.params old");
      console.log(selected);
      // setUsersInvolved(selected);
    }

    FetchDetails();
  }, [ navigation ]);

  const addExpense = async () => {

    const userId = await AsyncStorage.getItem("userId");
    console.log(`addExoense : ${userId}`);
    await ApiService.addGroupExpense(expenseTitle, amount, transactionDate, usersInvolved, splits, groupId, userId);
    navigation.navigate("GroupPage");
  };

  const setPayingUser = async (member) => {
    console.log("setPayingUser method");
    console.log(JSON.stringify(member));
    setPaidBy(member.user_id);
  }

  const removeUserFromExpense = (item) => {
    const newMembers = usersInvolved.filter(i => i.user_id !== item.user_id);
    setUsersInvolved(newMembers);    
  }

  const renderUserInvolved = ({item}) => {
    <View>
      <Text>{item.user_id}</Text>
      <Button title="-" onPress={() => removeUserFromExpense(item)} />
    </View>    
  };

  return (
    <View>
      <View>
        <Text>Add Expense</Text>
        <Text>{group.name}</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("GroupPage")} />
      </View>
      <View>
        <Text>Wallet Details</Text>
        <Text>{wallet.balance}</Text>
      </View>
      <View>
      <TextInput
        value={expenseTitle}
        onChangeText={setExpenseTitle}
        placeholder="Title"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={transactionDate}
        onChangeText={setTransactionDate}
        placeholder="Expense Date"
        secureTextEntry
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      </View>
      <View>
      <Text>Paid By:</Text>
      <CustomSelectBox items={members} onItemSelected={item => setPayingUser(item)}></CustomSelectBox>
      </View>
      <View>
        <Button title="Add People To Expense" onPress={() => navigation.navigate("ExpenseSplit", {
          members: members, selected:usersInvolved })} />
         {usersInvolved&&(

           <SafeAreaView>
        <FlatList data={usersInvolved} renderItem={renderUserInvolved} keyExtractor={(item) => item.user_id} />

          </SafeAreaView>
           )} 
      </View>
      <View>
        <Button title="Cancel" onPress={() => navigation.navigate("GroupPage")} />
        <Button title="Add" onPress={addExpense} />
      </View>
    </View>
  );
}

export default AddExpenseScreen;
