import React from 'react';
import { Image, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import Card from '../../../../components/Card/Card';
import Row from '../../../../components/Row/Row';
import StarRating from '../../../../components/StarRating/StarRating';
// import KeyValuePairs from '../../../medical-records/components/keyvaluepair/KeyValuePair';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import KeyValuePairs from '../../../medicalRecord/components/keyvaluepair/KeyValuePair';
// import { colors } from '../../../../constants/Colors';
// import { FontType } from '../../../../constants/FontType';
import { colors } from '../../../../assets/colors';
import { fontType } from '../../../../assets/fontType';
import { ImagePath1 } from '../../../../Constants1/ImagePathConstant1';

const BookingCard = ({
    drName,
    drTitle,
    drImageSource,
    starRatingValue,
    dataArray,
    keyMapping,
    card1labelStyles,
    valueStyle,
  }: BookingCardProps) => {
    return (
      <Card style={styles.card1}>
        <Row style={styles.card1Row}>
          <View style={styles.ellipseImgBg}>
            <Image
              style={styles.doctorImg}
              source={
                drImageSource === null
                  ? ImagePath1.personImg
                  : {
                      uri: drImageSource,
                    }
              }
            />
          </View>
          <View>
            <Text style={styles.drName}>{drName}</Text>
            <Text style={styles.drTitle}>{drTitle[0]?.name}</Text>
            {/* <StarRating value={starRatingValue} /> */}
          </View>
        </Row>
        <View style={{ borderWidth: 0, height: '100%' }}>
          <KeyValuePairs
            dataArray={dataArray}
            keyMapping={keyMapping}
            labelStyle={[styles.card1labelStyles, card1labelStyles]} 
            valueStyle={[styles.valueStyle, valueStyle]} 
          />
        </View>
      </Card>
    );
  };
  
export default BookingCard;

interface BookingCardProps {
    drName: string;
    drTitle: any;
    drImageSource: any; 
    starRatingValue?: number;
    dataArray: any[]; 
    keyMapping: { [key: string]: string }; 
    card1labelStyles?: StyleProp<TextStyle>;
    valueStyle?: StyleProp<TextStyle>; 
  }
  

const styles = StyleSheet.create({
  card1: {
    width: null,
    height: responsiveHeight(32),
    marginBottom: '2%',
  },
  card1Row: {
    borderBottomWidth: 1,
    height: '30%',
    borderColor: '#00000029',
  },
  drImage: {
    height: responsiveHeight(8),
    width: responsiveWidth(18),
    alignSelf: 'flex-start',
    marginRight: '2%',
    margin: '2%',
  },
  drName: {
    color: colors.black,
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2),
    marginVertical: '2%',
  },
  drTitle: {
    color: '#1A1A1A66',
    fontFamily: fontType.Roboto_Medium,
    marginVertical: '3%',
  },
  card1labelStyles: {
    width: '40%',
    marginVertical: '1%',
    fontSize: responsiveFontSize(1.8),
  },
  valueStyle: {
    fontSize: responsiveFontSize(1.8),
  },
  ellipseImgBg: {
    height: '80%',
    resizeMode: 'cover',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
    // borderWidth:1,
    margin : 10
  },
  doctorImg: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius: responsiveHeight(10),
  },
});
