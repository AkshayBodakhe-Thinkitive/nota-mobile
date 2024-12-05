
import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { colors } from "../../../constants/Colors";
import { colors } from "../../../assets/colors";

const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(5)
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

export const MemberScreenStyle = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor :  colors.white
  },
  imgBg : {
    width: '110%',
    height: '100%',
    left: -20,
    position: 'absolute',
  },
  safeArea : {height: '100%', width: '90%', alignSelf: 'center'},
  bellBg : {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(12),
  },
  providerImageContainer: {
    width: responsiveHeight(12),
    borderRadius: 8,
    marginHorizontal: 5,
    alignSelf:'center'
},
})
