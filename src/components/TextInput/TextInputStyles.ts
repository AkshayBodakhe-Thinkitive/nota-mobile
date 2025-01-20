import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { colors } from "../../assets/colors";
import { fontType } from "../../assets/fontType";


export const TextInputStyles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
    },
    inputContainer: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: colors.grey40,
        backgroundColor:colors.white,
        height: responsiveHeight(5.5),
        borderRadius: 6,
        paddingHorizontal: 7,
        shadowColor:'#00000099',
        shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.4,
          elevation: 5,

    },
    labelStyles: {
        color: colors.grey70,
        marginBottom: 10,
        fontSize: responsiveFontSize(1.7)
    },
    inputBox: {
        fontFamily:fontType.Roboto_Medium,
        color: colors.grey80,
        fontSize: responsiveFontSize(1.7),
        fontWeight:'500',
        width: '100%',
        height: '100%',
        marginHorizontal:5,
    },
    eye: {
        position: 'absolute',
        right:  responsiveFontSize(1),
        padding: responsiveFontSize(1),
        paddingLeft: 10,
        top :responsiveFontSize(0.3),
    },
    icon: {
        position: 'absolute',
        right: '5%',
        top: '45%',
        padding: 5,
        paddingLeft: 10,
    },
    errorText: {
        color: colors.error70,
        fontSize: responsiveFontSize(1.3),
        position: 'absolute',
        bottom: -16,
    }
});