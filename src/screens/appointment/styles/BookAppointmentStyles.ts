import { Platform, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { colors } from "../../../constants/Colors";
import { colors } from "../../../assets/colors";
// import { FontType } from "../../../constants/FontType";
import { fontType } from "../../../assets/fontType";

export const BookAppointmentStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop:Platform.OS === 'ios' ? responsiveHeight(2.5) : 0
    },
    pageContainer: {
      flex: 1,
    },
    doctorContainer: {
      marginTop:-responsiveHeight(3),
      // borderWidth: 1,
      height: responsiveHeight(21),
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingBottom:5
    },
    ellipseImgBg: {
      height: '83%',
      resizeMode: 'cover',
      width: '35%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1%',
      // borderWidth:1,
    },
    doctorImg: {
      resizeMode: 'cover',
      height: '100%',
      width: '100%',
      borderWidth:1,
      borderColor:colors.primary,
      borderRadius: responsiveHeight(10),
    },
    drName: {
      color: colors.black,
      fontFamily: fontType.Roboto_Medium,
      fontSize: responsiveFontSize(2),
      marginVertical: '2%',
    },
    drTitle: {
      color: '#1A1A1A66',
      margin:10,
      fontFamily: fontType.Roboto_Medium,
      alignSelf:'center'
    },
    drDetailsContainer: {
      flex: 1,
      marginTop: '0.5%',
      paddingTop: 5,
    },
    drBioDesc: {
      color: '#1A1A1A66',
      fontFamily: fontType.Roboto_Regular,
      marginVertical: '2%',
    },
    slotTimeCard: {
      marginRight: responsiveWidth(4),
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveHeight(3),
      width: responsiveWidth(20),
      borderRadius: 6,
    },
    timeText: {
      fontFamily: fontType.Roboto_Regular,
      color: '#1A1A1A66',
      fontSize: responsiveFontSize(2),
    },
    error: {
      color: 'red',
      marginBottom: 5,
      marginLeft:5,
      marginTop:-5
    },
  });
  