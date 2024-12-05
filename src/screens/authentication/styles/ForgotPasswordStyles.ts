import { StyleSheet } from "react-native";
// import { colors } from "../../../constants/Colors";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors } from "../../../assets/colors";

export const ForgotPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    screenWrapper: {
        marginTop: '40%',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5)
    },
    weWillSend: {
        width: '50%',
        textAlign: 'center',
        color: colors.navala_grey,
        fontSize: responsiveFontSize(1.7),
        marginVertical: responsiveHeight(2)
    },
    textInput: {
        marginBottom: responsiveHeight(4),
        marginTop: responsiveHeight(3),
    },

    veryOtpBtn: {
        width: '100%',
        marginBottom: responsiveHeight(2.5),
        marginTop:responsiveHeight(2.5),
    },
    resendOTP: {
        color: colors.primary,
        textDecorationLine: 'underline',
        marginTop: responsiveHeight(2.5)
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginLeft:5,
        marginTop:5
      },
})