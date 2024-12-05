import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import TextButton from '../../../../components/TextButton/TextButton';
// import { ImagePath } from '../../../../constants/ImagePaths'
import SmallButton from '../../../../components/SmallButton/SmallButton';
// import { colors } from '../../../../constants/Colors'
import { colors } from '../../../../assets/colors';
import { fontType } from '../../../../assets/fontType';

const ProviersConsulted = ({
  drImage,
  drName,
  drSpeciality,
  drDate,
}: ProvidersConsultedProps) => {
  return (
    <View style={styles.providerConsultedContainer}>
      <View style={styles.provConsTxtRow}>
        <Text style={styles.provConsTxt}>Providers you have consulted</Text>
        <TextButton text="View All" />
      </View>
      <View style={{marginBottom: responsiveHeight(2)}}>
        <Card height={null} style={styles.providerConsultedCard}>
          <View style={[styles.providerImageContainer]}>
            <Image
              source={drImage}
              style={[{flex: 1, width: 'auto'}]}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 1}}>
            <View>
              <View style={styles.drBookAgainRow}>
                <Text style={styles.drName}>{drName}</Text>
                <SmallButton title="Book Again" />
              </View>
              <Text style={styles.drTitle}>{drSpeciality}</Text>
              <Text style={styles.drDate}>{drDate}</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default ProviersConsulted;

interface ProvidersConsultedProps {
  drImage: any;
  drName: string;
  drSpeciality: string;
  drDate: string;
}

const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(5);
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

const styles = StyleSheet.create({
  providerConsultedContainer: {
    borderWidth: 0,
    flex: 1,
    marginHorizontal: 10,
  },

  provConsTxtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
    // marginHorizontal: 10,
  },
  providerConsultedCard: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  providerImageContainer: {
    borderColor: colors.primary,
    width: responsiveHeight(9.5),
    height: responsiveHeight(9.5),
    borderRadius: borderRadiusPixel,
    marginHorizontal: 10,
  },
  provConsTxt: {
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2.3),
    color: colors.black,
  },
  drBookAgainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  drName: {
    fontFamily: fontType.Roboto_Bold,
    fontSize: responsiveFontSize(2),
    color: colors.black,
  },
  drTitle: {
    fontFamily: fontType.Roboto_Medium,
    color: '#00000066',
    marginBottom: 8,
    marginTop: -5,
  },
  drDate: {
    fontFamily: fontType.Roboto_Regular,
    color: '#00000066',
  },
});
