import {useEffect, useState} from 'react';
import {get, post, put} from '../../../config/AxiosConfig'; // Assuming the post function is already set up in AxiosConfig
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import Row from '../../../components/Row/Row';
import Toast from 'react-native-simple-toast';
import {useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import { useRoute } from '@react-navigation/native';

const AddDiagnosis = ({navigation}: any) => {

    const route = useRoute<any>();

    const {update, item, edit} = route?.params;  

    console.log("item ==>",item)

  const [diagnosesData, setDiagnosesData] = useState([]);
  const [diagnosisName, setDiagnosisName] = useState('');
  const [status, setStatus] = useState(true);
  const [type, setType] = useState('CHRONIC');
  const [onsetDate, setOnsetDate] = useState<any>(null);
  const [note, setNote] = useState('');
  const [formValidation, setFormValidation] = useState({
    diagnosisName: true,
  });

  useEffect(() => {
    if (update && item) {
      setDiagnosisName(item?.billingCodes || '');
      setStatus(item?.active);
      setType(item?.type || 'CHRONIC');
      setOnsetDate(item?.diagnosedDate ? new Date(item.diagnosedDate) : null);
      setNote(item?.note || '');
    }
  }, [update, item]);

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  const data = useAppSelector(
    (state: RootState) => state?.profile.profileData?.data,
  );

  console.log("data====>",data)

  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const fetchDiagnosesData = async () => {
      try {
        const response: any = await get(
            // 'medical-code/ICD?page=0&size=20&sortBy=&sortDirection=&ProviderGroupUuid=d4c1dc67-937f-4b3c-8973-324eab723cbb&searchString=',
          'medical-code/ICD?page=0&size=20&sortBy=&sortDirection=&searchString=',
          {headers},
        );
        const diagnosesDropdownData = response.data.content.map(
          (item: any) => ({
            label: `${item?.code} ${item?.description}`,
            value: item?.uuid,
          }),
        );
        setDiagnosesData(diagnosesDropdownData);
      } catch (error) {
        console.log('Failed to fetch diagnoses data:', error);
      }
    };

    // fetchDiagnosesData();
  }, []);

  const validateForm = () => {
    const updatedValidation = {
      diagnosisName: !!diagnosisName,
    };
    setFormValidation(updatedValidation);
    return Object.values(updatedValidation).every(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    const payload = {
      active: status,
      archive: false,
      id: '',
      uuid: item ? item?.uuid : '',
      billingCodes: diagnosisName,
      patient: {
        uuid: uuidForMedicalRecords ? uuidForMedicalRecords : patientId,
      },
      type,
      diagnosedDate: onsetDate !== null ?  onsetDate.toISOString().split('T')[0] : null,
      note,
    };

    console.log("payload ====>" , payload)
  
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
      const response : any = update
      ? await put(`problems/patient`, payload, {headers})
      : await post(`problems/patient`, payload, {headers});
      Toast.show(response?.message, 2);
      edit(true)
      navigation.goBack();
    } catch (error:any) {
      console.error('Error adding diagnosis:', error);
      Toast.show(error?.message, 2);
      navigation.goBack();
    }
  };
  

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
            title={update ? 'Edit Diagnoses' : 'Add Diagnoses'}
          // title={'Add Diagnoses'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView>
      <View style={{margin:'3%'}}>
        {/* <DropdownComponent
          label="Select Diagnoses"
          placeholder="Select Diagnoses"
          data={diagnosesData}
          selectedValue={diagnosisName}
          onValueChange={(value: any) => {
            setDiagnosisName(value);
            setFormValidation(prev => ({...prev, diagnosisName: !!value}));
          }}
          isValid={!formValidation.diagnosisName}
          errorText="billingCodes cannot be null"
          required
        /> */}
        <TextInput
        label='Diagnosis'
        placeholder='Enter Diagnosis'
        value={diagnosisName}
        onChangeText={(value: any) => {
          setDiagnosisName(value);
          setFormValidation(prev => ({...prev, diagnosisName: !!value}));
        }}
        isValid={!formValidation.diagnosisName}
        errorText="Diagnosis cannot be empty"
        required
        />

        {/* Status */}
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
              Historical
            </Text>
          </TouchableOpacity>
        </View>

        {/* Type */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.statusGroup}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              type === 'CHRONIC' ? styles.activeButton : null,
            ]}
            onPress={() => setType('CHRONIC')}>
            <Text
              style={
                type === 'CHRONIC' ? styles.activeText : styles.buttonText
              }>
              Chronic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              type === 'ACUTE' ? styles.activeButton : null,
            ]}
            onPress={() => setType('ACUTE')}>
            <Text
              style={type === 'ACUTE' ? styles.activeText : styles.buttonText}>
              Acute
            </Text>
          </TouchableOpacity>
        </View>

        {/* Onset Date */}
        <DatePickerInput
          label="Onset Date"
          date={onsetDate}
          setDate={date => setOnsetDate(date)}
          containerStyles={{marginBottom: 10, marginTop: 5}}
          maximumDate={new Date()}
        />

        {/* Note */}
        <Text style={styles.label}>Note</Text>
        <TextInput
          placeholder="Type here"
          value={note}
          onChangeText={setNote}
          // multiline={true}
          // numberOfLines={4}
        />
        </View>
      </ScrollView>

      {/* Buttons */}
      <Row
        style={{
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingHorizontal: '3%',
          paddingTop: 10,
        }}>
        <Button title="Cancel" outlined buttonStyle={{width: '49%'}} />
        <Button
          title={update ? "save" :"Add"}
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

export default AddDiagnosis;
