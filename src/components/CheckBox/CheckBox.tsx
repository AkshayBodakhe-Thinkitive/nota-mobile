import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { CheckBoxstyles } from './CheckBoxStyles';
// import { colors } from '../../constants/Colors';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from '../../assets/colors';


const Checkbox = ({ onValueChange }:CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
    onValueChange && onValueChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={CheckBoxstyles.checkContainer}>
         <FontAwesomeIcon
          name={checked ? 'check-square' : 'square-o'}
          size={responsiveFontSize(2.5)}
          color={checked ? colors.primary : colors.grey60}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

interface CheckboxProps {
  onValueChange?: (checked: boolean) => void;
}
