import React from 'react';
import { View, Text, Button } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to the Profile Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to AllUsers"
        onPress={() => navigation.navigate('AllUsers')}
      />
    </View>
  );
}

export default ProfileScreen;
