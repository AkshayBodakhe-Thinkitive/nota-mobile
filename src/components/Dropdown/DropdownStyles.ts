import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { colors } from "../../assets/colors";
import { fontType } from "../../assets/fontType";



export const DropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor:colors.white,
    borderRadius: 6,
    paddingHorizontal: 8,
    height: responsiveHeight(4.5),
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(1.7),
    color: colors.navala_grey 
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fontType.Roboto_Regular,
    color: colors.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
  },
  labelStyles: {
    fontFamily: fontType.Roboto_Regular,
    color: colors.grey70,
    marginBottom: 10,
    fontSize: responsiveFontSize(1.7),
  },
  itemTextStyle: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fontType.Roboto_Regular,
    color: colors.black
  },
  errorText: {
    color: colors.error70,
    fontFamily: fontType.Roboto_Regular,
    fontSize: responsiveFontSize(1.3),
    position: 'absolute',
    bottom: -16,
  }
})