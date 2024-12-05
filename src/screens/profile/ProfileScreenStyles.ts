import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { colors } from "../../../constants/Colors";
import { colors } from "../../assets/colors";

const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(12);
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

export const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pencilBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    width: responsiveWidth(12),
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: componentWidth,
    height: componentWidth,
    borderRadius: borderRadiusPixel,
    marginHorizontal: 10,
  },
  patDetailsContainer: {
    zIndex: -1,
    height: responsiveHeight(13),
    alignItems: 'center',
    paddingTop: responsiveHeight(7),
  },
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(12),
  },
});
