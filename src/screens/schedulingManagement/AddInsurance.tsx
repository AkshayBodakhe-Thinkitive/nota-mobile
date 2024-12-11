import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {colors} from '../../assets/colors';
import {ScrollView} from 'react-native';
import Row from '../../components/Row/Row';
import {FeatherIcon} from '../../components/Icons/FeatherIcon';
import {pickAndUploadImage} from '../../utils/documentPicker';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import DropdownComponent from '../../components/Dropdown/DropDown';
import TextInput from '../../components/TextInput/TextInput';
import DatePickerInput from '../../components/DatePicker/DatePickerInput';
import {get, post, put} from '../../config/AxiosConfig';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import Button from '../../components/ButtonComponent/ButtonComponent';
import Loader from '../../components/Loader/Loader';
import {getInsuranceAction} from '../../redux/reducers/home/aysnc-actions/getInsuranceAction';
import {
  mapInsuranceDataToEdit,
  mapInsuranceDataToFormData,
} from './constants/insuranceUtils';
import {
  genderData,
  insuranceTypes,
  relationships,
} from './constants/StringConstants';
import {updateInsuranceAction} from '../../redux/reducers/home/aysnc-actions/updateInsuranceAction';
import {addInsuranceAction} from '../../redux/reducers/home/aysnc-actions/addInsuranceAction';

const AddInsurance = ({navigation, route}: any) => {
  const goBack = () => {
    navigation.pop();
  };

  const dispatch = useAppDispatch();

  const {insuranceFormData, edit, insuranceUuid, insuranceData} =
    route?.params || {};

  console.log('insuranceData on edit screen', insuranceData);

  const [formData, setFormData] = useState<any>({
    insuranceType: '',
    insurancePayer: '',
    memberId: '',
    planName: '',
    groupId: '',
    groupName: '',
    planType: '',
    expiryDate: '',
    payerContactNumber: '',
    payerFaxNumber: '',
    relationship: null,
    firstName: '',
    lastName: '',
    dob: '',
    gender: null,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    frontPhoto: null,
    backPhoto: null,
  });

  const [payer, setPayer] = useState('');

  useEffect(() => {
    if (insuranceFormData) {
      setPayer(insuranceFormData?.insurancePayer?.payerName);
      setFormData(insuranceFormData);
    }
  }, [insuranceFormData]);

  const [result1, setResult1] = useState<any>('');
  const [result2, setResult2] = useState<any>('');

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (side: any) => {
    const result = await pickAndUploadImage();
    if (result) {
      const cleanBase64String = result.base64WithMimeType.replace(
        /^data:image\/[a-z]+;base64,/,
        '',
      );
      if (side === 'frontPhoto') {
        setResult1(result);
      } else if (side === 'backPhoto') {
        setResult2(result);
      }
      handleInputChange(side, cleanBase64String);
    }
  };

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const [insurancePayers, setInsurancePayers] = useState([]);

  useEffect(() => {
    const fetchInsurancePayers = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${loginData?.data?.accessToken}`,
      };
      try {
        const response: any = await get('/insurance/payers?page=0&size=10000', {
          headers,
        });
        const data = await response?.data?.content;
        const formattedData = data.map((item: any) => ({
          label: item.payerName,
          value: item?.payerName,
          id: item,
        }));
        setInsurancePayers(formattedData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching insurance payers:', error);
        setLoading(false);
      }
    };

    // fetchInsurancePayers();
  }, []);

  const patientUuid = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const validateField = (name: string, value: any) => {
    let errorMessage = '';

    switch (name) {
      case 'insuranceType':
      case 'insurancePayer':
      case 'frontPhoto':
      case 'backPhoto':
      case 'gender':
      case 'relationship':
      // case 'payerContactNumber':
      case 'memberId':
      case 'groupName':
        if (!value) {
          errorMessage = `${name.replace(/([A-Z])/g, ' $1')} is required`;
        }
        break;
      case 'payerContactNumber':
        if (!value) {
          errorMessage = 'Payer Contact Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          errorMessage = 'Payer Contact Number must be 10 digits';
        }
        break;
      // Add more field-specific validation logic here if needed
    }

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors: any = {};

    // Validate all fields
    const validationRules: {[key: string]: string} = {
      insuranceType: 'Insurance Type is required',
      insurancePayer: 'Insurance Payer is required',
      frontPhoto: 'Front Photo is required',
      backPhoto: 'Back Photo is required',
      gender: 'Gender is required',
      relationship: 'Relationship is required',
      payerContactNumber: 'Payer Contact Number is required',
      memberId: 'Member ID is required',
      groupName: 'Group Name is required',
    };

    for (const [field, errorMessage] of Object.entries(validationRules)) {
      if (!formData[field]) {
        newErrors[field] = errorMessage;
        hasErrors = true;
      }
    }

    if (formData.payerContactNumber && !/^\d{10}$/.test(formData.payerContactNumber)) {
      newErrors.payerContactNumber = 'Payer Contact Number must be 10 digits';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleInputChange = (name: any, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    setTouched((prevTouched: any) => ({
      ...prevTouched,
      [name]: true,
    }));

    // Validate field
    validateField(name, value);
  };

  const handleSubmit = async () => {
    const payload = mapInsuranceDataToFormData(formData);
    console.log('payload =>',payload)
    const isValid = validateForm();

    if (!isValid) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    if (edit) {
      try {
        setLoading(true);
        const editPayload = mapInsuranceDataToEdit(formData, insuranceData);
        const response: any = await dispatch(
          updateInsuranceAction({insuranceUuid, payload: editPayload}),
        ).unwrap();
        setLoading(false);
        dispatch(getInsuranceAction());
        navigation.navigate('CurrentInsuranceSc');
      } catch (error: any) {
        setLoading(false);
        console.log('error update insurance =>', error);
        Alert.alert('Error', error?.message || 'Something went wrong.');
      }
    } else {
      try {
        const payload = mapInsuranceDataToFormData(formData);
        setLoading(true);
        await dispatch(addInsuranceAction(payload)).unwrap();
        setLoading(false);
        navigation.goBack();
        dispatch(getInsuranceAction());
      } catch (error: any) {
        setLoading(false);
        console.log('error add insurance =>', error);
        Alert.alert('Error', error?.message || 'Something went wrong.');
      }
    }
  };

  return (
    <View style={styles.insuranceContainer}>
      <HeaderBg height={'16%'}>
        <TopNavigationView
          title={edit ? 'Insurance' : 'Add Insurance'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <ScrollView style={styles.scrollView}>
        <DropdownComponent
          data={insuranceTypes}
          label="Insurance Type"
          placeholder="Select"
          selectedValue={formData.insuranceType}
          onValueChange={(value: any) =>
            handleInputChange('insuranceType', value)
          }
          style={styles.input}
          dropDownStyles={{height: responsiveHeight(5.5)}}
          required
        />
        {errors.insuranceType ? (
          <Text style={styles.errorText}>{errors.insuranceType}</Text>
        ) : null}
        <TextInput
          label="Insurance Payer"
          placeholder="Select"
          value={formData.insurancePayer}
          // selectedValue={payer !== '' ? payer : formData.insurancePayer}
          onChangeText={(text: any) => {
            handleInputChange('insurancePayer', text);
          }}
          style={styles.input}
          required
        />
        {errors.insurancePayer ? (
          <Text style={styles.errorText}>{errors.insurancePayer}</Text>
        ) : null}

        <TextInput
          label="Member ID"
          placeholder="Enter Member ID"
          value={formData.memberId}
          onChangeText={text => handleInputChange('memberId', text)}
          style={styles.input}
          required
        />
        {errors.memberId ? (
          <Text style={styles.errorText}>{errors.memberId}</Text>
        ) : null}
        <TextInput
          label="Plan Name"
          placeholder="Enter Plan Name"
          value={formData.planName}
          onChangeText={text => handleInputChange('planName', text)}
          style={styles.input}
        />
        <TextInput
          label="Group ID"
          placeholder="Enter Group ID"
          value={formData.groupId}
          onChangeText={text => handleInputChange('groupId', text)}
          style={styles.input}
          editable={edit}
        />
        <TextInput
          label="Group Name"
          placeholder="Enter Group Name"
          value={formData.groupName}
          onChangeText={text => handleInputChange('groupName', text)}
          style={styles.input}
          required
        />
        {errors.groupName ? (
          <Text style={styles.errorText}>{errors.groupName}</Text>
        ) : null}
        <TextInput
          label="Plan Type"
          placeholder="Enter Plan Type"
          value={formData.planType}
          onChangeText={text => handleInputChange('planType', text)}
          style={styles.input}
        />
        <DatePickerInput
          label="Expiry Date"
          date={formData.expiryDate ? new Date(formData.expiryDate) : null}
          mode="date"
          minimumDate={new Date()}
          setDate={selectedDate =>
            handleInputChange(
              'expiryDate',
              new Date(selectedDate).toISOString(),
            )
          }
          containerStyles={styles.dateInput}
        />
        <TextInput
          label="Payer Contact Number"
          placeholder="Enter Payer Contact Number"
          value={formData.payerContactNumber}
          onChangeText={text => handleInputChange('payerContactNumber', text)}
          style={styles.input}
          editable={edit}
          required
        />
        {errors.payerContactNumber ? (
          <Text style={styles.errorText}>{errors.payerContactNumber}</Text>
        ) : null}
        <TextInput
          label="Payer Fax Number"
          placeholder="Enter Payer Fax Number"
          value={formData.payerFaxNumber}
          onChangeText={text => handleInputChange('payerFaxNumber', text)}
          style={styles.input}
        />
        <DropdownComponent
          data={relationships}
          label="Relationship With Policy Holder"
          placeholder="Select"
          selectedValue={formData.relationship}
          onValueChange={(value: any) =>
            handleInputChange('relationship', value)
          }
          style={styles.input}
          dropDownStyles={{height: responsiveHeight(5.5)}}
          required
        />
        {errors.relationship ? (
          <Text style={styles.errorText}>{errors.relationship}</Text>
        ) : null}
        <TextInput
          label="First Name"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChangeText={text => handleInputChange('firstName', text)}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChangeText={text => handleInputChange('lastName', text)}
          style={styles.input}
        />
        <DatePickerInput
          label="DOB"
          date={formData.dob !== '' && new Date(formData.dob)}
          mode="date"
          setDate={selectedDate =>
            handleInputChange('dob', new Date(selectedDate).toISOString())
          }
          maximumDate={new Date()}
          containerStyles={styles.dateInput}
        />
        <DropdownComponent
          data={genderData}
          label="Gender"
          placeholder="Select"
          selectedValue={formData.gender}
          onValueChange={(value: any) => handleInputChange('gender', value)}
          style={styles.input}
          dropDownStyles={{height: responsiveHeight(5.5)}}
          required
        />
        {errors.gender ? (
          <Text style={styles.errorText}>{errors.gender}</Text>
        ) : null}
        <TextInput
          label="Address"
          placeholder="Enter Address"
          value={formData.addressLine1}
          onChangeText={text => handleInputChange('addressLine1', text)}
          style={styles.input}
        />
        <TextInput
          label="City"
          placeholder="Enter City"
          value={formData.city}
          onChangeText={text => handleInputChange('city', text)}
          style={styles.input}
        />
        <TextInput
          label="State"
          placeholder="Enter State"
          value={formData.state}
          onChangeText={text => handleInputChange('state', text)}
          style={styles.input}
        />
        <TextInput
          label="Country"
          placeholder="Enter Country"
          value={formData.country}
          onChangeText={text => handleInputChange('country', text)}
          style={styles.input}
        />
        <TextInput
          label="Zip"
          placeholder="Enter Zip"
          value={formData.zip}
          onChangeText={text => handleInputChange('zip', text)}
          style={styles.input}
        />
        <>
          <Text style={styles.label}>Upload Insurance Card Front Side</Text>
          <TouchableOpacity
            onPress={() => handleImageUpload('frontPhoto')}
            style={styles.uploadDocCard}>
            <Row style={{width: '90%', justifyContent: 'center'}}>
              <FeatherIcon name="upload" size={responsiveFontSize(4)} />
              <Text style={{fontSize: responsiveFontSize(1.5)}}>
                {formData.frontPhoto
                  ? result1.fileName
                  : ' Press here to upload Front Side'}
              </Text>
            </Row>
          </TouchableOpacity>
          {errors.frontPhoto ? (
            <Text style={[styles.errorText, {marginTop: 5}]}>
              {errors.frontPhoto}
            </Text>
          ) : null}

          <Text style={styles.label}>Upload Insurance Card Back Side</Text>
          <TouchableOpacity
            onPress={() => handleImageUpload('backPhoto')}
            style={styles.uploadDocCard}>
            <Row style={{width: '90%', justifyContent: 'center'}}>
              <FeatherIcon name="upload" size={responsiveFontSize(4)} />
              <Text style={{fontSize: responsiveFontSize(1.5)}}>
                {formData.backPhoto
                  ? result2.fileName
                  : ' Press here to upload Back Side'}
              </Text>
            </Row>
          </TouchableOpacity>
          {errors.backPhoto ? (
            <Text style={[styles.errorText, {marginTop: 5}]}>
              {errors.backPhoto}
            </Text>
          ) : null}
        </>

        <Button
          onPress={handleSubmit}
          buttonStyle={styles.button}
          title={edit ? 'Save' : 'Add'}
        />
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default AddInsurance;

const styles = StyleSheet.create({
  insuranceContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 8,
  },
  input: {
    marginHorizontal: 6,
    width: '96%',
  },
  label: {
    marginVertical: 10,
    marginLeft: 5,
    color: colors.black,
  },
  dateInput: {
    marginBottom: '4%',
    marginHorizontal: 6,
    width: '96%',
  },
  uploadDocCard: {
    height: responsiveHeight(8),
    backgroundColor: '#0097F01A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 0.5,
    width: '96%',
    borderColor: colors.primary,
    flexDirection: 'row',
  },
  button: {
    marginTop: 16,
    marginBottom: 50,
  },
  cardImageStyles: {
    height: responsiveHeight(21),
    width: '80%',
    marginVertical: 6,
    borderRadius: 8,
    marginLeft: '5%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
    marginLeft: 5,
    marginTop: -7,
    marginBottom: 10,
  },
});
