import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../api/api';
import RadioButton from './atoms/RadioButton';

function HomeScreen({ navigation }) {

  const [ groupname, setGroupname ] = useState('');
  const [ expenseType, setExpenseType ] = useState("One Time");
  const [ budgetAmount, setBudgetAmount ] = useState(0);
  const [ groupDescription, setGroupDescription ] = useState("");


  const expenseTypes = [
    { index: 1, value: "One Time" },
    { index: 2, value: "Recuring" }
  ]

  const createGroup = async () => {
    // Mock authentication for the sake of this example
    const user_id = await AsyncStorage.getItem("userId");
    if (user_id === -1) {
      Alert.alert('Error', 'User is not looged in');
      navigation.navigate('Start');
    }

    const group_id = ApiService.createGroup(user_id, groupname, groupDescription, expenseType, budgetAmount);
    if (group_id === -1) {
      Alert.alert('Error', 'Group was not created');
    }

    await AsyncStorage.setItem("currentGroupId", group_id.toString());
    const storedGroupId = await AsyncStorage.getItem("currentGroupId");
    console.log(`Current group id : ${storedGroupId}`);
    navigation.navigate('Home');
  };

  return (
    <View>
      <View>
        <Text>Add Group</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      </View>
      <View>
        <Text>Group Name</Text>
        <TextInput value={groupname} onChangeText={setGroupname}
          placeholder="Enter a name"
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}></TextInput>
        <Text>Type of expenses</Text>
        <RadioButton data={expenseTypes} onSelect={(value) => setExpenseType(value)}></RadioButton>
        <Text>Group Budget ( approx )</Text>
        <TextInput value={budgetAmount.toString()} onChangeText={setBudgetAmount}
          placeholder="Enter an amount"
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}></TextInput>
        <Text>Description</Text>
        <TextInput value={groupDescription} onChangeText={setGroupDescription}
          placeholder="Enter your text"
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}></TextInput>
      </View>
      <View>
        {/* Bottom navigation */}
        <Button title="Create Group" onPress={createGroup} />
      </View>
    </View>
  );
}

export default HomeScreen;
