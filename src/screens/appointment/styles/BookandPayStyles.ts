import { Platform, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import { colors } from "../../../constants/Colors";
// import { FontType } from "../../../constants/FontType";
import { colors } from "../../../assets/colors";
import { fontType } from "../../../assets/fontType";


export const BookandPayStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      pageContainer: {
        flex: 1,
        padding: '3%',
        flexDirection: 'column',
      },
      card1: {
        width: null,
        height: responsiveHeight(28),
        marginBottom: '2%',
      },
      card1Row: {
        borderBottomWidth: 1,
        height: '35%',
        borderColor: '#00000029',
      },
      drImage: {
        height: responsiveHeight(8),
        width: responsiveWidth(18),
        alignSelf: 'flex-start',
        marginRight: '2%',
        margin: '2%',
      },
      drName: {
        color: colors.black,
        fontFamily: fontType.Roboto_Medium,
        fontSize: responsiveFontSize(2),
        marginVertical: '2%',
      },
      drTitle: {
        color: '#1A1A1A66',
        fontFamily: fontType.Roboto_Medium,
        marginVertical: '3%',
      },
    
      card2: {
        width: null,
        height: Platform.OS === 'android' ?  responsiveHeight(22) : responsiveHeight(20),
      },
      billDetails: {
        color: colors.black,
        fontFamily: fontType.Roboto_Medium,
        fontSize: responsiveFontSize(2),
        paddingHorizontal: '4%',
        paddingTop: '4%',
      },
      totalPayableRow: {
        borderTopWidth: 1,
        justifyContent: 'space-between',
        borderColor: '#00000029',
      },
      buttonContainer: {
        padding: '3%',
        position: 'absolute',
        bottom: '1%',
        width: '100%',
      },
      card1labelStyles: {
        width: '40%',
        marginVertical: '1%',
        fontSize: responsiveFontSize(1.8),
      },
      card2labelStyles: {
        width: '90%',
        marginVertical: '1%',
        fontSize: responsiveFontSize(1.8),
      },
      valueStyle: {
        fontSize: responsiveFontSize(1.8),
      },
})