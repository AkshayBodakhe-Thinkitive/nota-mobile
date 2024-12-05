import { Platform, StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { colors } from "../../../Constants1/Colors";

export const AppointmentScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      bellBg: {
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(7),
        width: responsiveWidth(12),
      },
      textInput: {
        marginTop: Platform.OS === 'android' ? -responsiveHeight(1) : 0,
      },
})