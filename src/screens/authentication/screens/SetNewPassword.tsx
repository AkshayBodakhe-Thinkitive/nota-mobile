import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import CustomText from '../../../components/Text/CustomText';
import TextInput from '../../../components/TextInput/TextInput';
import {resetPasswordAction} from '../../../redux/reducers/auth/async-actions/resetPassword';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
const SetNewPassword = (routes: any) => {
  const {navigation, route} = routes && routes;
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const newPasswordSet = useAppSelector(
    (state: RootState) => state.auth.newPasswordSet,
  );
  const isFocused = useIsFocused();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validatePassword = (txt: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    let errorMessage =
      'Password must be at least 8 characters long and contain at least one uppercase, one lowercase letter, one number, and one special character';
    if (!passwordRegex.test(txt)) {
      return {value: errorMessage, isError: true};
    } else {
      return {value: txt, isError: false};
    }
  };
  const handleChange = (fieldName: string, value: string) => {
    let passValidationResult = validatePassword(value);
    if (fieldName === 'newPassword') {
      setNewPassword(value);
      if (value == '') {
        setErrors({...errors, newPassword: 'Password is required'});
      } else {
        if (passValidationResult.isError) {
          setErrors({...errors, newPassword: passValidationResult.value});
        } else {
          if (errors.newPassword) {
            setErrors({...errors, newPassword: ''});
          }
        }
      }
    } else if (fieldName === 'confirmPassword') {
      setConfirmPassword(value);
      if (value == '') {
        setErrors({...errors, confirmPassword: 'Confirm password is required'});
      } else {
        if (passValidationResult.isError) {
          setErrors({...errors, confirmPassword: passValidationResult.value});
        } else {
          if (value == newPassword) {
            if (errors.confirmPassword) {
              setErrors({...errors, confirmPassword: ''});
            }
          } else {
            setErrors({...errors, confirmPassword: 'Password not matched'});
          }
        }
      }
    }
  };


  useEffect(() => {
    if (newPasswordSet) {
      Toast.show('Password changed successfully', 2);
      navigation.navigate('SignIn');
    }
  });
  const resetPassword = () => {
    const isSame = newPassword === confirmPassword ? true : false;
    const errors: {[key: string]: string} = {};

    if (!newPassword) {
      errors.newPassword = 'Password is required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    }
    if (Object.keys(errors).length === 0) {
      if (isSame === true) {
        dispatch(
          resetPasswordAction({
            email: route?.params?.email,
            newPassword: newPassword,
          })
        ).then((res:any)=>{
          if(res?.error){
            Alert.alert("Failed!",res?.error?.message,[
              {text: 'OK', onPress: ()=>{}},
            ])
          }
        })
      } else {
        // createTwoButtonAlert('Password not matched');
      }
    } else {
      setErrors(errors);
    }
  };
  useEffect(() => {
    setErrors({...errors, newPassword: '', confirmPassword: ''});
  }, [isFocused]);
  const handleBlur = (fieldName: string) => {
    if (fieldName === 'newPassword') {
      if (!newPassword) {
        setErrors({...errors, newPassword: 'Password is required'});
      } else {
        let passValidationResult = validatePassword(newPassword);
        if (passValidationResult.isError) {
          setErrors({...errors, newPassword: passValidationResult.value});
        } else {
          if (errors.newPassword) {
            setErrors({...errors, newPassword: ''});
          }
        }
      }
    } else if (confirmPassword === 'confirmPassword') {
      if (!confirmPassword) {
        setErrors({...errors, confirmPassword: 'Confirm password is required'});
      } else {
        let passValidationResult = validatePassword(confirmPassword);
        if (passValidationResult.isError) {
          setErrors({...errors, confirmPassword: passValidationResult.value});
        } else {
          if (confirmPassword == newPassword) {
            if (errors.confirmPassword) {
              setErrors({...errors, confirmPassword: ''});
            }
          } else {
            setErrors({...errors, confirmPassword: 'Password not matched'});
          }
        }
      }
    }
  };
  const gotoSign = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>
        <CustomText
          fontSize={responsiveFontSize(3.5)}
          fontFamily={fontType.Roboto_Bold}>
          Set new password
        </CustomText>
        <TextInput
          value={newPassword}
          placeholder="Password"
          onChangeText={value => handleChange('newPassword', value)}
          onBlur={() => handleBlur('newPassword')}
          isValid={errors.newPassword}
          secureTextEntry
          style={[styles.textInput, {marginBottom: responsiveHeight(0)}]}
        />
        {errors.newPassword && (
          <Text style={styles.error}>{errors.newPassword}</Text>
        )}
        <TextInput
          value={confirmPassword}
          onChangeText={value => handleChange('confirmPassword', value)}
          onBlur={() => handleBlur('confirmPassword')}
          isValid={errors.confirmPassword}
          placeholder="Confirm Password"
          style={styles.textInput}
          secureTextEntry
          selectTextOnFocus={false}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
        <Button
          title="Set Password"
          buttonStyle={{width: '100%', marginTop: 20}}
          onPress={resetPassword}
        />
      </View>
    </View>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  screenWrapper: {
    marginTop: '40%',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  weWillSend: {
    width: '50%',
    textAlign: 'center',
    color: colors.navala_grey,
    fontSize: responsiveFontSize(1.7),
    marginVertical: responsiveHeight(2),
  },
  textInput: {
    marginBottom: 10,
    marginTop: 30,
  },

  veryOtpBtn: {
    width: '100%',
    marginBottom: responsiveHeight(2.5),
    marginTop: 20,
  },
  resendOTP: {
    color: colors.primary,
    textDecorationLine: 'underline',
    marginTop: responsiveHeight(2.5),
  },
  error: {
    color: 'red',
    marginLeft: 5,
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
  },
});
