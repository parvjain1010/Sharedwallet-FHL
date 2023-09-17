// ExpenseSplitScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Modal, Text, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';

const ExpenseSplitScreen = ({ navigation, route }) => {
    const { members, selected } = route.params;
    
    const [ selectedMembers, setSelectedMembers] = useState(selected);

    useEffect(() => {
      async function FetchDetails() {

        console.log("expense split");
        console.log(members);
        console.log(selected);
        // setSelectedMembers(selected);
      }

      FetchDetails();
    }, [navigation, route.params?.selected]);

    const handleCheckboxToggle = (item) => {
      console.log("Am I here ?")
      if(selectedMembers.includes(item)) {
        const newMembers = selectedMembers.filter(i => i.user_id !== item.user_id);
        setSelectedMembers(newMembers);
      }
      else {
        const newMembers = [...selectedMembers, item];
        setSelectedMembers(newMembers);
      }
    };
    
    const renderItem = ({item}) => (
      <View>
        <Checkbox value={selectedMembers.includes(item)}
          onValueChange={() => handleCheckboxToggle(item)}/>
        <Text>{item.user_id}</Text>
      </View>
    );

  return (
    <View style={{ margin: 20 }}>
         <SafeAreaView>
          <FlatList data={members} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </SafeAreaView>
        <Button title="Done" onPress={() => navigation.navigate("AddExpense", { selected:selectedMembers})}/>
    </View>
  );
};

export default ExpenseSplitScreen;
