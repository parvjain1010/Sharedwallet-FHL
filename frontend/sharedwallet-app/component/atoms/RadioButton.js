import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function RadioButton({ data, onSelect }) {
  const [ userOption, setUserOption ] = useState("One Time");


  const styles = StyleSheet.create({
    option: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    unselected: {
      backgroundColor: 'red',
      margin: 5,
    },
    selected: {
      backgroundColor: 'blue',
      margin: 6,
      padding: 10,
      borderRadius: 10,
    },
  });

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Pressable key={index} onPress={() => setUserOption(item.value)}
            style={item.value === userOption ? styles.selected : styles.unselected}>
            <Text> {item.value}</Text>
          </Pressable>
        )
      })}
    </View>
  );
}