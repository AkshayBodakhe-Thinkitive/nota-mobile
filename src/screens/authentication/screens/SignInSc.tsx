import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Checkbox from '../../../components/CheckBox/CheckBox';
import Loader from '../../../components/Loader/Loader';
import Row from '../../../components/Row/Row';
import TextInput from '../../../components/TextInput/TextInput';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {RootStackParamList} from '../../../navigation/AppNavigator';
import {
  resetAuth,
  resetErrorMessage,
} from '../../../redux/reducers/auth/AuthReducer';
import {signInAction} from '../../../redux/reducers/auth/async-actions/signInAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {SignInScreenScStyles as styles} from '../styles/SignInScreenScStyles';

export function SignIn({navigation}: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const error = useAppSelector((state: RootState) => state.auth.error);
  const [show, setShow] = useState(false);
  const [envTouchesCNT, setEnvTouchesCNT] = useState(0);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const isFocused = useIsFocused();
  const errorMessage = useAppSelector(
    (state: RootState) => state.auth.errorMessage,
  );
  const createTwoButtonAlert = (msg: string) => {
    Alert.alert(
      // 'Please check your username and password and try again.',
      msg,
      '',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  useEffect(() => {
    resetErrorMessage();
  }, []);

  console.log("loginData==>",loggedIn,  loginData)

  useEffect(() => {

    if (loginData?.data?.accessToken) {
      setShow(true);
      Toast.show('Login successfully', 2);
      navigation.navigate('DrawerNavigationSc');
    } else if (error) {
      if (errorMessage == '' || errorMessage == null) {
        return;
      }
      console.log('error handleSignIn', errorMessage);
      createTwoButtonAlert(errorMessage);
      dispatch(resetAuth());
    }
  }, [loginData?.data?.accessToken, error]);

  const goToSignUp = () => {
    resetErrorMessage();
    navigation.navigate('SignUpSc');
  };

  const handleBlur = (fieldName: string) => {
    if (fieldName === 'username') {
      if (!username) {
        setErrors({...errors, username: 'Email is required'});
      }
      else {
        setErrors({...errors, username: ''});
      }
    } else if (fieldName === 'password') {
      if (!password) {
        setErrors({...errors, password: 'Password is required'});
      } else {
        setErrors({...errors, password: ''});
      }
    }
  };
  useEffect(() => {
    if (envTouchesCNT == 5) {
      navigation.navigate('EnvironmentSetup');
    }
    setTimeout(() => {
      setEnvTouchesCNT(0);
    }, 2000);
  }, [envTouchesCNT]);
  useEffect(() => {
    setErrors({...errors, password: '', username: ''});
  }, [isFocused]);

  const handleChange = (fieldName: string, value: string) => {
    if (fieldName === 'username') {
      setUsername(value);
      if (errors.username) {
        setErrors({...errors, username: ''});
      }
    } else if (fieldName === 'password') {
      setPassword(value);
      if (errors.password) {
        setErrors({...errors, password: ''});
      }
    }
  };

  const handleSignIn = () => {
    const errors: {[key: string]: string} = {};
    if (Object.keys(errors).length === 0) {
      dispatch(signInAction({username, password}));
    } else {
      setErrors(errors);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageBgContainer}>
        <ImageBackground
          source={ImagePath1.backgroundLoginImage}
          resizeMode="cover"
          style={styles.image1}>
          <View style={styles.greetContainer}>
            <View style={styles.greetTxtContainer}>
              <Text style={styles.welcomeTxt}>Welcome</Text>
              <Text style={styles.NAVALATxt}>to NAVALA</Text>
            </View>
            <View>
              <ImageBackground
                style={styles.image2}
                source={ImagePath1.doctorImage}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.signInFormContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              let count = envTouchesCNT + 1;
              setEnvTouchesCNT(count);
            }}>
            <View>
              <Text style={styles.signInTxt}>Sign In</Text>
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            value={username}
            placeholder="Email or phone"
            keyboardType="email-address"
            onChangeText={value => handleChange('username', value)}
            isValid={errors.username}
            onBlur={() => handleBlur('username')}
            autoCapitalize="none"
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}
          <TextInput
            placeholder="Password"
            onChangeText={value => handleChange('password', value)}
            onBlur={() => handleBlur('password')}
            value={password}
            isValid={errors.password}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <View style={styles.forgotPassRow}>
            {/* <Row>
              <Checkbox />
              <Text style={styles.remMeTxt}>Remember me</Text>
            </Row> */}
            <View></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgPassTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button title="Continue" onPress={handleSignIn} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                paddingTop: 18,
                fontWeight: '500',
                fontSize: 14,
                color: '#1A1A1A',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              Don't have an account?{'  '}
            </Text>
            <TouchableOpacity style={{top: 5}} onPress={goToSignUp}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#0097F0',
                  padding: 10,
                  fontSize: 14,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
