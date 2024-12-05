import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';
import { fontType } from '../../../assets/fontType';
import Row from '../../../components/Row/Row';
import SmallButton from '../../../components/SmallButton/SmallButton';
import CustomText from '../../../components/Text/CustomText';
import TextButton from '../../../components/TextButton/TextButton';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import { BulletedText } from '../components/BulletedText/BulletedText';

const MedicinesSc = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orderMedContainer}>
        <CustomText
          fontSize={responsiveFontSize(2)}
          fontFamily={fontType.Roboto_Medium}>
          Order Medicines
        </CustomText>
        <View>
          <BulletedText>Same day delivery</BulletedText>
          <Row style={{justifyContent: 'space-between'}}>
            <BulletedText>Safe home delivery</BulletedText>
            <SmallButton
              title="Order Now"
              textStyle={{color: colors.black}}
              containerStyle={{
                backgroundColor: 'white',
                borderWidth: 0,
              }}></SmallButton>
          </Row>
        </View>
      </View>

      <View
        style={{
          marginTop: 15,
          borderBottomWidth: 1.5,
          borderColor: '#00000029',
          marginBottom: 8,
        }}>
        <CustomText
          fontSize={responsiveFontSize(2.2)}
          fontFamily={fontType.Roboto_Medium}>
          Upload Prescription
        </CustomText>
        <Row style={{borderWidth: 0, marginVertical: 10}}>
          <TouchableOpacity>
            <Image
              source={ImagePath1.uploadimage}
              resizeMode="cover"
              style={{
                height: responsiveHeight(12),
                width: responsiveWidth(25),
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={ImagePath1.takeimage}
              resizeMode="cover"
              style={{height: responsiveHeight(12), width: responsiveWidth(25)}}
            />
          </TouchableOpacity>
        </Row>
      </View>
      <TextButton text="View Your Current and Past Medication" />
    </View>
  );
};

export default MedicinesSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  orderMedContainer: {
    backgroundColor: '#F088001A',
    borderRadius: 8,
    padding: 10,
  },
});
