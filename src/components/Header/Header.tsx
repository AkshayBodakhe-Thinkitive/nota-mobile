import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {FontType} from '../../constants/FontType';
import {fontType} from '../../assets/fontType';
import Row from '../Row/Row';
import CustomText from '../Text/CustomText';

const Header = ({
  title,
  leftIcon,
  onPress,
  pressOnNotification,
  isHideBackButton,
}: any) => {
  return (
    <View>
      <Row
        style={{
          justifyContent: 'space-between',
          height: '70%',
          paddingHorizontal: 6,
        }}>
        {isHideBackButton ? (
          <View style={{width: 25}}></View>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="arrow-back-sharp" size={25} color={'black'} />
          </TouchableOpacity>
        )}
        <CustomText
          fontSize={18}
          fontFamily={fontType.Roboto_Medium}
          style={{fontWeight: 'bold'}}>
          {title}
        </CustomText>
        <TouchableOpacity>{leftIcon}</TouchableOpacity>
      </Row>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25, //responsiveHeight(7),
    width: 25, //responsiveWidth(12),
  },
});
