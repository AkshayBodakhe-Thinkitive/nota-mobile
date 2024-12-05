import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {ScrollView} from 'react-native';
import {colors} from '../../../assets/colors';
import Row from '../../../components/Row/Row';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import TextInput from '../../../components/TextInput/TextInput';
import {fontType} from '../../../assets/fontType';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {post, put} from '../../../config/AxiosConfig';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const AddAllergy = ({navigation}: any) => {
  const route = useRoute<any>();

  const {update, item, edit} = route?.params;

  const convertToISOWithTime = (dateStr:any) => {
    const date = new Date(`${dateStr}T00:00:00.000Z`);
    return date
  };

  const [allergyType, setAllergyType] = useState(item?.allergyType || 'Drug');
  const [allergyName, setAllergyName] = useState(item?.allergy);
  const [reaction, setReaction] = useState(item?.reaction);
  const [severity, setSeverity] = useState(item?.severity);
  const [onsetDate, setOnsetDate] = useState(update ? convertToISOWithTime(item?.onSetDate) : new Date());
  const [note, setNote] = useState(item?.note);
  const [status, setStatus] = useState(update ? item?.status : true);


  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  const reactionData = [
    {label: 'Pain', value: 'PAIN'},
    {label: 'Runny Nose', value: 'RUNNY_NOSE'},
    {label: 'Swelling', value: 'SWELLING'},
    {label: 'Bloating', value: 'BLOATING'},
    {label: 'Vomiting', value: 'VOMITING'},
    {label: 'Rashes', value: 'RASHES'},
    {label: 'Itchy nose', value: 'ITCHY_NOSE'},
    {label: 'Throat Closing', value: 'THROAT_CLOSING'},   
    {label: 'Cough', value: 'COUGH'},
    {label: 'Redness', value: 'REDNESS'},
  ];

  const severityOptions = [
    {label: 'Mild', value: 'MILD'},
    {label: 'Moderate', value: 'MODERATE'},
    {label: 'High', value: 'HIGH'},
  ];

  const [formValidation, setFormValidation] = useState({
    allergyName: true,
    severity: true,
    reaction: true,
  });

  const validateForm = () => {
    const updatedValidation = {
      allergyName: !!allergyName,
      severity: !!severity,
      reaction: !!reaction,
    };
    setFormValidation(updatedValidation);
    return Object.values(updatedValidation).every(Boolean);
  };

  const validateAllergyName = (value: any) => {
    setFormValidation(prev => ({ ...prev, allergyName: !!value?.trim() }));
  };
  
  const validateReaction = (value: any) => {
    setFormValidation(prev => ({ ...prev, reaction: !!value }));
  };
  
  const validateSeverity = (value: any) => {
    setFormValidation(prev => ({ ...prev, severity: !!value }));
  };
  


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const payload = {
      id: '',
      uuid: item ? item?.uuid : '',
      active: status,
      archive: false,
      allergy: allergyName,
      patient: {
        uuid: uuidForMedicalRecords ? uuidForMedicalRecords : patientId,
      },
      allergyType: allergyType?.toUpperCase(),
      reaction: reaction?.toUpperCase(),
      severity: severity?.toUpperCase(),
      onSetDate: onsetDate?.toISOString().split('T')[0],
      note: note,
      status: status,
    };

    console.log('Payload:', payload);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response : any = update
        ? await put(`allergy`, payload, {headers})
        : await post(`allergy`, payload, {headers});
        // console.log('response add allergy => ', response);
        Toast.show(response?.message,2)
        edit(true)
        navigation.goBack()
    } catch (error) {
      // console.log('error add allergy => ', error);
    }
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
          title={update ? 'Edit Allergy' : 'Add Allergy'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView style={{padding: '3%'}}>
        <Text style={styles.label}>Allergy Type</Text>
        <View style={styles.radioGroup}>
          {['Drug', 'Food', 'Environment', 'OTHER'].map(type => (
            <TouchableOpacity
              key={type}
              style={styles.radioButton}
              onPress={() => setAllergyType(type?.toUpperCase())}>
              <View
                style={[
                  styles.radioCircle,
                  allergyType === type?.toUpperCase() && {borderColor: colors.primary},
                ]}>
                {allergyType === type?.toUpperCase() && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.radioText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          label='Name'
          placeholder="Enter Allergy Name"
          value={allergyName}
          onChangeText={value => {
            setAllergyName(value);
            validateAllergyName(value);
          }}
          isValid={!formValidation.allergyName}
        />
        <DropdownComponent
          label="Reaction"
          placeholder="Select Reaction"
          data={reactionData}
          selectedValue={reaction}
          onValueChange={(value:any) => {
            setReaction(value);
            validateReaction(value);
          }}
          isValid={!formValidation.reaction}
          errorText='Please select the reaction'
     
        />
        <DropdownComponent
          label="Severity"
          placeholder="Select Severity"
          data={severityOptions}
          selectedValue={severity}
          // onValueChange={setSeverity}
          onValueChange={(value:any) => {
            setSeverity(value);
            validateSeverity(value);
          }}
          isValid={!formValidation.severity}
          errorText='Please select the severity'
          style={{marginTop:5}}
        />

        <DatePickerInput
          label="Onset Date"
          date={onsetDate}
          setDate={(date:any) => setOnsetDate(date)}
          containerStyles={{marginBottom: 10,marginTop:5}}
        />
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusGroup}>
          <TouchableOpacity
            style={[styles.statusButton, status ? styles.activeButton : null]}
            onPress={() => setStatus(true)}>
            <Text style={status ? styles.activeText : styles.buttonText}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, !status ? styles.activeButton : null]}
            onPress={() => setStatus(false)}>
            <Text style={!status ? styles.activeText : styles.buttonText}>
              Inactive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Note */}
        <Text style={styles.label}>Note</Text>
        <TextInput
          placeholder="Type here"
          value={note}
          onChangeText={setNote}
          // multiline={true}
          // numberOfLines={4}
        />
      </ScrollView>
      <Row
        style={{
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingHorizontal: '3%',
          paddingTop: 10,
        }}>
        <Button title="Cancel" outlined buttonStyle={{width: '49%'}} />
        <Button
          title={"save"}
          buttonStyle={{width: '49%'}}
          onPress={handleSubmit}
        />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: responsiveFontSize(1.7),
    marginBottom: 5,
    color: colors.grey70,
  },
  input: {},
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.grey90,
  },
  statusGroup: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: colors.grey40,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeButton: {
    borderWidth: 0,
    backgroundColor: '#007bff',
  },
  buttonText: {
    borderColor: colors.grey60,
    fontFamily: fontType.Roboto_Regular,
    textAlign: 'center',
    color: colors.grey90,
  },
  activeText: {
    color: colors.white,
    fontFamily: fontType.Roboto_Regular,
  },
});

export default AddAllergy;
