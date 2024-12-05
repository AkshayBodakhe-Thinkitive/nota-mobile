import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { IconProps } from '../../interfaces/IconProps';

export const FontAwesome = ({name, size, color, style}: IconProps) => {
  return <FontAwesomeIcon name={name} size={size} color={color} style={style} />;
};
