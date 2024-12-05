import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../assets/colors';
import { fontType } from '../../assets/fontType';
import Row from '../../components/Row/Row';
import SmallButton from '../../components/SmallButton/SmallButton';
import CustomText from '../../components/Text/CustomText';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';

const InsuranceDetailTabScreen = () => {
  const insuranceData = [
    { label: 'Insurance Name', value: 'Alexander will smith insurance Pvt ltd' },
    { label: 'Insurance Number', value: '15425632' },
    { label: 'Group Id', value: '25' },
  ];

  const renderInsuranceSection = (title) => {
    return (
      <View style={{paddingVertical:10}}>
        <CustomText
          color={colors.primary}
          fontFamily={fontType.Roboto_Medium}
          fontSize={responsiveFontSize(2)}>
          {title}
        </CustomText>
        {insuranceData.map((item, index) => (
          <Row key={index} style={{ marginVertical: 6 }}>
            <CustomText
              color="#1A1A1A80"
              fontFamily={fontType.Roboto_Medium}
              fontSize={responsiveFontSize(1.7)}>
              {item.label} :{' '}
            </CustomText>
            <CustomText fontSize={responsiveFontSize(1.7)}>
              {item.value}
            </CustomText>
          </Row>
        ))}
        <View>
          <Image
            source={ImagePath1.InsCardFrontImage}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <Image
            source={ImagePath1.InsCardBackImage}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 70, paddingBottom: 50 }}>
        <View style={styles.addButtonContainer}>
          <SmallButton title="Add Secondary Insurance" />
        </View>
        {renderInsuranceSection('Primary Insurance')}
        {renderInsuranceSection('Secondary Insurance')}
        {renderInsuranceSection('Ternary Insurance')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  imageStyle: {
    width: Platform.OS === 'ios' ? responsiveWidth(72) : responsiveWidth(73.4),//responsiveWidth(72),
    height: Platform.OS === 'ios' ? responsiveHeight(21) : responsiveHeight(22),//responsiveHeight(21),
    marginVertical: 6,
  },
});

export default InsuranceDetailTabScreen;
