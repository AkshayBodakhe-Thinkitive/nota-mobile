import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomText from '../Text/CustomText';
import { fontType } from '../../assets/fontType';
import { ImagePath } from '../../assets/images/ImagePaths';


interface Props {
    message?: string
}

const ListEmptyComponent = ({message}:Props) => {
  return (
    <View style={styles.cotainer}>
      <Image source={require('../../assets/images/NoResult.png')} style={styles.noResultImage} />
      <CustomText
        color={'#727272'}
        fontFamily={fontType.Roboto_Medium}
        fontSize={responsiveFontSize(2.5)}>
        {message ? message : "No Data found !"}
      </CustomText>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height : '100%',
  },
  noResultImage: {
    flex : 1,
    height: responsiveHeight(20),
    width: '65%',
    resizeMode: 'cover',
    marginVertical: 10,
  },
});
