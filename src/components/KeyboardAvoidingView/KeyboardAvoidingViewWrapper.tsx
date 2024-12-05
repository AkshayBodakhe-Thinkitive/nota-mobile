import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const KeyboardAvoidingViewWrapper = ({children}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewWrapper;

const styles = StyleSheet.create({});
