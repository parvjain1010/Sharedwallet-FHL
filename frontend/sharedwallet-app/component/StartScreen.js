import React from 'react';
import { Layout, Text, Input, Button, withStyles } from '@ui-kitten/components';

const StartScreenCore = ({ eva, navigation, ...props }) => {
  return (
    <Layout style={eva.style.container}>
      <Text category="h1" style={eva.style.title}>Welcome to hisaab</Text>
      <Button style={eva.style.button} onPress={() => navigation.navigate('Login')}>
        LOGIN
      </Button>
      <Button style={eva.style.button} onPress={() => navigation.navigate('Register')}>
        REGISTER
      </Button>
    </Layout>
  );
};

const StartScreen = withStyles(StartScreenCore, (theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme[ 'background-basic-color-1' ],
  },
  title: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
    width: '100%',
  },
}));

export default StartScreen;
