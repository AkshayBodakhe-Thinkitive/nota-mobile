import { StyleSheet } from 'react-native';
// import { colors } from "../../../constants/Colors";
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';
import { fontType } from '../../../assets/fontType';
// import { FontType } from "../../../constants/FontType";

export const SignInScreenScStyles = StyleSheet.create({
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
    flexDirection: 'row',
  },
  greetTxtContainer: {
    width: '60%',
  },
  welcomeTxt: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    top: 70,
    textAlign: 'center',
    fontFamily: fontType.Roboto
  },
  NAVALATxt: {
    color: 'white',
    fontSize: 20,
    top: 70,
    textAlign: 'center',
    fontFamily: fontType.Roboto
  },
  signInFormContainer: {
    marginHorizontal: '7%',
    // marginTop: '1%',
    // flex:1,
    zIndex: -1,
  },
  signInTxt: {
    color: colors.black,
    alignSelf: 'center',
    marginVertical: 15,
    fontSize: 20,
    fontWeight: '700',
  },
  forgotPassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(3),
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  remMeTxt: {
    color: colors.black,
    marginHorizontal: 8,
    fontWeight: '500',
  },
  forgPassTxt: {
    color: colors.navala_grey,
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft:5,
    marginTop:-5,
    fontSize: 15,
    fontFamily: fontType.Roboto_Regular
  },

});
