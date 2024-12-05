import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from "../../../Constants1/Colors";


export const BookingConfirmedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    pageContainer: {
      flex: 1,
      padding: '3%',
      flexDirection: 'column',
    },
    buttonContainer: {
      padding: '3%',
      position: 'absolute',
      bottom: '1%',
      width: '100%',
    },
    textStyle: {
      color: '#FF2300CC',
      fontSize: responsiveFontSize(2),
      textAlign: 'center',
      paddingHorizontal: '12%',
      marginTop: '2%',
    },
    textBtn: {
      alignSelf: 'center',
      marginTop: '2%',
    },
  });