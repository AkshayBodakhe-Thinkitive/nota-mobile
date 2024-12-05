import {StyleSheet} from 'react-native';
import {fontType} from '../../../../assets/fontType';

export const TextInputStyles = StyleSheet.create({
  contentStyles: {
    fontFamily: fontType.outfit400,
    fontSize: 14,
  },
  textInputStyles: {
    backgroundColor: 'white',
  },
  outlineStyle: {
    borderWidth: 1,
    borderRadius: 10,
  },
});
