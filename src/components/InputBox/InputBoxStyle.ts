import { StyleSheet } from 'react-native';
// import { fontType } from '../../../../assets/fontType';
// import { heights } from '../../constants/dimensionConstant';
import { fontType } from '../../assets/fontType';
// import { heights } from '../../authentication/constants/dimensionConstant';
import { heights } from '../../common/dimensionConstant';

export const InputBoxStyle = StyleSheet.create({
  border: {borderWidth: 1, borderRadius: 10},
  whiteback: {backgroundColor: 'white'},
  font: {fontFamily: fontType.outfit400, color: 'black'},
  eye: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 15,
    top: 12,
    padding: 5,
    paddingLeft: 10,
  },
  marginTop: {marginTop: 12},
  marVertical: {marginVertical: heights.height*0.0125},
  marginBottom: {marginBottom: 12},
  marginBottonWithError: {marginBottom: 0},
});
