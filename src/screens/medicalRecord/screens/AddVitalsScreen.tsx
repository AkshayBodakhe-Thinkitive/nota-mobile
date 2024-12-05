import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../assets/colors';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import CustomDateTextField from '../../../components/CustomDateField';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import {fontType} from '../../../assets/fontType';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import TextInput from '../../../components/TextInput/TextInput';
import Row from '../../../components/Row/Row';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {
  positionData,
  bloodPressureArea,
  heighunit,
  tempUnit,
  weightUnit,
  temperatureArea,
} from '../constants/StringCostants';
import {useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {post, put} from '../../../config/AxiosConfig';
import Toast from 'react-native-simple-toast';
import {useRoute} from '@react-navigation/native';

const Title = ({children}: any) => {
  return (
    <Text
      style={{
        fontFamily: fontType.Roboto_Medium,
        fontSize: responsiveFontSize(1.7),
        color: colors.black,
        marginVertical: 12,
      }}>
      {children}
    </Text>
  );
};

const AddVitalsScreen = ({navigation}: any) => {
  const route = useRoute<any>();

  const {update, item, edit} = route?.params;

  // console.log('vital item ===> ',item)

  const goBack = () => {
    navigation.pop();
  };

  const recordedDate = new Date(item?.[0]?.recordedDate);
  const day = String(recordedDate.getDate()).padStart(2, '0');
  const month = String(recordedDate.getMonth() + 1).padStart(2, '0');
  const year = recordedDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const [date, setDate] = useState(update ? formattedDate : '');
  const [time, setTime] = useState(
    update ? new Date(item?.[0]?.recordedDate) : null,
  );
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bpposition, setBPPosition] = useState('');
  const [bparea, setBPArea] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [bmi, setBmi] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('');
  const [temperature, setTemperature] = useState('');
  const [tempUnitValue, setTempUnitValue] = useState('');
  const [tempArea, setTempArea] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnitValue, setWeightUnitValue] = useState('');
  const [note, setNote] = useState('');

  const [formValidation, setFormValidation] = useState({
    date: true,
    time: true,
    systolic: true,
    diastolic: true,
  });

  const validateForm = () => {
    const updatedValidation = {
      date: !!date,
      time: !!time,
      systolic: !!systolic,
      diastolic: !!diastolic,
    };
    setFormValidation(updatedValidation);
    return Object.values(updatedValidation).every(Boolean);
  };

  const validateDate = (value: any) => {
    setFormValidation(prev => ({...prev, date: !!value}));
  };

  const validateTime = (value: any) => {
    setFormValidation(prev => ({...prev, time: !!value}));
  };

  const validateSystolic = (value: any) => {
    setFormValidation(prev => ({...prev, systolic: !!value}));
  };

  const validateDiastolic = (value: any) => {
    setFormValidation(prev => ({...prev, diastolic: !!value}));
  };

  useEffect(() => {
    if (update && item) {
      item.forEach((vital: any) => {
        switch (vital.name) {
          case 'BLOOD_PRESSURE':
            setSystolic(vital.value1);
            setDiastolic(vital.value2);
            setBPArea(vital.area);
            setBPPosition(vital.position);
            break;
          case 'HEART_RATE':
            setHeartRate(vital.value1);
            break;
          case 'RESPIRATION_RATE':
            setRespiratoryRate(vital.value1);
            break;
          case 'OXYGEN_SATURATION':
            setOxygenSaturation(vital.value1);
            break;
          case 'BMI':
            setBmi(vital.value1);
            break;
          case 'HEIGHT':
            setHeight(vital.value1);
            setHeightUnit(vital.unit);
            break;
          case 'TEMPERATURE':
            setTemperature(vital.value1);
            setTempUnitValue(vital.unit);
            setTempArea(vital.area);
            break;
          case 'WEIGHT':
            setWeight(vital.value1);
            setWeightUnitValue(vital.unit);
            break;
          default:
            break;
        }

        if (vital.vitalNote) {
          setNote(vital.vitalNote);
        }
      });
    }
  }, [update, item]);

  const combineDateAndTime = (dateStr: any, timeStr: any) => {
    const [month, day, year] = dateStr.split('/');
    const formattedDate = `${year}-${day.padStart(2, '0')}-${month.padStart(
      2,
      '0',
    )}`;
    const timePart = new Date(timeStr).toISOString().split('T')[1];

    const combinedDateTime = `${formattedDate}T${timePart}`;

    return combinedDateTime;
  };

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  const createPayload = () => {
    const getVitalUUID = (name: any) => {
      const matchedVital = item?.find((vital: any) => vital.name === name);
      return matchedVital ? matchedVital.uuid : '';
    };

    return {
      patient: {
        uuid: uuidForMedicalRecords ? uuidForMedicalRecords : patientId,
      },
      note: note,
      recordedDate: combineDateAndTime(date, time),
      patientVitals: [
        {
          name: 'BLOOD_PRESSURE',
          uuid: getVitalUUID('BLOOD_PRESSURE'),
          value1: systolic,
          value2: diastolic,
          unit: 'mmHg',
          area: bparea,
          position: bpposition,
        },
        {
          name: 'HEART_RATE',
          uuid: getVitalUUID('HEART_RATE'),
          value1: heartRate,
          unit: 'BPM',
        },
        {
          name: 'RESPIRATION_RATE',
          uuid: getVitalUUID('RESPIRATION_RATE'),
          value1: respiratoryRate,
          unit: 'BPM',
        },
        {
          name: 'OXYGEN_SATURATION',
          uuid: getVitalUUID('OXYGEN_SATURATION'),
          value1: oxygenSaturation,
          unit: '%',
        },
        {
          name: 'BMI',
          uuid: getVitalUUID('BMI'),
          value1: bmi,
        },
        {
          name: 'HEIGHT',
          uuid: getVitalUUID('HEIGHT'),
          value1: height,
          unit: heightUnit,
        },
        {
          name: 'TEMPERATURE',
          uuid: getVitalUUID('TEMPERATURE'),
          value1: temperature,
          unit: tempUnitValue,
          area: tempArea,
        },
        {
          name: 'WEIGHT',
          uuid: getVitalUUID('WEIGHT'),
          value1: weight,
          unit: weightUnitValue,
        },
      ],
    };
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    } else {
      // console.log('payload => ', createPayload());
      const payload = createPayload();

      console.log(' payload before api call  ', payload);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response: any = update
          ? await put(`vital/patient`, payload, {headers})
          : await post(`vital/patient`, payload, {headers});
        console.log('response add vital => ', response);
        Toast.show(response?.message, 2);
        edit && edit(true);
        navigation.goBack();
      } catch (error) {
        console.log('error add vital => ', error);
      }
    }
  };

  const ErrorText = ({children}: any) => {
    return (
      <Text
        style={{
          fontFamily: fontType.Roboto_Regular,
          fontSize: responsiveFontSize(1.3),
          color: colors.red,
          marginTop: 5,
        }}>
        {children}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
          title="Add Vitals"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView style={styles.page}>
        <Row
          style={{
            justifyContent: 'space-between',
            borderWidth: 0,
            alignItems: 'flex-start',
          }}>
          <View style={{width: '49%', borderWidth: 0}}>
            <CustomDateTextField
              title={'Date'}
              date={date}
              onChange={(dateStr: any) => {
                setDate(dateStr);
              }}
              canSelectFutureDate={false}
              onChangeError={message => {}}
              errorMessage={
                !formValidation?.date ? 'Recorded date is required!' : ''
              }
            />
          </View>
          <View style={{width: '49%', borderWidth: 0}}>
            <DatePickerInput
              label="Time"
              date={time}
              mode="time"
              setDate={date => {
                setTime(date);
                validateTime(date);
              }}
              containerStyles={{width: '100%'}}
            />
            {!formValidation.time && (
              <ErrorText>Vital time is required!</ErrorText>
            )}
          </View>
        </Row>

        <Title>Blood Pressure (mmhg)</Title>
        <Row
          style={[
            {justifyContent: 'space-between'},
            (!formValidation.systolic || !formValidation.diastolic) && {
              marginBottom: 10,
            },
          ]}>
          <TextInput
            label="Systolic"
            value={systolic}
            placeholder="Enter"
            style={{width: '49%'}}
            onChangeText={value => {
              setSystolic(value);
              validateSystolic(value);
            }}
            isValid={!formValidation.systolic}
            onBlur={validateForm}
            errorText="Systolic is required!"
          />
          <TextInput
            label="Diastolic"
            value={diastolic}
            placeholder="Enter"
            onChangeText={value => {
              setDiastolic(value);
              validateDiastolic(value);
            }}
            style={{width: '49%'}}
            isValid={!formValidation.diastolic}
            onBlur={validateForm}
            errorText="Diastolic is required"
          />
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          <DropdownComponent
            data={positionData}
            selectedValue={bpposition}
            placeholder="Select Position"
            onValueChange={(value: any) => setBPPosition(value)}
            style={{width: '49%'}}
          />
          <DropdownComponent
            data={bloodPressureArea}
            selectedValue={bparea}
            placeholder="Select Area"
            onValueChange={(value: any) => setBPArea(value)}
            style={{width: '49%'}}
          />
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          <TextInput
            label="Heart Rate (BPM)"
            placeholder="Enter"
            value={heartRate}
            onChangeText={setHeartRate}
            style={{width: '49%'}}
          />
          <TextInput
            label="Respiratory Rate (BPM)"
            value={respiratoryRate}
            placeholder="Enter"
            onChangeText={setRespiratoryRate}
            style={{width: '49%'}}
          />
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          <TextInput
            label="Oxygen Saturation (%)"
            value={oxygenSaturation}
            placeholder="Enter"
            onChangeText={setOxygenSaturation}
            style={{width: '49%'}}
          />
          <TextInput
            label="Body Mass Index"
            placeholder="Enter"
            value={bmi}
            onChangeText={setBmi}
            style={{width: '49%'}}
          />
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          <TextInput
            label="Height"
            placeholder="Enter"
            value={height}
            onChangeText={setHeight}
            style={{width: '49%'}}
          />
          <DropdownComponent
            data={heighunit}
            selectedValue={heightUnit}
            label="Unit"
            placeholder="Select Unit"
            onValueChange={setHeightUnit}
            style={{width: '49%'}}
          />
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          <TextInput
            label="Temparature"
            value={temperature}
            placeholder="Enter"
            onChangeText={setTemperature}
            style={{width: '49%'}}
          />
          <DropdownComponent
            data={tempUnit}
            selectedValue={tempUnitValue}
            label="Degree"
            placeholder="Select Unit"
            onValueChange={setTempUnitValue}
            style={{width: '49%'}}
          />
        </Row>
        <DropdownComponent
          data={temperatureArea}
          selectedValue={tempArea}
          label="Area"
          placeholder="Select Area"
          onValueChange={setTempArea}
          style={{width: '49%'}}
        />
        <Row style={{justifyContent: 'space-between'}}>
          <TextInput
            label="Weight"
            placeholder="Enter"
            value={weight}
            onChangeText={setWeight}
            style={{width: '49%'}}
          />
          <DropdownComponent
            data={weightUnit}
            selectedValue={weightUnitValue}
            label="Unit"
            placeholder="Select Unit"
            onValueChange={setWeightUnitValue}
            style={{width: '49%'}}
          />
        </Row>
        <TextInput
          value={note}
          label="Note"
          placeholder="Enter"
          onChangeText={setNote}
        />
      </ScrollView>
      <Row
        style={{
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingHorizontal: '3%',
          paddingTop: 10,
        }}>
        <Button
          title="Cancel"
          outlined
          buttonStyle={{width: '49%'}}
          onPress={() => navigation.goBack()}
        />
        <Button
          title={update ? 'Save' : 'Add'}
          buttonStyle={{width: '49%'}}
          onPress={handleSubmit}
        />
      </Row>
    </View>
  );
};

export default AddVitalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  page: {
    padding: '3%',
    flex: 1,
    paddingBottom: 100,
  },
});
