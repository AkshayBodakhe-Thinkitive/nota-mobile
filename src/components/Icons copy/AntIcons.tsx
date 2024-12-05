import AntIcon from 'react-native-vector-icons/AntDesign';
import { IconProps } from '../../interfaces/IconProps';

export const AntIcons = ({name, size, color, style}: IconProps) => {
  return <AntIcon name={name} size={size} color={color} style={style} />;
};

