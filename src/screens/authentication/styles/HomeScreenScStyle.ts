import {Platform, StatusBar, StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const homeScStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    height: responsiveHeight(7.5),
    flexDirection: 'row',
    padding: '1%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
    elevation: 5,
    justifyContent: 'space-between',
  },
  photoContainer: {},
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#0097F0',
    borderWidth: 1,
  },
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    width: responsiveWidth(12),
    right: '35%',
  },
  screenName: {
    color: colors.navala_grey,
    fontSize: responsiveFontSize(1.7),
    marginLeft: 20,
    textAlign: 'center',
  },
  locationName: {
    color: colors.new_black,
    fontSize: responsiveFontSize(1.5),
    marginLeft: 20,
    top: 5,
    textAlign: 'center',
    fontFamily: fontType.Roboto_Medium,
  },
  titleText: {
    top: 20,
    left: 20,
    fontWeight: 'bold',
    fontFamily: fontType.Roboto_Medium,
    color: colors.app_color1,
    fontSize: 24,
  },
  welcomeText: {
    top: 35,
    fontWeight: '600',
    left: 20,
    // fontFamily: fontType.Roboto_Medium,
    color: '#1A1A1A',
    fontSize: 18,
  },
  findProviderText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: fontType.Roboto_Medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  container2: {
    backgroundColor: '#f1f1f1',
  },
  input: {
    // height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // padding: 10,
    margin: 15,
    width: '95%',
    alignSelf: 'center',
  },
  imageBackgroundView: {
    width: '95%',
    height: Platform.OS === 'ios' ? responsiveHeight(22) : responsiveHeight(24),
    alignSelf: 'center',
    // borderWidth:1
  },
  txt3: {
    top: 50,
    left: 20,
    color: '#1A1A1A',
    fontFamily: fontType.Roboto_Regular,
    fontSize: 16,
  },
  image2: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  btn1: {
    height: '19%',
    width: '32%',
    top: '35%',
    left: 20,
    backgroundColor: colors.app_color1,
},
  providerButtonStyle: {
    width: '40%',
    height: 40,
    backgroundColor: colors.app_color1,
    borderRadius: 10,
    top: 80,
    left: 20,
    alignContent: 'space-around',
  },
  cardViewStyle: {
    height: responsiveHeight(35),
    width: '100%',
    paddingVertical: 10,
  },
  cardstyle: {
    height: 125,
    width: '33%',
  },
  imageStyle: {
    // flex: 1
    height: '100%',
    width: '100%',
  },
  providerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    alignSelf: 'center',
    height: responsiveHeight(4),
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },
  providerImgStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  bookAppointmentView: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '92%',
    alignSelf: 'center',
  },
  specilistOuterView: {
    // height: responsiveHeight(30), //'45%',
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 20,
    // backgroundColor: 'blue'
  },
  specilistView: {
    height: responsiveHeight(25),
    width: '49%',
  },
  specilistImg: {
    height: '70%',
    width: '97%',
  },
  bookAgainBtn: {
    backgroundColor: colors.app_color1,
    height: 30,
    width: '40%',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchProvInputContainer: {
    marginHorizontal: 11,
},
});
export default homeScStyles;
