import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {colors} from '../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../components/Card/Card';
import Row from '../../components/Row/Row';
import Button from '../../components/ButtonComponent/ButtonComponent';
import {deleteInsuranceAction} from '../../redux/reducers/home/aysnc-actions/deleteInsuranceAction';
import {useAppDispatch} from '../../redux/store/hooks';
import {handleEdit} from './constants/insuranceUtils';
import {getInsuranceAction} from '../../redux/reducers/home/aysnc-actions/getInsuranceAction';
import { formatDate } from '../../utils/DateUtils';

const InsuranceDatailScreen = ({navigation, route}: any) => {
  const {response} = route?.params;

  const goBack = () => {
    navigation.pop();
  };

  const dispatch = useAppDispatch();

  const handleDelete = (uuid: any) => {
    Alert.alert('Delete Insurance', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteInsuranceAction({insuranceId: uuid}))
            .then(() => {
              navigation.goBack();
            })
            .then(() => dispatch(getInsuranceAction()));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'16%'}>
        <TopNavigationView
          title="Current Insurance"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.cardStyles}>
          <Text style={styles.title}>
            {response?.insuranceType?.charAt(0).toUpperCase() +
              response?.insuranceType?.slice(1)?.toLowerCase()}{' '}
            Insurance
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailItem}>
              Insurance Name: {response?.insurancePayer || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Member ID: {response?.memberId || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Group Name: {response?.groupName || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Group ID: {response?.groupId || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Plan Name: {response?.planName || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Expiry Date:{' '}
              {response?.expiryDate
                ? formatDate(response?.expiryDate)
                : '-'}
            </Text>
            <Text style={styles.detailItem}>
              Payer Contact Number: {response?.payerContactNumber || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Payer Fax Number: {response?.payerFaxNumber || '-'}
            </Text>
          </View>

          <View style={styles.uploadContainer}>
            <Image source={{uri: response?.frontPhoto}} style={styles.image} />
            <Image source={{uri: response?.backPhoto}} style={styles.image} />
          </View>

          <Text style={styles.title}>Policy Holder</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailItem}>
              Name:{' '}
              {`${response?.insurancePolicyHolder?.firstName || '-'} ${
                response?.insurancePolicyHolder?.lastName || '-'
              }`}
            </Text>
            <Text style={styles.detailItem}>
              Date of Birth:{' '}
              {response?.insurancePolicyHolder?.dob
                ? formatDate(response?.insurancePolicyHolder.dob)
                : '-'}
            </Text>
            <Text style={styles.detailItem}>
              Gender: {response?.insurancePolicyHolder?.gender || '-'}
            </Text>
            <Text style={styles.detailItem}>
              Address: {response?.insurancePolicyHolder?.address?.line1 || '-'},{' '}
              {response?.insurancePolicyHolder?.address?.city || '-'},{' '}
              {response?.insurancePolicyHolder?.address?.state || '-'},{' '}
              {response?.insurancePolicyHolder?.address?.country || '-'}
            </Text>
          </View>
          <Row style={styles.btnRow}>
            <Button
              title="Edit"
              outlined
              buttonStyle={styles.editBtn}
              onPress={() => handleEdit(response, navigation)}></Button>
            <Button
              title="Delete"
              buttonStyle={styles.deleteBtn}
              onPress={() => handleDelete(response?.uuid)}></Button>
          </Row>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    padding: '1%',
  },
  cardStyles: {
    height: null,
    width: null,
    padding: 10,
    marginBottom: 30,
    marginHorizontal: 5,
    marginTop: 5,
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  detailsContainer: {},
  detailItem: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    marginBottom: 8,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadBox: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    height: responsiveHeight(21),
    width: '90%',
    marginVertical: 6,
    borderRadius: 8,
    marginLeft: '5%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    resizeMode: 'contain',
  },
  btnRow: {
    justifyContent: 'flex-end',
    padding: 8,
  },
  editBtn: {
    width: '30%',
    marginRight: 5,
  },
  deleteBtn: {
    width: '30%',
  },
});

export default InsuranceDatailScreen;
