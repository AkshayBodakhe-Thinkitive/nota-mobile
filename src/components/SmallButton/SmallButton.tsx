import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
// import {colors} from '../../constants/Colors';
// import {FontType} from '../../constants/FontType';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';

interface SmallButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  outlined,
  disabled = false,
  loading
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        containerStyle,
        outlined && {backgroundColor: 'transparent'},
        {
          backgroundColor: disabled
            ? colors.grey
            : outlined
            ? 'transparent'
            : colors.primary,
        },
        disabled && {borderColor: colors.grey},
      ]}
      onPress={onPress}>
     {loading ? 
      <ActivityIndicator size="small" color={colors.white} />
     : <Text
        style={[styles.text, outlined && {color: colors.primary}, textStyle]}>
        {title}
      </Text>}
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
