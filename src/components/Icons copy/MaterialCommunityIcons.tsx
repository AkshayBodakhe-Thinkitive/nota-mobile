import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { IconProps } from '../../interfaces/IconProps';

const MaterialCommunityIcons = ({name, size, color, style}: IconProps) => {
  return (
    <MaterialCommunityIcon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default MaterialCommunityIcons;
