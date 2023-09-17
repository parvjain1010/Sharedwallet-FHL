import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { ApiService } from '../api/api';
import RadioButton from './atoms/RadioButton';

function AddParticipantsScreen({ navigation }) {

  const [ group, setGroup ] = useState(null);
  const [ selectedMembers, setSelectedMembers ] = useState([]);
  const [ allUsers, setAllUsers ] = useState([]);

  useEffect(async () => {
    const all_users = await ApiService.getAllUsers();
    setAllUsers(all_users);
  }, [ navigation ]);

  const addSelected = async () => { 
    console.log(selectedMembers.toString());
  };

  const handleCheckboxToggle = (user_id) => {
    if(selectedMembers.includes(user_id)) {
      const newIndices = selectedIndices.filter(i => i !== index);
      setSelectedIndices(newIndices);
    }
    else {
      const newIndices = [...selectedMembers, user_id];
      setSelectedMembers(newIndices);
    }
  };

    const renderItem = ({item}) => (
      <View>
        <CheckBox value={selectedMembers.includes(item.id)}
          onValueChange={() => handleCheckboxToggle(item.id)}/>
        <Text>{item.name}</Text>
      </View>
    );

  return (
    <View>
      <View>
        <Text>Add Participants</Text>
        <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      </View>
      <View>
        <Text>Select Members</Text>
        <SafeAreaView>
          <FlatList data={allUsers} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </SafeAreaView>
      </View>
      <View>
        {/* Bottom navigation */}
        <Button title="Add Selected" onPress={addSelected} />
      </View>
    </View>
  );
}

export default AddParticipantsScreen;
