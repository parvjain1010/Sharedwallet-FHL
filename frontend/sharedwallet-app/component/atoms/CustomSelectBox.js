// CustomSelectBox.js
import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, FlatList } from 'react-native';

const CustomSelectBox = ({ items, onItemSelected }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("Select a user")

  const renderSelectItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setVisible(false);
      setUser(item.user_id);
      onItemSelected(item);
    }}>
      <View style={{ padding: 20 }}>
        <Text>{item.user_id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ margin: 20 }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{ height: 50, borderWidth: 1, borderColor: 'gray', justifyContent: 'center', paddingHorizontal: 10 }}>
          <Text>{user}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => setVisible(false)}>
          <View style={{ marginHorizontal: 20, maxHeight: 300, backgroundColor: 'white', borderRadius: 10 }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.user_id}
              renderItem={renderSelectItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomSelectBox;
