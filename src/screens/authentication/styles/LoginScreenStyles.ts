import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors } from "../../../Constants1/Colors";


export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    image1: {
        flex: 1,
        justifyContent: 'center',
    },
    image2: {
        top: '29%',
        right: '3%',
        width: responsiveWidth(43),
        height: responsiveHeight(27),
    },
    imageBgContainer: {
        height: responsiveHeight(38),
    },
    greetContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    greetTxtContainer: {
        width: '60%'
    },
    welcomeTxt: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        top: 70,
        textAlign: 'center',
    },
    signInFormContainer: {
        marginHorizontal: '7%',
        marginTop: '2%',
        // flex:1,
        zIndex: -1
    },
    signInTxt: {
        color: colors.black,
        alignSelf: 'center',
        marginVertical: 15,
        fontSize: 20,
        fontWeight: '700'
    },
    forgotPassRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: responsiveHeight(3),
        justifyContent: 'space-between',
        marginBottom: 15
    },
    remMeTxt: {
        color: colors.black,
        marginHorizontal: 8,
        fontWeight: '500'
    },
    forgPassTxt: {
        color: colors.navala_grey
    },
  
})