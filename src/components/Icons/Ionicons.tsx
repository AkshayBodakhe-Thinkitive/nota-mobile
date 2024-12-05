import Ionicon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { IconProps } from '../../interfaces/IconProps';


export const Ionicons = ({name, size, color, style}: IconProps) => {
  return <Ionicon name={name} size={size} color={color} style={style} />;
};

