import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../api/api';
import { Layout, Text, Input, Button, List, Card, withStyles } from '@ui-kitten/components';
// import RadioButtonGroup from './atoms/RadioButton';
import { Radio, RadioGroup } from '@ui-kitten/components';

function AddGroupScreenCore({ eva, navigation, ...props }) {

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
    <Layout style={eva.style.container}>
      <Text category="h3" style={eva.style.title}>Add Group</Text>

      <Input style={eva.style.input} value={groupname}
        onChangeText={setGroupname} placeholder="Group Name" />
      <Input style={eva.style.input} value={groupname}
        onChangeText={setGroupname} placeholder="Group Name" />
      <Input style={eva.style.input} value={budgetAmount.toString()}
        onChangeText={setBudgetAmount} placeholder="Budget Amount" />
      <Input style={eva.style.input} value={groupDescription}
        onChangeText={setGroupDescription} placeholder="Desription" />
<Layout
      style={eva.style.containerrow}
      level='1'
    >

      <RadioGroup>
        <Radio>One Time</Radio>
        <Radio>Recurring</Radio>
      </RadioGroup>
    </Layout>
      <Button style={eva.style.button} onPress={createGroup}>Create Group</Button>
      {/* <RadioButtonGroup data={expenseTypes} onSelect={(value) => setExpenseType(value)}></RadioButtonGroup> */}
    </Layout>
  );
}

const AddGroupScreen = withStyles(AddGroupScreenCore, (theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  containerrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 2,
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
  input: {
    marginVertical: 8,
    width: '100%',
  },
  button: {
    marginVertical: 16,
    width: '100%',
  },
  text: {
    marginVertical: 4, // Adjust as needed
  },
}));


export default AddGroupScreen;
