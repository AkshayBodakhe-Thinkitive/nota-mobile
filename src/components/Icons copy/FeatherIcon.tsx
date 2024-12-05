import FeatherIcons from 'react-native-vector-icons/Feather';
import { IconProps } from '../../interfaces/IconProps';

export const FeatherIcon = ({name, size, color, style}: IconProps) => {
  return <FeatherIcons name={name} size={size} color={color} style={style} />;
};
