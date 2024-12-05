import { StyleSheet } from 'react-native';
// import { colors } from "../../../constants/Coloxrs";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';

export const DemographicScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(15),
    marginBottom: responsiveHeight(3),
  },
  scrollView: {
    position: 'absolute',
    top: 120,
    height: '98%',
    width: '100%',
    paddingHorizontal: 15,
  },
});

export const AssessmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(18),
    marginBottom: responsiveHeight(3),
  },
  scrollView: {
    position: 'absolute',
    top: 130,
    height: '98%',
    width: '100%',
    paddingHorizontal: 15,
  },
  btnStyle: {
    backgroundColor: colors.new_blue,
    width: '40%',
    height: 50,
    alignSelf: 'flex-end',
    alignContent: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.new_blue,
    justifyContent:'center'
  },

  row: {
    flexDirection: 'row',
  //   borderWidth : 1,
    marginVertical: responsiveHeight(0.6),
  },
  label: {
    marginRight: 4,
    width : '50%',
    color : '#1A1A1A80',
    fontSize : responsiveFontSize(1.7)
  },
  value: {
    flex: 1,
    fontSize : responsiveFontSize(1.7)
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 8,
  },
});
