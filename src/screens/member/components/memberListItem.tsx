import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { fontType } from '../../../assets/fontType';
import Card from '../../../components/Card/Card';
import Row from '../../../components/Row/Row';
import SmallButton from '../../../components/SmallButton/SmallButton';
import CustomText from '../../../components/Text/CustomText';

const MemberListItem = ({
  name,
  image,
  address,
  relation,
  gender,
  email,
  contactNumber,
  onPressDetails,
  onPressEdit
}: ProviderListItemProps) => {

  const Capitalize2 = (str: string) => {
    if (!str) return '';
    // Convert the entire string to lowercase and then capitalize the first letter
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };
  const [base64Image, setBase64Image] = useState<any>('');

  const fetchImage = async (img: any) => {
    try {
      const response = await axios.get(
        `https://metsl-dev-docs.s3.amazonaws.com/${img}`,
      );
      setBase64Image(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (image !== null) {
      fetchImage(image);
    }
  }, [image]);

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return words[0][0] + words[words.length - 1][0];
    } else {
      return words[0][0];
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPressEdit}>
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.providerImageContainer}>
          {base64Image ? (
            <Image
              source={{
                uri: base64Image,
              }}
              style={styles.providerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.initialsContainer}>
              <CustomText
                fontSize={responsiveFontSize(3)}
                fontFamily={fontType.Roboto_Bold}>
                {getInitials(name).toUpperCase()}
              </CustomText>
            </View>
          )}
        </View>
        <View style={styles.providerDetailsContainer}>
          <Row style={styles.providerHeader}>
            <CustomText
              fontSize={responsiveFontSize(2.2)}
              fontFamily={fontType.Roboto_Medium}>
              {name}
            </CustomText>
            <SmallButton
              title="Details"
              onPress={onPressDetails}
            />
          </Row>
         {email &&  <CustomText
            fontSize={responsiveFontSize(1.7)}
            fontFamily={fontType.Roboto_Medium}
            color="#1A1A1A66">
            {email ? email : '-'}
          </CustomText>
}
{relation && <CustomText
            fontSize={responsiveFontSize(1.7)}
            fontFamily={fontType.Roboto_Medium}
            color="#1A1A1A66">
            {relation ? relation : '-'}
          </CustomText>
}
          <CustomText
            fontSize={responsiveFontSize(1.7)}
            fontFamily={fontType.Roboto_Medium}
            color="#1A1A1A66">
            {gender ? Capitalize2(gender) : '-'}
          </CustomText>
        </View>
      </Card>
    </View>
    </TouchableWithoutFeedback>
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
    marginRight: '3%',
    alignSelf: 'center',
    height: '95%',
  },
  providerImage: {
    flex: 1,
    width: 'auto',
    borderRadius: 8,
  },
  providerDetailsContainer: {
    flex: 0.97,
    justifyContent: 'space-around',
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
  initialsContainer: {
    width: responsiveHeight(12),
    height: '100%',
    borderRadius: 8,
    marginHorizontal: 5,
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MemberListItem;

interface ProviderListItemProps {
  name: string;
  image?: string;
  address: string;
  email: string;
  contactNumber: string;
  relation: string;
  gender:string;
  onPressDetails?: () => void
  onPressEdit?: () => void
}