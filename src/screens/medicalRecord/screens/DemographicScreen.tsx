import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import RadioButton from '../components/RedioButtonDem';
import DemographicsCard from '../components/demographicsCard/DemographicsCard';
import KeyValuePairs from '../components/keyvaluepair/KeyValuePair';
import {
  KEY_MAPPING_OBJECT,
  KEY_MAPPING_OBJECT_CONTACT,
  KEY_MAPPING_OBJECT_POLICY,
} from '../constants/StringCostants';
import {DemographicScreenStyles as styles} from '../styles/DemoGraphicScreenStyles';
import {getProfileAction} from '../../../redux/reducers/profile/async-action/getProfileAction';
import {get} from '../../../config/AxiosConfig';
import {
  familyMemberDataById,
  storeFamilyMemberUuid,
} from '../../../redux/reducers/profile/ProfileReducer';

const DemographicScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const profileLoading = useAppSelector(
    (state: RootState) => state.profile.loading,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  if (uuidForMedicalRecords) {
    dispatch(storeFamilyMemberUuid(uuidForMedicalRecords));
  } else dispatch(storeFamilyMemberUuid(null));

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);

  const profileDataFromRedux = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const [profileData, setProfileData] = useState<any>(profileDataFromRedux);

  const [selectedValues, setSelectedValues] = useState<any>({});

  const goBack = () => navigation.pop();
  const goToNotification = () => navigation.navigate('NotificationSc');
  const handleValueChange = (key: any, value: any) => {
    setSelectedValues((prevState: any) => ({...prevState, [key]: value}));
  };
  const Capitalize = (str: string) => {
    if (!str) return '';
    return str?.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (uuidForMedicalRecords) {
        try {
          const response: any = await get(`/patient/${uuidForMedicalRecords}`, {
            headers: {
              Authorization: `Bearer ${loginData?.data?.accessToken}`,
            },
          });
          dispatch(familyMemberDataById(response?.data));
          setProfileData(response);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      } else {
        setProfileData(profileDataFromRedux);
      }
    };

    fetchProfileData();
  }, [uuidForMedicalRecords, profileDataFromRedux]);

  const Capitalize2 = (str: string) => {
    if (!str) return '';
    if (typeof str === 'string')
      return (
        str?.toLowerCase().charAt(0).toUpperCase() + str?.slice(1).toLowerCase()
      );
  };

  const getValidatedString = ({data, returningValidationChar = '-'}: any) => {
    if (data === null || data === '') {
      return returningValidationChar;
    } else {
      return data;
    }
  };

  // console.log("profileData  ",profileData);
  

  let userDataObject = {
    lastName: getValidatedString({
      data: Capitalize(profileData?.data?.legalLastName),
    }),
    firstName: getValidatedString({
      data: Capitalize(profileData?.data?.legalFirstName),
    }),
    firstNameUsed: getValidatedString({
      data: Capitalize(profileData?.data?.firstNameUsed),
    }),
    middleNameSuffix: getValidatedString({
      data: Capitalize(profileData?.data?.middleName),
    }),
    dob: getValidatedString({
      data: profileData?.data?.birthDate
        ? moment(profileData?.data?.birthDate).format('MM/DD/YYYY')
        : '-',
    }),
    previousName: getValidatedString({
      data: Capitalize(profileData?.data?.firstNameUsed),
    }),
    ssn: getValidatedString({ data: profileData?.data?.ssn }),
    legalSex: getValidatedString({
      data: Capitalize2(profileData?.data?.gender),
    }),
    motherName: getValidatedString({ data: profileData?.data?.motherName }),
    languages: getValidatedString({
      data: Capitalize2(profileData?.data?.languages?.[0]?.name),
    }),
    race: getValidatedString({ data: Capitalize2(profileData?.data?.race) }),
    ethnicity: getValidatedString({
      data: Capitalize2(profileData?.data?.ethnicity),
    }),
    maritalStatus: getValidatedString({
      data: Capitalize2(profileData?.data?.maritalStatus),
    }),
    sexualOrientation: '-',
    genderIdentity: '-',
  };
  
  const userDataArray = [userDataObject];

  if (uuidForMedicalRecords) {
    delete KEY_MAPPING_OBJECT?.middleNameSuffix
  }
  
  const contactArray = [
    {
      address:
        profileData?.data?.address === null
          ? '-'
          : getValidatedString({data: profileData?.data?.address?.line1}) +
            ' ' +
            getValidatedString({
              data: profileData?.data?.address?.line2,
              returningValidationChar: '',
            }) +
            ' ' +
            getValidatedString({
              data: profileData?.data?.address?.city,
              returningValidationChar: '',
            }),
      zipCode: getValidatedString({data: profileData?.data?.address?.zipcode}),
      state: getValidatedString({data: profileData?.data?.address?.state}),
      country: getValidatedString({data: profileData?.data?.address?.country}),
      homePhone: getValidatedString({data: profileData?.data?.homeNumber}),
      mobilePhone: getValidatedString({data: profileData?.data?.contactNumber}),
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '25%' : '22%'}>
        <TopNavigationView
          title="Demographics"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView style={styles1.scrollView}>
        <DemographicsCard bordered title={'Identification'}>
          <KeyValuePairs
            dataArray={userDataArray}
            keyMapping={KEY_MAPPING_OBJECT}
          />
        </DemographicsCard>
        <DemographicsCard bordered title={'Contact'}>
          <KeyValuePairs
            dataArray={contactArray}
            keyMapping={KEY_MAPPING_OBJECT_CONTACT}
          />
        </DemographicsCard>
        <View style={{marginBottom: 50}}>
        </View>
      </ScrollView>
      <View
        style={{
          height: '8%',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: '80%',
            width: '90%',
            backgroundColor: '#0097F0',
            position: 'absolute',
            top: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('EditDemographicsScreen')}>
          <Text
            style={{
              color: 'white',
              top: '30%',
              fontWeight: 'bold',
            }}>
            Edit Details
          </Text>
        </TouchableOpacity>
      </View>
      {/* {loading || profileLoading && <Loader />} */}
    </View>
  );
};

export default DemographicScreen;

const styles1 = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  label: {
    marginLeft: '3%',
    width: '40%',
    color: '#1A1A1A80',
    fontSize: responsiveFontSize(1.6),
  },
  scrollView: {
    position: 'absolute',
    top: 120,
    height: '100%',
    width: '100%',
    // paddingHorizontal: 15,
    // bottom:0
  },
});
