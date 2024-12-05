import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioButton from './RadioButton'; // Adjust the import path as needed

const RadioGroup = ({ radioButtons, onPress, selectedId, containerStyle, labelStyle }:any) => {
  const [selected, setSelected] = useState(selectedId);

  useEffect(() => {
    setSelected(selectedId);
  }, [selectedId]);

  const handlePress = (value:any) => {
    setSelected(value);
    onPress(value);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {radioButtons.map((button:any) => (
        <RadioButton
          key={button.value}
          label={button.label}
          value={button.value}
          selected={button.value === selected}
          onPress={handlePress}
          labelStyle={labelStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default RadioGroup;
