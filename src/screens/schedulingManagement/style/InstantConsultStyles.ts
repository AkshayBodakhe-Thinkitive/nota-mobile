import { StyleSheet } from "react-native";
// import { colors } from "../../../constants/Colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from "../../../assets/colors";
// import { FontType } from "../../../constants/FontType";
import { fontType } from "../../../assets/fontType";


export const InstantConsultStyles = StyleSheet.create({
   container : {
    flex : 1,
    width:'100%',
    backgroundColor : colors.white,
    paddingBottom:20,
   },
   headText : {
      fontFamily : fontType.Roboto_Medium,
      fontSize : responsiveFontSize(2),
      color: 'black',
      top: 15,
   },
   textInputStyles : {
     marginTop : '6%'
   },
   specilistOuterView: {
      height: '40%',
      width: '95%',
      alignSelf: 'center',
      paddingVertical: 20,
      // paddingBottom:60,
      // backgroundColor: 'blue'
    },
    healthOuterView: {
      height: '42%',
      width: '95%',
      alignSelf: 'center',
      paddingVertical: 20,
      paddingBottom:60,
      // backgroundColor: 'blue'
    },
    specilistImg: {
      height: '70%',
      width: '100%',
    },
    specilistView: {
      height: 200,
      width: '50%',
    },
   pageContainer : {
      flex : 0.97,
      // borderWidth : 1,
      marginTop : '7%'
   },
   providerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '92%',
      alignSelf: 'center',
      height: '5%',
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
   
})