import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Card from '../../../components/Card/Card';
import Row from '../../../components/Row/Row';
import SmallButton from '../../../components/SmallButton/SmallButton';
import CustomText from '../../../components/Text/CustomText';
import TextButton from '../../../components/TextButton/TextButton';
// import { colors } from '../../../constants/Colors';
import { colors } from '../../../assets/colors';
// import { FontType } from '../../../constants/FontType';
import { fontType } from '../../../assets/fontType';
import { BulletedText } from '../components/BulletedText/BulletedText';

const LabSc = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orderMedContainer}>
        <CustomText
          fontSize={responsiveFontSize(2)}
          fontFamily={fontType.Roboto_Medium}>
          Money Saver Package
        </CustomText>
        <BulletedText>Full Blood Count & WBC count test</BulletedText>
        <BulletedText>Free Home Sample pickup</BulletedText>
        <Row style={{justifyContent: 'space-between'}}>
          <BulletedText>48 Hrs report delivery</BulletedText>
          <SmallButton
            title="Book Now"
            textStyle={{color: colors.black}}
            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
            }}></SmallButton>
        </Row>
      </View>

      <Row style={{justifyContent: 'space-between', marginVertical: 10}}>
        <CustomText
          fontSize={responsiveFontSize(2.2)}
          fontFamily={fontType.Roboto_Medium}>
          Top Booked Lab Test
        </CustomText>
        <TextButton text="View All" />
      </Row>

      <FlatList
        data={[1,2,3,4]}
        numColumns={2}
        contentContainerStyle={{marginHorizontal: 5, marginTop: 5}}
        renderItem={() => {
          return (
            <View>
              <Card height={null} width={'94%'} style={{padding: 10,marginBottom:15}}>
                <CustomText
                  fontFamily={fontType.Roboto_Medium}
                  fontSize={responsiveFontSize(2)}>
                  Complete Blood Count
                </CustomText>
                <CustomText style={{marginVertical: 12, color: colors.navala_grey,fontSize:responsiveFontSize(1.7)}}>
                  E-Report on same day
                </CustomText>
                <CustomText
                  fontFamily={fontType.Roboto_Medium}
                  fontSize={responsiveFontSize(2)}
                  style={{marginBottom:8}}
                  >
                  $ 75
                </CustomText>
                <TextButton text="Book" style={{alignSelf: 'flex-end'}} />
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
};

export default LabSc;

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
