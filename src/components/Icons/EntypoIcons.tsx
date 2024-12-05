import EntypoIcon from 'react-native-vector-icons/Entypo';
import {StyleSheet} from 'react-native';
import React from 'react';
import { IconProps } from '../../interfaces/IconProps';

export const EntypoIcons = ({name, size, color, style}: IconProps) => {
  return <EntypoIcon name={name} size={size} color={color} style={style} />;
};


