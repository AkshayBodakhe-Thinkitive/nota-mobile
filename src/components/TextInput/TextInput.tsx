import React, { ReactNode, forwardRef, useState } from 'react';
import {
  KeyboardType,
  NativeSyntheticEvent,
  TextInput as RnTextInput,
  StyleProp,
  Text,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputStyles as styles } from './TextInputStyles';
// import {colors} from '../../constants/Colors';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../../assets/colors';

const TextInput = forwardRef(
  
  ({
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
  rightIcon,
  leftIcon,
  style,
  value,
  editable,
  keyboardType,
  isValid,
  errorText,
  maxLength,
  onBlur,
  selectTextOnFocus,
  onTouchStart,
  onEndEditing,
  autoCapitalize,
  required,
  containerStyles
}: TextInputProps,
ref: any,
) => {
  const [showPass, setShowPass] = useState(true);
  const [text, setText] = useState('');

  const onChangeTxt = (val: string) => {
    onChangeText && onChangeText(val);
    setText(val);
  };
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.labelStyles}>{label} {required && (<Text style={{color:'red'}}>*</Text>)}</Text>}
      <View
        style={[
          styles.inputContainer,
          containerStyles,
          isValid && {
            borderColor: colors.error70,
            borderWidth: 0.5,
            marginBottom: 0,
          },
        ]}>
        <RnTextInput
         ref={ref}
          cursorColor={'grey'}
          style={[styles.inputBox, leftIcon ? {marginLeft: responsiveWidth(8)} : null]}
          editable={editable}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.navala_grey}
          onChangeText={onChangeTxt}
          secureTextEntry={secureTextEntry ? showPass : false}
          keyboardType={keyboardType}
          onBlur={onBlur}
          selectTextOnFocus={selectTextOnFocus}
          maxLength={maxLength}
          onTouchStart={onTouchStart}
          onEndEditing={onEndEditing}
          autoCapitalize={autoCapitalize}
        />
        <View style={{position: 'absolute', right: 7}}>
          {rightIcon && rightIcon}
        </View>
        <View style={{position: 'absolute', left: 7}}>
          {leftIcon && leftIcon}
        </View>
      </View>
      {isValid && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
      {/* {secureTextEntry === true && text.length > 0 && ( */}
      {secureTextEntry === true && (
        <TouchableOpacity
          onPress={() => {
            setShowPass(!showPass);
          }}
          style={[styles.eye,label ? {top:'40%'} : null]}>
          <Icon
            name={showPass ? 'eye-off' : 'eye'}
            color={"#1A1A1A33"}
            size={24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
})

export default TextInput;

export interface TextInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  keyboardType?: KeyboardType;
  isValid?: boolean | any;
  errorText?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  selectTextOnFocus?: boolean | any;
  maxLength?: number
  onTouchStart?: () => void
  onEndEditing?: () => void
  autoCapitalize?: any
  required?: boolean,
  containerStyles? : StyleProp<ViewStyle>
}
