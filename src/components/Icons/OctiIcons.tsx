import OctiIcon from 'react-native-vector-icons/Octicons';
import { IconProps } from '../../interfaces/IconProps';

export const OctiIcons = ({name, size, color, style}: IconProps) => {
  return <OctiIcon name={name} size={size} color={color} style={style} />;
};
