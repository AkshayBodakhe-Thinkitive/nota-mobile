import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from '../../interfaces/IconProps';

export const MaterialIcons = ({name, size, color, style}: IconProps) => {
  return <MaterialIcon name={name} size={size} color={color} style={style} />;
};
