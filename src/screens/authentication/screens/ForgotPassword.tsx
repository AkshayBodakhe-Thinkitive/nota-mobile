import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomText from '../../../components/Text/CustomText';
import { ForgotPasswordStyles as styles } from '../styles/ForgotPasswordStyles';
// import {FontType} from '../../../constants/FontType';
import { useIsFocused } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import { fontType } from '../../../assets/fontType';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import TextInput from '../../../components/TextInput/TextInput';
import {
  clearSendOtpData,
  resetAuth,
} from '../../../redux/reducers/auth/AuthReducer';
import { sendOTPAction } from '../../../redux/reducers/auth/async-actions/sendOTPAction';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';

const ForgotPassword = ({navigation}: any) => {
  const islogOut = useAppSelector((state: RootState) => state.auth.islogOut);
  const isoptSend = useAppSelector((state: RootState) => state.auth.isotpSend);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const isFocused = useIsFocused();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const handleChange = (fieldName: string, value: string) => {
    if (fieldName === 'email') {
      setEmail(value);
      if (errors.email) {
        setErrors({...errors, email: ''});
      }
    }
  };
  const createTwoButtonAlert2 = () =>{
    Alert.alert(
      'Please enter valid email-ID',
      '',
      [
       
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

    
  };
  const error = useAppSelector((state: RootState) => state.auth.forgotError);
 
  useEffect(() => {
    if (error) {
      dispatch(resetAuth());
      createTwoButtonAlert2();
    }
  }, [error]);

  const handleBlur = (fieldName: string) => {
    if (fieldName === 'email') {
      if (!email) {
        setErrors({...errors, email: 'email is required'});
      } else {
        setErrors({...errors, email: ''});
      }
    }
  };

  const handleSendOtp = () => {
    const errors: {[key: string]: string} = {};

    if (!email) {
      errors.email = 'Email is required';
    }
    console.log('****isoptSend***' + {isoptSend});
    if (Object.keys(errors).length === 0) {
      dispatch(sendOTPAction({email: email}));
    } else {
      setErrors(errors);
    }
  };
  
  useEffect(() => {
    if (isoptSend) {
      console.log('isoptSend' + isoptSend);
      dispatch(clearSendOtpData(false));
      dispatch(resetAuth());
      Toast.show('OTP send successfully', 2) 
      navigation.navigate('VerifyOtp', {email: email});
    }
  }, [isoptSend]);
  useEffect(() => {
    setErrors({...errors, email: ''});
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>
        <CustomText
          fontSize={responsiveFontSize(3.5)}
          fontFamily={fontType.Roboto_Bold}>
          Forgot Password?
        </CustomText>
        <CustomText style={styles.weWillSend}>
          We will send you an otp on your email
        </CustomText>
        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={value => handleChange('email', value)}
          isValid={errors.email}
          onBlur={() => handleBlur('email')}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <Button
          title="Send OTP"
          buttonStyle={{width: '100%'}}
          onPress={handleSendOtp}
          // onPress= {() => navigation.navigate('VerifyOtp')}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
