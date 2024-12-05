import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import { fontType } from '../../../assets/fontType';
import { showAlert } from '../../../common/dimensionConstant';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import CustomText from '../../../components/Text/CustomText';
import { resetAuth } from '../../../redux/reducers/auth/AuthReducer';
import { sendOTPAction } from '../../../redux/reducers/auth/async-actions/sendOTPAction';
import { verifyOTPAction } from '../../../redux/reducers/auth/async-actions/verifyOTPAction';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';
import CustomOTPInput from '../components/CustomOtpInput';
import { ForgotPasswordStyles as styles } from '../styles/ForgotPasswordStyles';

const VerifyOtp = (routes: any) => {
  const {navigation, route} = routes && routes;
  console.log(' VerifyOtp route email', JSON.stringify(route?.params?.email));
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [otp, setOtp] = useState<any>();
  const otpData = useAppSelector(
    (state: RootState) => state.auth.verifyOTPData,
  );
  const [time, setTime] = React.useState(0);
  const [resendOTPClicks, setResendOTPClicks] = useState(false);
  const timerRef = React.useRef(time);

  const verifyOTPData = useAppSelector(
    (state: RootState) => state.auth.verifyOTPData,
  );
  const isOtpVerified = useAppSelector(
    (state: RootState) => state.auth.isOtpVerified,
  );
  const verifyError = useAppSelector(
    (state: RootState) => state.auth.verifyError,
  );
  const verifyOTP = () => {
    console.log('otp', otp);

    if (otp != undefined) {
      setErrors({...errors, otp: ''});
      dispatch(verifyOTPAction({otp: otp, email: route?.params?.email}));
      dispatch(resetAuth());
    } else {
      setErrors({...errors, otp: 'please enter OTP'});
    }
  };
  console.log('verifyOTPData: data ', verifyOTPData?.data);

  useEffect(() => {
    if (otpData?.data) {
      dispatch(resetAuth());
      Toast.show('OTP verified successfully', 2);
      navigation.navigate('SetNewPassword', {email: route?.params?.email});
    } else if (otpData?.data == false) {
      dispatch(resetAuth());
      showAlert('Alert', 'Please enter the valid OTP');
    }
  }, [otpData?.data]);
  const handleResentOTP = () => {
    let email = route?.params?.email;
    if (email != undefined && email != '') {
      console.log('Resending OTP to:', email);
      setTime(30);
      dispatch(sendOTPAction({email: email}));
      setResendOTPClicks(true);
    } else {
      console.log('Email not found');
    }
  };

  useEffect(() => {
    if (!resendOTPClicks) {
      return;
    }
    timerRef.current = time;
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        setResendOTPClicks(false);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [resendOTPClicks]);

  return (
    <View style={styles.container}>
      <View style={styles.screenWrapper}>
        <CustomText
          fontSize={responsiveFontSize(3.5)}
          fontFamily={fontType.Roboto_Bold}>
          Verify OTP
        </CustomText>
        <CustomText style={styles.weWillSend}>
          Enter your OTP Code here
        </CustomText>
        <CustomOTPInput onChange={otp => setOtp(otp)}></CustomOTPInput>
        {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
        <Button
          disabled={otp?.length < 6 || otp == undefined}
          title="Verify OTP"
          buttonStyle={styles.veryOtpBtn}
          onPress={verifyOTP}
        />
        <CustomText>Didn't receive otp yet?</CustomText>
        <TouchableOpacity onPress={handleResentOTP} disabled={resendOTPClicks}>
          <CustomText style={styles.resendOTP}>Resend OTP {time == 0 ? '' : time}</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOtp;
