import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
// import { colors } from "../../constants/Colors";
import { colors } from "../../assets/colors";


export const ButtonComponentStyles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: colors.primary,
        alignItems:'center',
        justifyContent :'center'
    },
    btnText : {
        color : colors.white,
        fontSize : responsiveFontSize(1.7),
        marginHorizontal : responsiveWidth(1),
        fontWeight : '600'
    },
    outlinedButton: {
        backgroundColor: 'white', 
        borderColor : colors.primary,
        borderWidth : 1,
    }
})