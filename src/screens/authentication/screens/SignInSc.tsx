import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Loader from '../../../components/Loader/Loader';
import TextInput from '../../../components/TextInput/TextInput';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {RootStackParamList} from '../../../navigation/AppNavigator';
import {resetErrorMessage} from '../../../redux/reducers/auth/AuthReducer';
import {signInAction} from '../../../redux/reducers/auth/async-actions/signInAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {SignInScreenScStyles as styles} from '../styles/SignInScreenScStyles';
import {envChangerFunction} from '../../../config/AxiosConfig';

type SignInProps = NativeStackScreenProps<RootStackParamList>;

interface FormErrors {
  username?: string;
  password?: string;
}

export function SignIn({navigation}: SignInProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const env = useAppSelector((state: RootState) => state.auth.baseUrl);
  const isFocused = useIsFocused();

  const [formData, setFormData] = useState({
    username: 'vaibhav.patil@yopmail.com',
    password: 'Pass@123',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [envTouchesCNT, setEnvTouchesCNT] = useState(0);

  useEffect(() => {
    resetErrorMessage();
    envChangerFunction(env);
  }, [env]);

  useEffect(() => {
    if (envTouchesCNT === 5) {
      navigation.navigate('Signup' as any);
    }
    const timer = setTimeout(() => setEnvTouchesCNT(0), 2000);
    return () => clearTimeout(timer);
  }, [envTouchesCNT, navigation]);

  useEffect(() => {
    if (isFocused) {
      setErrors({});
    }
  }, [isFocused]);

  const handleBlur = (fieldName: keyof FormErrors) => {
    const value = formData[fieldName];
    if (!value) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: `${fieldName === 'username' ? 'Email' : 'Password'} is required`,
      }));
    } else {
      setErrors(prev => ({...prev, [fieldName]: ''}));
    }
  };

  const handleChange = (fieldName: keyof FormErrors, value: string) => {
    setFormData(prev => ({...prev, [fieldName]: value}));
    if (errors[fieldName]) {
      setErrors(prev => ({...prev, [fieldName]: ''}));
    }
  };

  const handleSignIn = async () => {
    setLoginLoading(true);
    try {
      const resLogin = await dispatch(signInAction(formData));
      if (resLogin?.payload?.code === 'OK') {
        Toast.show('Login successfully', 2);
        navigation.replace('HomeSc' as any);
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const goToSignUp = () => {
    resetErrorMessage();
    navigation.navigate('Signup' as any);
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
            onPress={() => setEnvTouchesCNT(prev => prev + 1)}>
            <View>
              <Text style={styles.signInTxt}>Sign In</Text>
            </View>
          </TouchableWithoutFeedback>

          <TextInput
            value={formData.username}
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
            value={formData.password}
            isValid={errors.password}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <View style={styles.forgotPassRow}>
            <View />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword' as any)}>
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
      {loginLoading && <Loader />}
    </View>
  );
}
