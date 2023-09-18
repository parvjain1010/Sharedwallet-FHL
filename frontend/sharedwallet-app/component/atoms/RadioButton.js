import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { RadioButton, RadioGroup, Text, withStyles } from '@ui-kitten/components';

const RadioButtonGroupCore = ({ eva, data, onSelect, ...prop }) => {
  const [ userOption, setUserOption ] = useState("One Time");
  const [ selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if(selectedIndex === 0){
      setUserOption("One Time");
    }
    else {
      setUserOption("Recurring");
    }
  }, [selectedIndex]);

  return (
    <RadioGroup 
      selectedIndex={selectedIndex}
      onChange={index => setSelectedIndex(index)}>
      {data.map((item, index) => {
        return (
          <RadioButton key={index}
            style={item.value === userOption ? eva.style.selected : eva.style.unselected}>
            <Text>{item.value}</Text>
          </RadioButton>
        )
      })}
    </RadioGroup>
  );
}

const RadioButtonGroup = withStyles(RadioButtonGroupCore, (theme) => ({
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
}));

export default RadioButtonGroup