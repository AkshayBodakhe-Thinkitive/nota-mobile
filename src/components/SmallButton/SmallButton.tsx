import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
// import {colors} from '../../constants/Colors';
// import {FontType} from '../../constants/FontType';
import { colors } from '../../assets/colors';
import { fontType } from '../../assets/fontType';
 
interface SmallButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  outlined?: boolean;
  disabled?: boolean
}

const SmallButton: React.FC<SmallButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  outlined,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        containerStyle,
        outlined && {backgroundColor: 'transparent'},
        {
            backgroundColor: disabled ? colors.grey : outlined ? 'transparent' : colors.primary
        }
      ]}
      onPress={onPress}>
      <Text
        style={[styles.text, outlined && {color: colors.primary},textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  text: {
    color: colors.white,
    // fontFamily: fontType.Roboto_Medium,
    
  },
});

export default SmallButton;
