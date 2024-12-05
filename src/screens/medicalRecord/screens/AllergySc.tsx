import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fontType} from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import Card from '../../../components/Card/Card';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import CustomText from '../../../components/Text/CustomText';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {getAllergiesAction} from '../../../redux/reducers/medicalrecord/aysnc-action/getAllergiesAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {DemographicScreenStyles as styles} from '../styles/DemoGraphicScreenStyles';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Row from '../../../components/Row/Row';
import TextButton from '../../../components/TextButton/TextButton';
import { useNavigation } from '@react-navigation/native';

const AllergyCards = ({
  name,
  type,
  category,
  status,
  reaction,
  note,
  bordered,
  children,
  onPressEdit
}: any) => {
  const Capitalize2 = (str: string) => {
    if (!str) return '';
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {color: 'green'};
      case 'inactive':
        return {color: 'red'};
      default:
        return {color: 'black'};
    }
  };

  const navigation = useNavigation<any>()

  return (
    <Card
      width={'95%'}
      style={{marginBottom: 10, height: null, marginLeft: 10}}>
      {name && (
        <View
          style={{
            borderBottomWidth: bordered ? 1 : 0,
            padding: 12,
            paddingBottom: bordered ? null : 0,
            borderColor: '#1A1A1A4D',
          }}>
          <View>
            <Text
              style={{
                color: '#0097F0',
                fontFamily: fontType.Roboto_Bold,
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
            <View style={allergyStyle.row}>
              <CustomText style={[allergyStyle.label]}>{'Type'}: </CustomText>
              <CustomText style={[allergyStyle.value]}>
                {Capitalize2(type)}
              </CustomText>
            </View>
            <View style={allergyStyle.row}>
              <CustomText style={[allergyStyle.label]}>
                {'Category'}:{' '}
              </CustomText>
              <CustomText style={[allergyStyle.value]}>
                {Capitalize2(category)}
              </CustomText>
            </View>
            <View style={allergyStyle.row}>
              <CustomText style={[allergyStyle.label]}>{'Status'}: </CustomText>
              <CustomText style={[allergyStyle.value, getStatusColor(status)]}>
                {Capitalize2(status)}
              </CustomText>
            </View>
            <View style={allergyStyle.row}>
              <CustomText style={[allergyStyle.label]}>
                {'Reactions'}:{' '}
              </CustomText>
              <CustomText style={[allergyStyle.value]}>
                {Capitalize2(reaction)}
              </CustomText>
            </View>
            <View style={allergyStyle.row}>
              <CustomText style={[allergyStyle.label]}>{'Note'}: </CustomText>
              <CustomText style={[allergyStyle.value]}>{note}</CustomText>
            </View>
            <Row style={{justifyContent: 'flex-end', marginBottom: 8}}>
              <Button
                title="Edit"
                outlined
                textStyle={{fontSize: responsiveFontSize(1.5)}}
                buttonStyle={{height: responsiveHeight(4)}}
                onPress={onPressEdit}
              />
            </Row>
          </View>
        </View>
      )}
      <View style={{flex: 1}}>{children}</View>
    </Card>
  );
};
const AllergySc = ({navigation}: any) => {
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  const allergyData = useAppSelector(
    (state: RootState) => state.medicalrecord.allergyData,
  );
  // console.log(
  //   'allergyData in allergy  ',
  //   JSON.stringify(allergyData?.data?.content),
  // );

  const [update,setUpdate] = useState(false)


  useEffect(() => {
    let UUID = profileData?.data?.uuid;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
      dispatch(
        getAllergiesAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: UUID,
          page: '0',
          size: '10',
        }),
      );
    }
    setUpdate(false)
  }, [loginData?.data?.accessToken,update]);

  const goBack = () => {
    navigation.pop();
  };
  // console.log('allergyData', allergyData);

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '20%' : '22%'}>
        <TopNavigationView
          title="Allergies"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.scrollView}>
        {allergyData?.data?.empty === false ? (
          <FlatList
            data={allergyData?.data?.content}
            renderItem={({item, index}) => {
              return (
                <AllergyCards
                  name={item?.allergy}
                  type={item?.allergyType}
                  category={item?.severity}
                  status={item?.status === true ? 'Active' : 'Inactive'}
                  reaction={item?.reaction}
                  note={item?.note}
                  onPressEdit={()=>navigation.navigate('AddAllergy',{update:true,item:item,edit:setUpdate})}
                />
              );
            }}
          />
        ) : (
          <View style={{height: 100, width: '100%'}}>
            <Text
              style={{
                top: 50,
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                color: 'black',
              }}>
              No allergy for the patient
            </Text>
          </View>
        )}
      </View>
      <View style={allergyStyle.btnContainer}>
        <Button
          title="Add Allergy"
          onPress={() => navigation.navigate('AddAllergy',{update:false,edit:setUpdate})}
        />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default AllergySc;

const allergyStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    //   borderWidth : 1,
    marginVertical: responsiveHeight(0.6),
  },
  label: {
    marginRight: 4,
    width: '30%',
    color: '#1A1A1A80',
    fontSize: responsiveFontSize(1.7),
  },
  value: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 8,
  },
  btnContainer: {
    bottom: '3%',
    position: 'absolute',
    paddingHorizontal: '3%',
    width: '100%',
  },
});
