import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import { FeatherIcon } from '../../../../components/Icons/FeatherIcon';
import Row from '../../../../components/Row/Row';
import CustomText from '../../../../components/Text/CustomText';
import TextButton from '../../../../components/TextButton/TextButton';
// import { colors } from '../../../../constants/Colors';
import { colors } from '../../../../assets/colors';
// import { FontType } from '../../../../constants/FontType';
import { fontType } from '../../../../assets/fontType';

interface Props {
  title?: string;
  highTitle?: string;
  lowTitle?: string;
  highValue?: string;
  lowValue?: string;
  unit?: string;
  singleValue?: string;
  image? :any
  datestr?: any,
  onPressHistory? : any
  showHistoryBtn?:any
}

const VitalsCard = ({
  title,
  highTitle,
  lowTitle,
  highValue,
  lowValue,
  unit,
  singleValue,
  image,
  datestr,
  onPressHistory,
  showHistoryBtn
}: Props) => {
  console.log(highValue)
  return (
    <Card width={'95%'} height={null} style={{padding: 13, marginBottom: 8,marginLeft:10}}>
      <Row style={{justifyContent: 'space-between'}}>
        <Row>
          <Image
            source={image}
            resizeMode="cover"
            style={{
              height: responsiveHeight(3.5),
              width: responsiveHeight(3.5),
              marginRight: 15,
            }}
          />
          <CustomText
            fontFamily={fontType.Roboto_Medium}
            fontSize={16}>
            {title}
          </CustomText>
        </Row>
      
      </Row>
      <View>
        <Row style={{marginBottom: 6, marginTop: 10}}>
          {singleValue ? (
            <>
              <Row
                style={{
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  fontFamily={fontType.Roboto_Medium}
                  fontSize={responsiveFontSize(2)}
                  style={{marginRight:6}}
                  >
                  {singleValue}
                </CustomText>
                <CustomText color={colors.navala_grey}>{unit}</CustomText>
              </Row>
            </>
          ) : (
            <Row>
              <View
                style={{
                  width: responsiveWidth(20),
                  marginRight: 15,
                }}>
                <CustomText
                fontSize={responsiveFontSize(2)}
                  style={{marginBottom: 5}}>
                  {highTitle}
                </CustomText>
                <Row>
                  <CustomText
                    fontFamily={fontType.Roboto_Medium}
                    fontSize={responsiveFontSize(2)}
                    style={{marginRight:6}}
                    >
                    {highValue ? highValue : '-'}
                  </CustomText>
                  <CustomText fontFamily={ fontType.Roboto_Regular} fontSize={12} color={colors.navala_grey}>{unit}</CustomText>
                </Row>
              </View>
              <View
                style={{
                    width: responsiveWidth(20),
                }}>
                <CustomText
                  fontSize={responsiveFontSize(2)}
                  style={{marginBottom: 5}}>
                  {lowTitle}
                </CustomText>
                <Row>
                  <CustomText
                    fontFamily={fontType.Roboto_Medium}
                    fontSize={responsiveFontSize(2)}
                     style={{marginRight:6}}>
                    {lowValue}
                  </CustomText>
                  {lowValue && <CustomText fontFamily={ fontType.Roboto_Regular} fontSize={12} color={colors.navala_grey}>{unit}</CustomText>}
                </Row>
              </View>
            </Row>
          )}
        </Row>
      </View>
      <Row style={{justifyContent: 'space-between'}}>
        <CustomText fontFamily={ fontType.Roboto_Regular} fontSize={responsiveFontSize(1.7)} color={colors.navala_grey}>{datestr}</CustomText>
      {showHistoryBtn === false ? <></>  :  <TextButton text="View History" onPress={onPressHistory}/>}
      </Row>
    </Card>
  );
};

export default VitalsCard;

const styles = StyleSheet.create({
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
});
