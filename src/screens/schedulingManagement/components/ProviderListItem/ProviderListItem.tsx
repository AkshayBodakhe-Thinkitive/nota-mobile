import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../../../../components/Card/Card';
import {ImagePath} from '../../../../Constants1/ImagePaths';
import Row from '../../../../components/Row/Row';
import CustomText from '../../../../components/Text/CustomText';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {FontType} from '../../../../Constants1/FontType';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import {useNavigation} from '@react-navigation/native';
import {AppNavConstants} from '../../../../Constants1/NavConstants';

const ProviderListItem = ({name, price, image}: any) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.providerImageContainer}>
          <Image
            source={image}
            style={styles.providerImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.providerDetailsContainer}>
          <Row style={styles.providerHeader}>
            <CustomText
              fontSize={responsiveFontSize(2)}
              fontFamily={FontType.Roboto_Medium}>
              {name}
            </CustomText>
            <SmallButton
              title="Book"
              onPress={() =>
                navigation.navigate(AppNavConstants.BOOK_APPOINTMENT)
              }
            />
          </Row>
          <CustomText
            fontSize={responsiveFontSize(1.7)}
            fontFamily={FontType.Roboto_Medium}
            color="#1A1A1A66">
            General Physician
          </CustomText>
          <Row style={styles.providerFooter}>
            <Image
              source={ImagePath.stars}
              style={styles.starImage}
              resizeMode="cover"
            />
            <CustomText
              fontFamily={FontType.Roboto_Medium}
              fontSize={responsiveFontSize(2)}>
              ${price}
            </CustomText>
          </Row>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    width: '98%',
    flexDirection: 'row',
    padding: '1%',
    alignSelf: 'center',
  },
  providerImageContainer: {
    width: responsiveHeight(12),
    borderRadius: 8,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  providerImage: {
    flex: 1,
    width: 'auto',
  },
  providerDetailsContainer: {
    flex: 0.97,
    justifyContent: 'space-between',
    height: '85%',
    alignSelf: 'center',
  },
  providerHeader: {
    justifyContent: 'space-between',
  },
  providerFooter: {
    justifyContent: 'space-between',
  },
  starImage: {
    height: responsiveHeight(2.5),
    width: '55%',
    marginBottom: 5,
  },
});

export default ProviderListItem;
