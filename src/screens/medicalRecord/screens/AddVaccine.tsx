import { useEffect, useState } from 'react';
import { post, put } from '../../../config/AxiosConfig';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import Row from '../../../components/Row/Row';
import Toast from 'react-native-simple-toast';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';
import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../../../assets/colors';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../../common/topNavigationView';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import { useRoute } from '@react-navigation/native';

const AddVaccine = ({ navigation }:any) => {

  const route = useRoute<any>();
  const { update,item, edit } = route?.params;

  const [vaccineName, setVaccineName] = useState('');
  const [administeredDate, setAdministeredDate] = useState<any>(null);
  const [expiryDate, setExpiryDate] = useState<any>(null);
  const [formValidation, setFormValidation] = useState({
    vaccineName: true,
  });
  const [dose, setDose] = useState('');
  const [note, setNote] = useState('');
   
  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  useEffect(() => {
    if (update && item) {
      setVaccineName(item?.vaccine || '');
      setExpiryDate(item?.expiryDate ? new Date(item.expiryDate) : null);
      setAdministeredDate(item?.administerDate ? new Date(item.administerDate) : null);
      setNote(item?.note)
      setDose(item?.dose)
    }
  }, [update, item]);

  const validateForm = () => {
    const updatedValidation = {
      vaccineName: !!vaccineName,
    };
    setFormValidation(updatedValidation);
    return Object.values(updatedValidation).every(Boolean);
  };

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );
  
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      id : update ? item?.id : null,
      uuid : update ? item?.uuid : null,
      type: "HISTORICAL",
      vaccine :vaccineName,
      administerDate: administeredDate !== null ? administeredDate.toISOString().split('T')[0] : null,
      expiryDate: expiryDate !== null ? expiryDate.toISOString().split('T')[0] : null,
      patient : {
        uuid: uuidForMedicalRecords ? uuidForMedicalRecords : patientId,
      },
      dose : dose,
      note : note
    };

    console.log("payload ====>", payload);

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = update
        ? await put(`vaccine/patient`, payload, { headers })
        : await post(`vaccine/patient`, payload, { headers });
      Toast.show(response?.message, 2);
      edit(true);
      navigation.goBack();
    } catch (error: any) {
      console.log('Error adding vaccine:', error);
      Toast.show(error?.message, 2);
      navigation.goBack();
    }
  };

  const goBack = () => {
    navigation.pop();
  };

  console.log('addvaccine page ==>',item)

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
          title={update ? 'Update Vaccine' :'Add Vaccine'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView>
        <View style={{ margin: '3%' }}>
          <TextInput
            placeholder="Enter Vaccine Name"
            label='Vaccine Name'
            value={vaccineName}
            onChangeText={setVaccineName}
            isValid={!formValidation.vaccineName}
            errorText="Vaccine Name is required"
            required
          />
          <DatePickerInput
            date={administeredDate}
            label='Administered Date'
            setDate={date => setAdministeredDate(date)}
            containerStyles={{ marginBottom: 10, marginTop: 5 }}
            maximumDate={new Date()}
          />
          <DatePickerInput
            label='Expiry Date'
            date={expiryDate}
            setDate={date => setExpiryDate(date)}
            containerStyles={{ marginBottom: 10, marginTop: 5 }}
            minimumDate={new Date()}
          />
           <TextInput
            placeholder="Enter dose"
            label='Dose'
            value={dose}
            onChangeText={setDose}
          />
           <TextInput
            placeholder="Enter note"
            label='Note'
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
        <Button title="Cancel" outlined buttonStyle={{ width: '49%' }} onPress={goBack} />
        <Button title={update ? "save" :"Add"} buttonStyle={{ width: '49%' }} onPress={handleSubmit} />
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
    fontSize: responsiveFontSize(1.7),
    marginBottom: 5,
    color: colors.grey70,
  },
});

export default AddVaccine;
