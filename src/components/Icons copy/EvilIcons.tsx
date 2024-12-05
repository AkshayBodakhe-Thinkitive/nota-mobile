import { IconProps } from '../../interfaces/IconProps';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

export const EvilIcons = ({name, size, color, style}: IconProps) => {
  return <EvilIcon name={name} size={size} color={color} style={style} />;
};

