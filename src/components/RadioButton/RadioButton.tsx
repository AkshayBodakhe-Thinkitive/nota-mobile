import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Ionicons} from '../Icons/Ionicons';
import {colors} from '../../Constants1/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const RadioButton = ({
  label,
  selected,
  onSelect,
  disabled,
}: RadioButtonProps) => {
  const [checked, setChecked] = useState(false);

  const handleSelected = () => {
    onSelect && onSelect(!checked);
    setChecked(!checked);
  };

  return (
    <TouchableOpacity
      onPress={handleSelected}
      style={styles.radioButton}
      disabled={disabled}>
      <Ionicons
        name={checked ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={checked ? colors.primary : colors.grey70}
      />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioLabel: {
    fontSize: responsiveFontSize(1.4),
    marginLeft: 5,
    color: colors.grey70,
  },
});

interface RadioButtonProps {
  label?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}
