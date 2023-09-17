import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const FigmaHomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>hisaab</Text>
        <Image
          source={require('./assets/vector374.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.balance}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.amount}>₹ 3,500</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.action}>
          <Image
            source={require('./assets/rectangle724.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Add money</Text>
        </View>
        <View style={styles.action}>
          <Image
            source={require('./assets/frame4.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Send money</Text>
        </View>
        <View style={styles.action}>
          <Image
            source={require('./assets/group7.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Groups</Text>
        </View>
      </View>
      <View style={styles.history}>
        <Text style={styles.label}>History</Text>
        <View style={styles.transaction}>
          <Image
            source={require('./assets/rectangle739.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Rajesh</Text>
          <Text style={[styles.amount, styles.green]}>₹ 800</Text>
        </View>
        <View style={styles.transaction}>
          <Image
            source={require('./assets/rectangle740.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Pooja</Text>
          <Text style={[styles.amount, styles.red]}>₹ 2,500</Text>
        </View>
        <View style={styles.transaction}>
          <Image
            source={require('./assets/rectangle741.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Karan</Text>
          <Text style={[styles.amount, styles.green]}>₹ 6,200</Text>
        </View>
      </View>
      <View style={styles.account}>
        <Image
          source={require('./assets/frame.png')}
          style={styles.profile}
        />
        <Text style={[styles.label, styles.white]}>Account</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  icon: {
    width: 24,
    height: 24,
  },
  balance: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  action: {
    alignItems: 'center',
    width: 96,
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    width: 48,
    height: 48,
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  history: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 16,
  },
  green: {
    color: '#00FF00',
  },
  red: {
    color: '#FF0000',
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    padding: 16,
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  white: {
    color: '#FFFFFF',
  },
});

export default FigmaHomeScreen;