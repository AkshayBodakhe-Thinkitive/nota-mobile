import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownStyles as styles } from './DropdownStyles';
// import {colors} from '../../constants/Colors';
import { colors } from '../../assets/colors';

const DropdownComponent = ({
  style,
  label,
  data,
  search,
  maxHeight,
  placeholder,
  selectedValue,
  onValueChange,
  onKeyChange,
  onBlur,
  renderLeftIcon,
  disable,
  isValid,
  errorText,
  dropDownStyles,
  required,
}: DropdownComponentProps) => {
  const dropdowndata = [{label: '', value: ''}];

  const [value, setValue] = useState('');

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.labelStyles}>{label} {required && (<Text style={{color:'red'}}>*</Text>)}</Text>}
      <Dropdown
        style={[
          styles.dropdown,
          isValid && {borderColor: colors.error70, borderWidth: 0.5},
          dropDownStyles
        ]}
        renderItem={undefined}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data ? data : dropdowndata}
        search={search}
        maxHeight={maxHeight ? maxHeight : 300}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : ''}
        searchPlaceholder="Search..."
        value={selectedValue ? selectedValue : value}
        onBlur={() => {
          if (onBlur) {
            onBlur(value);
          }
        }}
        onChange={(item: any) => {
          setValue(item.value);

          onValueChange &&  onValueChange(item?.value, item?.id);
          if (onKeyChange) {
            onKeyChange(item?.label);
          }
        }}
        renderLeftIcon={renderLeftIcon}
        disable={disable}
      />
      {isValid && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default DropdownComponent;

interface DropdownComponentProps {
  style?: StyleProp<ViewStyle>;
  dropDownStyles?:StyleProp<ViewStyle>,
  label?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: any;
  iconStyle?: StyleProp<TextStyle>;
  data?: {label: string; value: string | number}[];
  search?: boolean;
  maxHeight?: number;
  labelField?: string;
  valueField?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string | null;
  onFocus?: () => void;
  onBlur?: (e: any) => void;
  // onChange?: (item: any) => void;
  renderLeftIcon?:
    | ((visible?: boolean | undefined) => JSX.Element | null | undefined)
    | undefined;
  selectedValue?: string;
  onValueChange?: any;
  onKeyChange?: any;
  disable?: boolean;
  isValid?: boolean;
  errorText?: string;
  required?:boolean
}
