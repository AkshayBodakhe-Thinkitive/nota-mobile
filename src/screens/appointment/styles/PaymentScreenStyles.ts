import { StyleSheet } from "react-native";
// import { colors } from "../../../constants/Colors";
import { colors } from "../../../assets/colors";

export const PaymentScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    buttonsContainer : {
      position : 'absolute',
      bottom : '2%',
      width : '100%',
      justifyContent : 'space-between',
      paddingHorizontal : '3%'
    },
    buttonStyles : {
      width : '48%'
    }
  });
  