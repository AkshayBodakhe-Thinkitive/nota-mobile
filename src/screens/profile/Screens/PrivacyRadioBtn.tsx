import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';
import { Ionicons } from '../../../components/Icons/Ionicons';

const PrivacyRadioButton = ({
  label,
  selected,
  value,
  onSelect,
  disabled,
}: RadioButtonProps) => {
  const handleSelected = () => {
    onSelect && onSelect(value);
  };

  return (
    <TouchableOpacity
      onPress={handleSelected}
      style={styles.radioButton}
      disabled={disabled}>
      <Ionicons
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={selected ? colors.primary : colors.grey70}
      />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrivacyRadioButton;

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
  value?: any;
  label?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}
