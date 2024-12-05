import { TextStyle } from 'react-native';
import { colors } from './colors';
import { fontSize } from './fontSizes';
import { fontType } from './fontType';

interface IFontStyle {
  smallRoboto: TextStyle;
  mediumRoboto: TextStyle;
  largeRoboto: TextStyle;
  headingRoboto: TextStyle;
}

export const fontStyle: IFontStyle = {
  smallRoboto: {
    fontSize: fontSize.separatorText,
    fontFamily: fontType.Roboto,
    color: colors.white,
  },
  mediumRoboto: {
    fontSize: fontSize.normalLabel,
    fontFamily: fontType.Roboto,
    color: colors.white,
  },
  largeRoboto: {
    fontSize: fontSize.textInputValue,
    fontFamily: fontType.Roboto,
    color: colors.white,
  },
  headingRoboto: {
    fontSize: fontSize.headingLabel,
    fontFamily: fontType.Roboto,
    color: colors.white,
  },
};
