import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput as RnTextInput,
} from 'react-native';
import moment from 'moment';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import TextInput from '../../../components/TextInput/TextInput';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {ScrollView} from 'react-native';
import Row from '../../../components/Row/Row';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {medsResponse} from '../constants/StringCostants';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {get, post, put} from '../../../config/AxiosConfig';
import Toast from 'react-native-simple-toast';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import { getCurrentMedicationsAction } from '../../../redux/reducers/medicalrecord/aysnc-action/getCurrentMedicationsAction';

const AddMedication = () => {
  const route = useRoute<any>();
  const {update, item, edit} = route?.params;

  const navigation = useNavigation<any>();

  // console.log('item =======>', item);

  const [medicineName, setMedicineName] = useState(
    update ? item?.drugCatalog : '',
  );
  const [sig, setSig] = useState(update ? item?.sig : '');
  const [dosageWhen, setDosageWhen] = useState(
    update ? item?.dosageWhen : null,
  );
  const [dosageUnit, setDosageUnit] = useState(
    update ? item?.dosageUnit : null,
  );
  const [dosageTime, setDosageTime] = useState(
    update ? item?.dosageTime : null,
  );
  const [duration, setDuration] = useState(update ? item?.duration : '');
  const [startDate, setStartDate] = useState(
    update ? new Date(item?.startDate) : null,
  );
  const [endDate, setEndDate] = useState(
    update ? new Date(item?.endDate) : null,
  );
  const [note, setNote] = useState(update ? item?.note : '');
  const [medicines, setMedicines] = useState<any>([]);

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  const [medicineDetail, setMedicineDetail] = useState(
    update
      ? {
          id: item?.drugCatalog?.id,
          type: item?.drugCatalog?.type,
          medicine: item?.drugCatalog?.medicine,
        }
      : '',
  );

  const [formValidation, setFormValidation] = useState({
    medicineName: true,
    startDate: true,
  });

  const validateForm = () => {
    const updatedValidation = {
      medicineName: !!medicineName,
      startDate: !!startDate,
    };
    setFormValidation(updatedValidation);
    return Object.values(updatedValidation).every(Boolean);
  };

  const validateMedicineName = (value: any) => {
    console.log('value ==>', value);
    setFormValidation(prev => ({
      ...prev,
      medicineName: !!value?.trim(),
    }));
  };

  const validateStartDate = (value: any) => {
    setFormValidation(prev => ({...prev, startDate: !!value}));
  };

  const dosageWhenOptions = [
    {label: 'Before Meal', value: 'BEFORE_MEAL'},
    {label: 'After Meal', value: 'AFTER_MEAL'},
    {label: 'Afternoon Meal', value: 'AFTERNOON_MEAL'},
    {label: 'In the morning', value: 'IN_THE_MORNING'},
  ];

  const dosageUnitOptions = [
    {label: 'Mg', value: 'MG'},
    {label: 'Tablet', value: 'TABLET'},
  ];

  const dosageTimeOptions = [
    {label: 'Every day', value: 'EVERY_DAY'},
    {label: 'Twice a day', value: 'TWICE_A_DAY'},
  ];

  useEffect(() => {
    // const response =  medsResponse;
    const getMedicines = async () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await get(
        `drug-catalog/all?page=0&size=1000&sortBy=created&sortDirection=desc&searchString`,
        {headers},
      );
      console.log('response ===>', response);
      const dataArray = response?.data?.content;
      const medicines = dataArray?.map((item: any) => {
        return {
          label: ` ${item?.medicine} (${item?.type})`,
          value: item?.id,
          id: {
            id: item?.id,
            medicine: item?.medicine,
            type: item?.type,
          },
        };
      });
      setMedicines(medicines);
    };
    getMedicines();
  }, []);

  const goBack = () => {
    navigation.pop();
  };

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  const dispatch = useAppDispatch();

  const getMedication = async () => {
    let UUID = patientId;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
     await dispatch(
        getCurrentMedicationsAction({
          patientUUID: UUID,
          page: '0',
        }),
      );
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const payload = {
      id: '',
      uuid: item ? item?.uuid : '',
      drugCatalog: medicineName,
      patient: {
        uuid: uuidForMedicalRecords ? uuidForMedicalRecords : patientId,
      },
      sig,
      dosageWhen,
      dosageUnit,
      dosageTime,
      duration,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      note,
    };

    console.log('Payload addmedication ==>', payload);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response: any = update
        ? await put('medications/patient/medication', payload, {headers})
        : await post('medications/patient/medication', payload, {headers});
      console.log('response addmedication => ', response);
      Toast.show(response?.message, 2);
      await getMedication()
      navigation.goBack();
      edit(true);
    } catch (error) {
      console.log('error addmedication => ', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
          title={update ? 'Edit Medication' : 'Add Medication'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView>
        {/* <DropdownComponent
          data={medicines}
          label="Medicines"
          placeholder="Select Medicine"
          selectedValue={medicineName}
          onValueChange={(value: any, id: any) => {
            setMedicineName(value);
            setMedicineDetail(id);
            validateMedicineName(id);
          }}
          isValid={!formValidation.medicineName}
          errorText="Please select the medicine name"
        /> */}
        <View style={{margin: '3%'}}>
         <TextInput
           label="Medicine"
          style={styles.input}
          placeholder="Enter Medicine"
          value={medicineName}
          onChangeText={(value: any) => {
            setMedicineName(value);
            // setMedicineDetail(id);
            validateMedicineName(value);
          }}
          isValid={!formValidation.medicineName}
          errorText="Please Enter the medicine name"
          containerStyles={{height: responsiveHeight(4.5)}}
        />
        <TextInput
          style={styles.input}
          label="Sig"
          placeholder="Enter Sig"
          value={sig}
          onChangeText={setSig}
          containerStyles={{height: responsiveHeight(4.5)}}
        />
        <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
          <DropdownComponent
            label="Dosage When"
            data={dosageWhenOptions}
            placeholder="Select An Option"
            selectedValue={dosageWhen}
            onValueChange={setDosageWhen}
            style={{width: '49%'}}
          />

          <DropdownComponent
            label="Dosage Unit"
            data={dosageUnitOptions}
            placeholder="Select An Option"
            selectedValue={dosageUnit}
            onValueChange={setDosageUnit}
            style={{width: '49%'}}
          />
        </Row>

        <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
          <DropdownComponent
            label="Dosage Time"
            data={dosageTimeOptions}
            placeholder="Select An Option"
            selectedValue={dosageTime}
            onValueChange={setDosageTime}
            style={{width: '49%'}}
          />
          <TextInput
            label="Duration"
            style={[styles.input, {width: '49%'}]}
            placeholder="Enter"
            value={duration}
            onChangeText={setDuration}
            containerStyles={{height: responsiveHeight(4.5)}}
          />
        </Row>

        <Row style={{marginBottom: 20, justifyContent: 'space-between'}}>
          <DatePickerInput
            label="Start Date"
            date={startDate}
            mode="date"
            setDate={(date: any) => {
              setStartDate(date);
              validateStartDate(date);
            }}
            containerStyles={{width: '49%'}}
            isValid={!formValidation.startDate}
            errorText="Please select start date"
          />

          <DatePickerInput
            label="End Date"
            date={endDate}
            mode="date"
            setDate={(date: any) => setEndDate(date)}
            containerStyles={{width: '49%'}}
          />
        </Row>

        <Text style={styles.label}>Note</Text>
        <TextInput
          placeholder="Type here"
          value={note}
          onChangeText={setNote}
        />
         </View>
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
          title={update ? 'Update' : 'Add'}
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default AddMedication;
