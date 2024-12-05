import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { colors } from '../../../assets/colors';
import InputBox from '../../../components/InputBox/InputBox';
import { Email } from '../../../Constants1/screenConstat';

type signupProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function ForgotPasswordSc({
  navigation,
}: signupProps): React.JSX.Element {
  return (
    <View style={styles1.card}>
      <Text style={styles1.forgotPasswordText}>Forgot Password? </Text>
      <Text style={styles1.middleText}>
        We will sent you OPT Code on your email
      </Text>
      <View style={{top: 30, width: '85%', alignSelf: 'center'}}>
        <InputBox
          label={Email}
        />
      </View>
      <TouchableOpacity
        style={styles1.buttonStyle}
        onPress={() => navigation.navigate('VerifyOPT')}>
        <Text style={{top: 15, fontWeight: 'bold'}}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles1 = StyleSheet.create({
  logo: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#0097F0', //blue
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 5,
    top: 50,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    width: '80%',
    textAlign: 'center',
    height: 50,
    top: 30,
    marginTop: 60,
    // flex: 1,
  },
  middleText: {
    fontWeight: '200',
    width: 200,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    color: colors.new_grey,
    top: 20,
  },
  emailTextInput: {
    borderColor: colors.gray_shadow,
    borderWidth: 1,
    height: 50,
    margin: 25,
    paddingStart: 10,
    fontSize: 20,
    top: 20,
    width: '80%',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
    backgroundColor: colors.white,
    shadowColor: colors.gray_shadow,
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
