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

  const [countryCode, setCountryCode] = useState('');

  const handlePhoneChange = (
    newCountryCode: string,
    newPhoneNumber: string,
  ) => {
    setCountryCode(newCountryCode);
    setPhonenumber(newPhoneNumber);
    handleChange('phone',newPhoneNumber)
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
    } else if (fieldName === 'email') {
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
    } else if (fieldName === 'email') {
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
  };

  const handleSignUp = () => {
    console.log('Enter in to the handleSignUp ');
    console.log(firstName);
    const errors: {[key: string]: string} = {};
    if (!firstName) {
      console.log('First name is required');
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
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

    if (Object.keys(errors).length === 0) {
      const patientPortal = true;
      const roleType = 'PATIENT';
      console.log(
        email,
        firstName,
        lastName,
        phone,
        password,
        patientPortal,
        roleType,
        countryCode
      );

      dispatch(
        signUpAction({
          email,
          firstName,
          lastName,
          phone,
          password,
          patientPortal,
          roleType,
          countryCode
        }),
      );
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
    const regex = /^[0-9]{10}$/; // Regular expression for a 10-digit phone number
    let errorMessage = 'Please enter 10 digit contact number';
    if (!regex.test(inputValue)) {
      console.log('Enter into  validatePhoneNumber error');
      setContctIsCorrect(false);
      return {value: errorMessage, isError: true};
    } else {
      setContctIsCorrect(true);
      return {value: inputValue, isError: false};
    }
    // return regex.test(inputValue);
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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
            {/* <TextInput
              style={{marginTop: 10}}
              value={phone}
              placeholder="Contact Number"
              label="Contact Number"
              keyboardType="number-pad"
              onChangeText={value => handleChange('phone', value)}
              isValid={errors.phone}
              onBlur={() => handleBlur('phone')}
              required
            /> */}
            <PhoneWithCountryCode
              countryCode={countryCode} // Pass the current country code
              number={phone} // Pass the current phone number
              onChange={handlePhoneChange} // Handler to update state
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            <TextInput
              secureTextEntry
              style={{marginVertical: 10}}
              value={password}
              placeholder="Password"
              label="Password"
              onChangeText={value => handleChange('password', value)}
              isValid={errors.password}
              onBlur={() => handleBlur('password')}
              required
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
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
