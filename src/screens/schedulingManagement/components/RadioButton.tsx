import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, value, selected, onPress, labelStyle }:any) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
        {selected && <View style={styles.selectedDot} />}
      </View>
      <Text style={[styles.radioLabel, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#3498db',
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default RadioButton;
