import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Demographics from '../screens/medical-records/screens/DemographicScreen';
import MedicalRecordsMenu from '../screens/medical-records/components/medicalrecordoptions/MedicalRecordsMenu';

const MedicalRecordStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="medicalrecord" component={MedicalRecordsMenu} />
      <Stack.Screen name="demographics" component={Demographics} />
    </Stack.Navigator>
  );
};

export default MedicalRecordStack;

const styles = StyleSheet.create({});
