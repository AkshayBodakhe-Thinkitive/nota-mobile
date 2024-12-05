import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather'; // Make sure you have vector-icons installed
import Button from '../components/ButtonComponent/ButtonComponent';

const NoInternetScreen = ({onRetry}: any) => {

  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={50} color="gray" />
      <Text style={styles.message}>Please check your internet connection</Text>
      <Button outlined title="Try Again" onPress={onRetry} />
    </View>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginVertical: 20,
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
