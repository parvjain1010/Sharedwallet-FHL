import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to AllUsers"
        onPress={() => navigation.navigate('AllUsers')}
      />
    </View>
  );
}

export default HomeScreen;
