import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {resetAuth} from '../../../redux/reducers/auth/AuthReducer';
import {signUpAction} from '../../../redux/reducers/auth/async-actions/signUpAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {OnboardingTopView} from '../components/OnboardingTopView';
import PhoneWithCountryCode from '../../../components/phonewithcountrycode/PhoneWithCountryCode';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import DropdownComponent from '../../../components/Dropdown/DropDown';

interface FormErrors {
  [key: string]: string;
}

const SignUpSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const signUpData = useAppSelector((state: RootState) => state.auth.signUpData);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    line1: '',
    line2: '',
    city: '',
    stateName: '',
    country: '',
    dateOfBirth: '',
    gender: '',
  });

  const [countryCode, setCountryCode] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePhoneChange = (newCountryCode: string, newPhoneNumber: string) => {
    setCountryCode(newCountryCode);
    // Only allow numbers and limit to 10 digits
    const sanitizedNumber = newPhoneNumber.replace(/[^0-9]/g, '').slice(0, 10);
    setFormData(prev => ({...prev, phone: sanitizedNumber}));
    const error = validateField('phone', sanitizedNumber);
    setErrors(prev => ({...prev, phone: error}));
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (!value) {
          error = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.trim() !== value) {
          error = `${fieldName === 'firstName' ? 'First' : 'Last'} name should not contain leading or trailing space`;
        }
        break;

      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Invalid email address';
        }
        break;

      case 'phone':
        if (!value) {
          error = 'Phone is required';
          setIsPhoneValid(false);
        } else if (value.length !== 10) {
          error = 'Please enter 10 digit contact number';
          setIsPhoneValid(false);
        } else {
          setIsPhoneValid(true);
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else {
          const passwordValidation = validatePassword(value);
          error = passwordValidation.error;
          setIsPasswordValid(passwordValidation.isValid);
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          error = 'DOB is required';
        }
        break;

      case 'gender':
        if (!value) {
          error = 'Gender is required';
        }
        break;

      case 'line1':
        if (!value) {
          error = 'Address Line 1 is required';
        }
        break;

      case 'city':
        if (!value) {
          error = 'City is required';
        }
        break;

      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;
    }

    return error;
  };

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({...prev, [fieldName]: value}));
    const error = validateField(fieldName, value);
    setErrors(prev => ({...prev, [fieldName]: error}));
  };

  const handleBlur = (fieldName: string) => {
    const value = formData[fieldName as keyof typeof formData];
    const error = validateField(fieldName, value);
    setErrors(prev => ({...prev, [fieldName]: error}));
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const isValid = passwordRegex.test(password);
    return {
      isValid,
      error: isValid ? '' : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    };
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phone', 'password', 'line1', 'city', 'country'];
    const newErrors: FormErrors = {};

    // First validate all required fields
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Update errors state with all validation results
    setErrors(newErrors);

    // If there are any errors, return
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If no errors, proceed with signup
    const signUpPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || null,
      phone: formData.phone,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      patientPortal: true,
      roleType: 'PATIENT',
      countryCode,
      address: {
        line1: formData.line1,
        line2: formData.line2,
        city: formData.city,
        stateName: formData.stateName,
        country: formData.country
      }
    };
    console.log("signUpPayload-->", signUpPayload);
    const res: any = await dispatch(signUpAction(signUpPayload));
    console.log("res-->", res);
    if (res?.error) {
      Alert.alert("Error", res?.error?.message);
    } else {
      Toast.show("Your account created successfully", 2);
      navigation.navigate('SignIn');
    }
  };

  const genderOptions = [
    {label: 'Female', value: 'FEMALE'},
    {label: 'Male', value: 'MALE'},
    {label: 'Other', value: 'OTHER'},
    {label: 'Transgender', value: 'TRANSGENDER'},
  ];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-around', backgroundColor: 'white'}}>
          <OnboardingTopView />
          <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            
            <TextInput
              value={formData.firstName}
              label="First Name"
              placeholder="First Name"
              style={{marginTop: 15}}
              onChangeText={value => handleChange('firstName', value)}
              isValid={errors.firstName}
              onBlur={() => handleBlur('firstName')}
              required
            />
            {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

            <TextInput
              value={formData.lastName}
              placeholder="Last Name"
              label="Last Name"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('lastName', value)}
              isValid={errors.lastName}
              onBlur={() => handleBlur('lastName')}
              required
            />
            {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

            <DatePickerInput
              label="Date of Birth"
              date={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
              setDate={(date: Date) => handleChange('dateOfBirth', date)}
              containerStyles={{marginBottom: 10, marginTop: 5}}
              maximumDate={new Date()}
              required
            />
            {errors.dateOfBirth && <Text style={styles.error}>{errors.dateOfBirth}</Text>}

            <DropdownComponent
              label="Gender"
              data={genderOptions}
              placeholder="Select Gender"
              selectedValue={formData.gender}
              onValueChange={(value: string) => handleChange('gender', value)}
              required
            />
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <TextInput
              style={{marginTop: 10}}
              value={formData.email}
              placeholder="Email"
              label="Email"
              keyboardType="email-address"
              onChangeText={value => handleChange('email', value)}
              isValid={errors.email}
              onBlur={() => handleBlur('email')}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <PhoneWithCountryCode
              required
              label='Phone Number'
              countryCode={countryCode}
              number={formData.phone}
              onChange={handlePhoneChange}
            
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <Text style={styles.passwordLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={{marginVertical: 10}}
              value={formData.password}
              placeholder="Password"
              onChangeText={value => handleChange('password', value)}
              isValid={errors.password}
              onBlur={() => handleBlur('password')}
              required
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              value={formData.line1}
              placeholder="Address Line 1"
              label="Address Line 1"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('line1', value)}
              isValid={errors.line1}
              onBlur={() => handleBlur('line1')}
              required
            />
            {errors.line1 && <Text style={styles.error}>{errors.line1}</Text>}

            <TextInput
              value={formData.line2}
              placeholder="Address Line 2 (Optional)"
              label="Address Line 2"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('line2', value)}
            />

            <TextInput
              value={formData.city}
              placeholder="City"
              label="City"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('city', value)}
              isValid={errors.city}
              onBlur={() => handleBlur('city')}
              required
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}

            <TextInput
              value={formData.stateName}
              placeholder="State"
              label="State"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('stateName', value)}
            />

            <TextInput
              value={formData.country}
              placeholder="Country"
              label="Country"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('country', value)}
              isValid={errors.country}
              onBlur={() => handleBlur('country')}
              required
            />
            {errors.country && <Text style={styles.error}>{errors.country}</Text>}

            <View style={{paddingTop: 20}}>
              <Button title="Create New Patient" onPress={handleSignUp} />
            </View>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: fontType.Roboto,
    fontSize: 26,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
    marginTop: -5,
  },
  passwordLabel: {
    color: colors.grey70,
    marginBottom: 10,
    fontSize: responsiveFontSize(1.7),
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    paddingTop: 18,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#1A1A1A',
  },
  signInLink: {
    textDecorationLine: 'underline',
    color: '#0097F0',
    padding: 10,
    fontSize: 14,
  },
});

export default SignUpSc;
