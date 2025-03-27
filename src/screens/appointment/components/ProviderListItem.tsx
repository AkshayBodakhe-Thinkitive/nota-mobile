import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fontType} from '../../../assets/fontType';
import {heights} from '../../../common/dimensionConstant';
import SmallButton from '../../../components/SmallButton/SmallButton';
import CustomText from '../../../components/Text/CustomText';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import Row from '../../../components/Row/Row';

const ProviderListItem = ({
  name,
  contact,
  image,
  address,
  providerData,
  loading,
  portalName,
}: any) => {
  const navigation = useNavigation<any>();

  function formatVitalName(input: string) {
    if (input.startsWith('NAVALA') && input.length > 6) {
      const formatted = input.slice(0, 6) + ' ' + input.slice(6); // Splits into "NAVALA GLOBAL"
      return formatted
        .split(' ') // Split into words ["NAVALA", "GLOBAL"]
        .map(word => word[0]) // Get the first letter of each word
        .join(''); // Combine them into "NG"
    }
    return input;
  }

  // console.log('providerData====> ', providerData);

  return (
    <View style={[styles.container, styles.shadow]}>
      <Image
        source={
          image === null
            ? ImagePath1.hospitalImg
            : {
                uri: image,
              }
        }
        style={styles.providerImage}
        resizeMode="cover"
      />
      <View style={styles.providerDetailsContainer}>
        <View style={styles.providerHeader}>
          <CustomText
            style={{paddingRight: 8, maxWidth: '68%'}}
            fontSize={responsiveFontSize(2)}
            fontFamily={fontType.Roboto_Medium}
            numberOfLines={2}>
            {name}
          </CustomText>
          <View>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: portalName === 'NAVALAGLOBAL' ? 'green' : '#0097F0',
              }}>{`${formatVitalName(portalName)}`}</Text>
          </View>
        </View>

        <CustomText
          style={{paddingTop: 8}}
          fontSize={responsiveFontSize(1.7)}
          fontFamily={fontType.Roboto_Medium}
          color="#1A1A1A66"
          numberOfLines={2}>
          {address}
        </CustomText>
        <Row style={styles.providerFooter}>
          <CustomText
            style={{paddingTop: 8}}
            color="grey"
            fontFamily={fontType.Roboto_Medium}
            fontSize={responsiveFontSize(1.8)}>
            {providerData?.specialities?.length > 1
              ? 'Multi Specialist'
              : providerData?.specialities?.[0]?.name || ''}
          </CustomText>
          <SmallButton
            title="Book"
            onPress={() =>
              navigation.navigate('bookappointment', {providerData})
            }
          />
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    // backgroundColor: 'red',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  card: {
    // width: '98%',
    flexDirection: 'row',
    padding: 16,
    alignContent: 'space-between',
    // height: 150,
  },
  providerImageContainer: {
    // width: responsiveHeight(12),
    borderRadius: 8,
    marginRight: 8,
    // alignSelf: 'center',
  },
  providerImage: {
    // flex: 1,
    height: heights.height * 0.12,
    width: heights.height * 0.12,
    marginRight: 16,
    // aspectRatio: 1,
    borderRadius: 8,
  },
  providerDetailsContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    // height: '85%',
    // alignSelf: 'center',
    width: '50%',
  },
  providerHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  providerFooter: {
    justifyContent: 'space-between',
    // backgroundColor: 'blue'
    // borderWidth:1,
    alignItems: 'flex-start',
    marginTop: 5,
  },

  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },

  starImage: {
    height: responsiveHeight(2.5),
    width: '55%',
    marginBottom: 5,
  },
});
export default ProviderListItem;
