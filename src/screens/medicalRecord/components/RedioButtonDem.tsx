import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '../Icons/Ionicons';
import { Ionicons } from '../../../components/Icons/Ionicons';
// import {colors} from '../../constants/Colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';

const RadioButton = ({
  label,
  selected,
  value,
  onSelect,
  disabled,
}: RadioButtonProps) => {
  const [checked, setChecked] = useState<any>(false);

  // const handleSelected = () => {
  //   onSelect && onSelect(!checked);
  //   setChecked(!checked);
  // };

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleSelected = () => {
    onSelect && onSelect(value);
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
  value?:any,
  label?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}