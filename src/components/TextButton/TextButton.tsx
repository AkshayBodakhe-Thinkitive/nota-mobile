import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
// import { colors } from '../../constants/Colors';
// import { FontType } from '../../constants/FontType';
import { colors } from '../../assets/colors';
import { fontType } from '../../assets/fontType';

interface TextButtonProps extends TouchableOpacityProps {
  text: string;
  textStyle?: TextStyle;
}

const TextButton: React.FC<TextButtonProps> = ({ onPress, text, textStyle, ...restProps }) => {
  return (
    <TouchableOpacity onPress={onPress} {...restProps}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
     fontSize : 16,
      color: colors.primary,
      fontFamily: fontType.Roboto_Regular,
      padding : 5
  },
});

export default TextButton;
