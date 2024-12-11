import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {colors} from '../../../assets/colors';
import Card from '../../../components/Card/Card';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import TextInput from '../../../components/TextInput/TextInput';
import {
  fillDataForDemographicsEdit,
  updateFieldValue,
} from '../../../redux/reducers/profile/ProfileReducer';
import {getLanguagesAction} from '../../../redux/reducers/profile/async-action/getLanguagesAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';

const IdentificationScreen = ({navigation}: any) => {
  const goBack = () => {
    navigation.pop();
  };
  const marritalStatus = [
    {label: 'Single', value: 'SINGLE'},
    {label: 'Married', value: 'MARRIED'},
    {label: 'Divorced', value: 'DIVORCED'},
    {label: 'Widowed', value: 'WIDOWED'},
  ];

  const raceData = [
    {label:'White',value:'WHITE'},
    {label:'Black',value:'BLACK'},
    {label:'Asian',value:'ASIAN'},
    {label:"Native American",value:"NATIVE_AMERICAN"},
    {label:'Other',value:'OTHER'},
  ]

  const ethnicities = [
    {label:'Black',value:'BLACK'},
    {label: 'Hispanic', value: 'HISPANIC'},
    {label: 'Non Hispanic', value: 'NON_HISPANIC'},
    {label: 'Asian', value: 'ASIAN'},
    {label:"Native American",value:"NATIVE_AMERICAN"},
    {label:'Other',value:'OTHER'},
  ];

  const genderType = [
    {label: 'Male', value: 'MALE'},
    {label: 'Female', value: 'FEMALE'},
    {label: 'Other', value: 'OTHER'},
  ];

  const profileData = useAppSelector(
    (state: RootState) => state?.profile?.profileData?.data,
  );
  const familyData = useAppSelector(
    (state: RootState) => state.profile.familyMemberData,
  );

  const languagesData = useAppSelector(
    (state: RootState) => state?.profile?.languages,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  // console.log('profleData',profileData)

  // console.log("languagesData-->",languagesData)

  function createPayload(data: any) {
    return {
      uuid: data.uuid,
      provider: {
        uuid: null,
      },
      location: {
        uuid: null,
      },
      registrationDate: data.registrationDate,
      legalLastName: data.legalLastName,
      legalFirstName: data.legalFirstName,
      firstNameUsed: data.firstNameUsed,
      middleName: data.middleName,
      birthDate: data.birthDate,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      ssn: data.ssn,
      languages: data.languages || null,
      ethnicity: data.ethnicity,
      race: data.race,
      motherName: data.motherName,
      address: {
        line1: data.address?.line1 || null,
        line2: data.address?.line2 || null,
        city: data.address?.city || null,
        state: data.address?.state || null,
        country: data.address?.country || null,
        zipcode: data.address?.zipcode || null,
      },
      contactNumber: data.contactNumber,
      email: data.email,
      fax: data.fax || null, // Assuming fax might be null
      emergContactLastName: data.emergContactLastName,
      emergContactFirstName: data.emergContactFirstName,
      emergContactRelation: data.emergContactRelation,
      emergContactNumber: data.emergContactNumber,
      emergContactEmail: data.emergContactEmail,
      emailConsent: data.emailConsent,
      callConsent: data.callConsent,
      messageConsent: data.messageConsent,
      formConsent: data.formConsent,
      note: data.note,
      preferredPharmacy: data.preferredPharmacy || null, // Assuming preferredPharmacy might be null
      preferredLab: data.preferredLab || null, // Assuming preferredLab might be null
      preferredRadiology: data.preferredRadiology || null, // Assuming preferredRadiology might be null
      avatar: data.avatar,
      newAvatar: data.newAvatar,
      homeNumber : data?.homeNumber
    };
  }

  let payload = {};

  if (uuidForMedicalRecords) {
    payload = createPayload(familyData);
  } else {
    payload = createPayload(profileData);
  }

  // console.log('payload ===== ',payload)

  const dispatch = useAppDispatch();

  const handleFillData = () => {
    dispatch(fillDataForDemographicsEdit(payload));
  };
 
  useEffect(() => {
    handleFillData();
  }, [profileData, familyData]);

  useEffect(() => {
    console.log('Getting languages');
    dispatch(getLanguagesAction(''));
  }, []);

  const demographicsDataToEdit = useAppSelector(
    (state: RootState) => state?.profile?.demographicsData,
  );

  console.log('demographicsDataToEdit +++++ ', demographicsDataToEdit);

  const handleInputChange = (key: any, value: any) => {
    dispatch(updateFieldValue({key, value}));
  };

  const handleValueChangeForGenderTypeDropDown = (value: string) => {
    handleInputChange('gender', value.toUpperCase());
    console.log('Selected gender value:', value);
  };

  const handleValueChangeForMaritalStatusTypeDropDown = (value: string) => {
    handleInputChange('maritalStatus', value.toUpperCase());

    console.log('Selected maritalStatus value:', value);
  };

  const [selectedLang,setSelectedLang] = useState('')
  const handleValueChangeForLanguageTypeDropDown = (value: string,id:any) => {
    handleInputChange('languages', [id]);
    setSelectedLang(value)
  };

  const handleValueChangeForRaceTypeDropDown = (value: string) => {
    handleInputChange('race', value.toUpperCase());

    console.log('Selected race value:', value);
  };

  const handleValueChangeForEthnicitiesTypeDropDown = (value: string) => {
    handleInputChange('ethnicity', value.toUpperCase());
    console.log('Selected ethnicity value:', value);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : (null as any)}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(22) : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.pageContainer}>
          <Card
            width={'100%'}
            style={{marginBottom: 10, height: null, padding: 10, top: 20}}>
            <View style={{height: 40}}>
              <Text
                style={{color: '#0097F0', fontWeight: 'normal', fontSize: 16}}>
                Identification
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#00000029',
                bottom: 10,
              }}></View>
            <TextInput
              value={demographicsDataToEdit?.legalLastName}
              label="Last Name"
              placeholder="Enter Legal Last Name"
              onChangeText={value => handleInputChange('legalLastName', value)}
            />
            <TextInput
              value={demographicsDataToEdit?.legalFirstName}
              label="First Name"
              placeholder="Enter Legal First Name"
              onChangeText={value => handleInputChange('legalFirstName', value)}
            />
            <TextInput
              value={demographicsDataToEdit?.middleName}
              label="Middle Name"
              placeholder="Enter Middle Name, Suffix"
              onChangeText={value => handleInputChange('middleName', value)}
            />
            <TextInput
              value={
                demographicsDataToEdit?.birthDate === null
                  ? ''
                  : moment(demographicsDataToEdit?.birthDate).format(
                      'MM/DD/YYYY',
                    )
              }
              label="Date of Birth"
              placeholder="Enter DOB"
              onChangeText={value => handleInputChange('birthDate', value)}
              // editable={false}
            />
            <TextInput
              value={demographicsDataToEdit?.ssn}
              label="SSN"
              placeholder="Enter SSN"
              onChangeText={value => handleInputChange('ssn', value)}
            />
            <DropdownComponent
              data={genderType}
              label="Gender"
              placeholder="Enter Legal Sex"
              selectedValue={profileData?.gender}
              onValueChange={handleValueChangeForGenderTypeDropDown}
              disable={true}
            />
            <TextInput
              value={demographicsDataToEdit?.motherName}
              label="Mother Name"
              placeholder="Enter Mother Name"
              onChangeText={value => handleInputChange('motherName', value)}
            />
            <DropdownComponent
              data={languagesData}
              placeholder="Select Lanuage"
              label="Language"
              // selectedValue={demographicsDataToEdit?.languages}
              selectedValue={selectedLang || demographicsDataToEdit?.language?.[0]?.name?.toUpperCase()}
              onValueChange={(value:any,id:any) => handleValueChangeForLanguageTypeDropDown(value,id)}
            />
            <DropdownComponent
              data={marritalStatus}
              label="Marital Status"
              placeholder="Marital Status"
              selectedValue={demographicsDataToEdit?.maritalStatus}
              onValueChange={handleValueChangeForMaritalStatusTypeDropDown}
            />
            <DropdownComponent
              data={ethnicities}
              label="Ethnicity"
              placeholder="Ethinicity"
              selectedValue={demographicsDataToEdit?.ethnicity}
              onValueChange={handleValueChangeForEthnicitiesTypeDropDown}
            />

            <DropdownComponent
              data={raceData}
              placeholder="Race"
              label="Race"
              selectedValue={demographicsDataToEdit?.race}
              onValueChange={handleValueChangeForRaceTypeDropDown}
            />
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default IdentificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    padding: '3%',
    marginBottom: responsiveHeight(5),
  },
});
