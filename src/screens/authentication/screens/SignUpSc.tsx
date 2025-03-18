import React, {useEffect, useState} from 'react';

import {
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
import CustomDateTextField from '../../../components/CustomDateField';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import DropdownComponent from '../../../components/Dropdown/DropDown';

const SignUpSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const signUpData = useAppSelector(
    (state: RootState) => state.auth.signUpData,
  );
  const [contctIsCorrect, setContctIsCorrect] = useState(false);
  const [correct, correctPass] = useState(false);
  const [firstName, serFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setUsername] = useState(null);
  const [phone, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [countryCode, setCountryCode] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const handlePhoneChange = (
    newCountryCode: string,
    newPhoneNumber: string,
  ) => {
    setCountryCode(newCountryCode);
    setPhonenumber(newPhoneNumber);
    handleChange('phone', newPhoneNumber);
  };

  const handleBlur = (fieldName: string) => {
    if (fieldName === 'firstName') {
      if (!firstName) {
        setErrors({...errors, firstName: 'First name is required'});
        if (firstName[0] === ' ' || firstName[firstName.length - 1] === ' ') {
          setErrors({
            ...errors,
            firstName:
              'First name should not contain leading or trailing space',
          });
        } else {
          if (errors.firstName) {
            setErrors({...errors, firstName: ''});
          }
        }
      }
    } else if (fieldName === 'lastName') {
      if (!lastName) {
        setErrors({...errors, lastName: 'Last name is required'});
      } else {
        if (lastName[0] === ' ' || lastName[lastName.length - 1] === ' ') {
          setErrors({
            ...errors,
            lastName: 'Last name should not contain leading or trailing space',
          });
        } else {
          if (errors.lastName) {
            setErrors({...errors, lastName: ''});
          }
        }
      }
    }
    
    else if (fieldName === 'dateOfBirth') {
      setDateOfBirth(dateOfBirth);
      if (!dateOfBirth) {
      setErrors({...errors, dateOfBirth: 'DOB is required'});
    } else if (errors.dateOfBirth) {
      setErrors({...errors, dateOfBirth: ''});
    }
  } 
  
  else if (fieldName === 'gender') {
    setGender(gender);
    if (!gender) {
      setErrors({...errors, city: 'Gender is required'});
    } else if (errors.gender) {
      setErrors({...errors, gender: ''});
    }
  } 
    
    else if (fieldName === 'email') {
      if (!email) {
        setErrors({...errors, email: ''});
        setUsername(null);
      } else {
        setErrors({...errors, email: ''});
      }
    } else if (fieldName === 'phone') {
      if (!phone) {
        setErrors({...errors, phone: 'Phone is required'});
      } else {
        setErrors({...errors, phone: ''});
      }
    } else if (fieldName === 'password') {
      if (!password) {
        setErrors({...errors, password: 'Password is required'});
      } else {
        let passValidationResult = validatePassword(password);
        if (passValidationResult.isError) {
          setErrors({...errors, password: passValidationResult.value});
        } else {
          setErrors({...errors, password: ''});
        }
      }
    }
    // Add these cases in handleBlur
    else if (fieldName === 'line1') {
      if (!line1) {
        setErrors({...errors, line1: 'Address Line 1 is required'});
      } else {
        setErrors({...errors, line1: ''});
      }
    } else if (fieldName === 'city') {
      if (!city) {
        setErrors({...errors, city: 'City is required'});
      } else {
        setErrors({...errors, city: ''});
      }
    } else if (fieldName === 'stateName') {
      if (!stateName) {
        setErrors({...errors, stateName: 'State is required'});
      } else {
        setErrors({...errors, stateName: ''});
      }
    } else if (fieldName === 'country') {
      if (!country) {
        setErrors({...errors, country: 'Country is required'});
      } else {
        setErrors({...errors, country: ''});
      }
    } else if (fieldName === 'zipcode') {
      if (!zipcode) {
        setErrors({...errors, zipcode: 'Zipcode is required'});
      } else {
        // const regex = /^[0-9]{5}$/;
        // if (!regex.test(zipcode)) {
          if (!zipcode) {
          setErrors({...errors, zipcode: 'Invalid zipcode format'});
        } else {
          setErrors({...errors, zipcode: ''});
        }
      }
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    const result = validateInput(value);
    if (fieldName === 'firstName') {
      if (result.isError) {
        setErrors({...errors, firstName: result.value});
      } else {
        serFirstname(result.value);
        if (value.length > 0) {
          if (value[0] === ' ' || value[value.length - 1] === ' ') {
            setErrors({
              ...errors,
              firstName:
                'First name should not contain leading or trailing space',
            });
          } else if (errors.firstName) {
            setErrors({...errors, firstName: ''});
          }
        }
      }
    } else if (fieldName === 'lastName') {
      if (result.isError) {
        setErrors({...errors, lastName: result.value});
      } else {
        setLastname(value);
        if (value.length > 0) {
          if (value[0] === ' ' || value[value.length - 1] === ' ') {
            setErrors({
              ...errors,
              lastName:
                'Last name should not contain leading or trailing space',
            });
          } else if (errors.lastName) {
            setErrors({...errors, lastName: ''});
          }
        }
        }
      } 

      else if (fieldName === 'dateOfBirth') {
        setDateOfBirth(value);
        if (!value) {
        setErrors({...errors, dateOfBirth: 'DOB is required'});
      } else if (errors.dateOfBirth) {
        setErrors({...errors, dateOfBirth: ''});
      }
    } 
    
    else if (fieldName === 'gender') {
      setGender(value);
      if (!value) {
        setErrors({...errors, city: 'Gender is required'});
      } else if (errors.gender) {
        setErrors({...errors, gender: ''});
      }
    } 
    
    else if (fieldName === 'email') {
      setUsername(value);
      if (!validateEmail(value)) {
        setErrors({...errors, email: 'Invalid email address'});
      } else {
        setErrors({...errors, email: ''});
      }
    } else if (fieldName === 'phone') {
      if (value.length <= 10) {
        setPhonenumber(value);
        let contactValidate = validatePhoneNumber(value);
        if (contactValidate.isError) {
          setErrors({...errors, phone: contactValidate.value});
        } else {
          setErrors({...errors, phone: ''});
        }
      } else {
        setErrors({...errors, phone: ''});
      }
    } else if (fieldName === 'password') {
      setPassword(value);
      if (!password) {
        setErrors({...errors, password: 'Password is required'});
      } else {
        let passValidationResult = validatePassword(value);
        if (passValidationResult.isError) {
          setErrors({...errors, password: passValidationResult.value});
        } else if (errors.password) {
          setErrors({...errors, password: ''});
        }
      }
    }
    // Add these cases in handleChange
    else if (fieldName === 'line1') {
      setLine1(value);
      if (!value) {
        setErrors({...errors, line1: 'Address Line 1 is required'});
      } else if (errors.line1) {
        setErrors({...errors, line1: ''});
      }
    } else if (fieldName === 'city') {
      setCity(value);
      if (!value) {
        setErrors({...errors, city: 'City is required'});
      } else if (errors.city) {
        setErrors({...errors, city: ''});
      }
    } else if (fieldName === 'stateName') {
      setStateName(value);
      if (!value) {
        setErrors({...errors, stateName: 'State is required'});
      } else if (errors.stateName) {
        setErrors({...errors, stateName: ''});
      }
    } else if (fieldName === 'country') {
      setCountry(value);
      if (!value) {
        setErrors({...errors, country: 'Country is required'});
      } else if (errors.country ){
        setErrors({...errors, country: ''});
      }
    } else if (fieldName === 'zipcode') {
      setZipcode(value);
      // const regex = /^[0-9]{5}$/;
      // if (!regex.test(value)) {
        if (!value) {
        setErrors({...errors, zipcode: 'Invalid zipcode format'});
      } else if (errors.zipcode) {
        setErrors({...errors, zipcode: ''});
      }
    }
  };

  const handleSignUp = () => {
    console.log(firstName);
    const errors: {[key: string]: string} = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }


    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = 'DOB is required';
    }

    if (!gender) {
      errors.gender = 'Gender is required';
    }

    if (!phone) {
      errors.phone = 'Contact number is required';
    } else if (!contctIsCorrect) {
      errors.phone = 'Please enter 10 digit contact number';
    }
    // if (!email) {
    //   errors.email = 'Email is required';
    // } else if (!validateEmail(email)) {
    //   errors.email = 'Invalid email address';
    // }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!correct) {
      errors.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!line1) {
      errors.line1 = 'Line 1 is required';
    }
    if (!city) {
      errors.city = 'City is required';
    }
    if (!stateName) {
      errors.stateName = 'State name is required';
    }
    if (!country) {
      errors.country = 'Country is required';
    }
    // if (!zipcode) {
    //   errors.zipcode = 'Zip Code is required';
    // }

    if (Object.keys(errors).length === 0) {
      const patientPortal = true;
      const roleType = 'PATIENT';
      const signUpPayload = {
        email,
        firstName,
        lastName,
        phone,
        password,
        patientPortal,
        roleType,
        countryCode,
        gender,
        birthDate: dateOfBirth,
        address: {
          line1,
          line2,
          city,
          stateName,
          country,
          zipcode,
        },
      };
      dispatch(signUpAction(signUpPayload));
    } else {
      setErrors(errors);
    }
  };
  const backToSignIn = () => {
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    if (signUpData) {
      dispatch(resetAuth());
      Toast.show('Your account created successfully', 2);
      navigation.navigate('SignIn');
    }
  }, [signUpData]);

  const validatePassword = (txt: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    let errorMessage =
      'Password must be at least 8 characters long and contain at least one uppercase, one lowercase letter, one number, and one special character';
    if (!passwordRegex.test(txt)) {
      correctPass(false);
      return {value: errorMessage, isError: true};
    } else {
      correctPass(true);
      return {value: txt, isError: false};
    }
  };

  const validateInput = (inputValue: string) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?0-9]/;
    if (regex.test(inputValue)) {
      return {
        value: 'Input should not contain special characters or numbers',
        isError: true,
      };
    } else {
      return {value: inputValue, isError: false};
    }
  };
  const validatePhoneNumber = (inputValue: string) => {
    const regex = /^[0-9]{10}$/;
    let errorMessage = 'Please enter 10 digit contact number';
    if (!regex.test(inputValue)) {
      setContctIsCorrect(false);
      return {value: errorMessage, isError: true};
    } else {
      setContctIsCorrect(true);
      return {value: inputValue, isError: false};
    }
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const genderType = [
    {label: 'Female', value: 'FEMALE'},
    {label: 'Male', value: 'MALE'},
    {label: 'Other', value: 'OTHER'},
    {label: 'Transgender', value: 'TRANSGENDER'},
  ];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            backgroundColor: 'white',
          }}>
          <OnboardingTopView />
          <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
              value={firstName}
              label="First Name"
              placeholder="First Name"
              style={{marginTop: 15}}
              onChangeText={value => handleChange('firstName', value)}
              isValid={errors.firstName}
              onBlur={() => handleBlur('firstName')}
              required
            />
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <TextInput
              value={lastName}
              placeholder="Last Name"
              label="Last Name"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('lastName', value)}
              isValid={errors.lastName}
              onBlur={() => handleBlur('lastName')}
              required
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <DatePickerInput
              label="Date of Birth"
              date={dateOfBirth}
              setDate={(date: any) => handleChange('dateOfBirth', date)}
              containerStyles={{marginBottom: 10, marginTop: 5}}
              maximumDate={new Date()}
              required
            />
             {errors.dateOfBirth && (
              <Text style={styles.error}>{errors.dateOfBirth}</Text>
            )}

            <DropdownComponent
              label="Gender"
              data={genderType}
              placeholder="Select Gender"
              selectedValue={gender}
              onValueChange={(value: any) => {
                // setGenderError(false)
                handleChange('gender', value)
              }}
              // isValid={genderError}
              // errorText={genderError === true ? 'Please Select Gender' : ''}
              required
            />

          {errors.gender && (
              <Text style={styles.error}>{errors.gender}</Text>
            )}
            

            <TextInput
              style={{marginTop: 10}}
              value={email}
              placeholder="Email"
              label="Email"
              keyboardType="email-address"
              onChangeText={value => handleChange('email', value)}
              isValid={errors.email}
              onBlur={() => handleBlur('email')}
              // required
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <PhoneWithCountryCode
              countryCode={countryCode}
              number={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            <Text
              style={{
                color: colors.grey70,
                marginBottom: 10,
                fontSize: responsiveFontSize(1.7),
              }}>
              Password
            </Text>
            <TextInput
              secureTextEntry
              style={{marginVertical: 10}}
              value={password}
              placeholder="Password"
              // label="Password"
              onChangeText={value => handleChange('password', value)}
              isValid={errors.password}
              onBlur={() => handleBlur('password')}
              required
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              value={line1}
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
              value={line2}
              placeholder="Address Line 2 (Optional)"
              label="Address Line 2"
              style={{marginTop: 10}}
              onChangeText={value => setLine2(value)}
            />

            <TextInput
              value={city}
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
              value={stateName}
              placeholder="State"
              label="State"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('stateName', value)}
              isValid={errors.stateName}
              onBlur={() => handleBlur('stateName')}
              required
            />
            {errors.stateName && (
              <Text style={styles.error}>{errors.stateName}</Text>
            )}

            <TextInput
              value={country}
              placeholder="Country"
              label="Country"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('country', value)}
              isValid={errors.country}
              onBlur={() => handleBlur('country')}
              required
            />
            {errors.country && (
              <Text style={styles.error}>{errors.country}</Text>
            )}

            <TextInput
              value={zipcode}
              placeholder="Zipcode"
              label="Zipcode"
              keyboardType="numeric"
              style={{marginTop: 10}}
              onChangeText={value => handleChange('zipcode', value)}
              isValid={errors.zipcode}
              onBlur={() => handleBlur('zipcode')}
            />
            {errors.zipcode && (
              <Text style={styles.error}>{errors.zipcode}</Text>
            )}
            <View style={{paddingTop: 20}}>
              <Button title={'Create New Patient'} onPress={handleSignUp} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  paddingTop: 18,
                  alignSelf: 'center',
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#1A1A1A',
                }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity style={{top: 5}} onPress={backToSignIn}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#0097F0',
                    padding: 10,
                    fontSize: 14,
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpSc;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },

  checkBoxImage: {
    height: 20,
    width: 20,
  },

  heading: {
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: fontType.Roboto,
    fontSize: 26,
    // backgroundColor: 'pink',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
    marginTop: -5,
  },
});
