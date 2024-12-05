import React, { FC } from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';
// import { colors } from '../../constants/Colors';
import { colors } from '../../assets/colors';
// import { FontType } from '../../constants/FontType';
import { fontType } from '../../assets/fontType';

const CustomText: FC<CustomTextProps> = ({
  fontSize = 20,//responsiveFontSize(1.5),
  color = colors.black,
  fontFamily = fontType.Roboto_Regular,
  style,
  ...rest
}) => {
  const textStyles: TextStyle = StyleSheet.flatten([
    {fontSize, color, fontFamily},
    style,
  ]);
// console.log(rest)
  return <RNText {...rest} style={textStyles} />;
};

export default CustomText;

interface CustomTextProps extends TextProps {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}
