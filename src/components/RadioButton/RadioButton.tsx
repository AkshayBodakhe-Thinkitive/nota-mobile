import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Ionicons} from '../Icons/Ionicons';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { colors } from '../../assets/colors';

const RadioButton = ({
  label,
  selected,
  value,
  onSelect,
  disabled,
}: RadioButtonProps) => {
  const [checked, setChecked] = useState<any>(false);
  
  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleSelected = () => {
    onSelect && onSelect(value);
    // setChecked(!checked); // this is causing deselect 
    setChecked(true);
  };

  return (
    <TouchableOpacity
      onPress={handleSelected}
      style={styles.radioButton}
      disabled={disabled}>
      <Ionicons
        name={checked ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={checked ? colors.primary : colors.grey90}
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
    marginRight : 5
  },
  radioLabel: {
    // fontFamily : FontType.Roboto_Regular,
    fontSize: responsiveFontSize(1.8),
    marginLeft: 5,
    color: colors.grey90
  },
});

interface RadioButtonProps {
  value?:any,
  label?: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
}
