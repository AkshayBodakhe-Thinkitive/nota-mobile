import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import TextInput from '../../../components/TextInput/TextInput';
import Row from '../../../components/Row/Row';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import CustomText from '../../../components/Text/CustomText';
import {useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {post} from '../../../config/AxiosConfig';

const ShareMedRecordModal = ({show, setShow}: any) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const isValidEmail = (email: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const cancelPress = () => setShow(false);

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );


  const accessToken = useAppSelector(
    (state: RootState) => state.auth.loginData?.data?.accessToken,
  );

  const handleShare = async () => {
    const uuid = uuidForMedicalRecords ? uuidForMedicalRecords : patientId
    if (!isValidEmail(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response: any = await post(
          `patient/share/${uuid}/${email}`,
          {},
          {headers},
        );
        console.log('share response =>', response);
        if (response?.code === 'OK') {
          setShow(false);
          Alert.alert('Success', response?.message);
        }
      } catch (error) {
        console.log('share error =>', error);
      }
    }
  };

  return (
    <ModalPopup show={show}>
      <View style={{alignItems: 'center', marginVertical: '3%'}}>
        <Text style={{fontSize: responsiveFontSize(3)}}>Share PDF</Text>
      </View>
      <TextInput
        label="Enter email to share PDF of this medical chart"
        placeholder="Enter Email"
        onChangeText={(text: any) => setEmail(text)}
        isValid={emailValid}
        autoCapitalize={'none'}
      />
      {emailValid && (
        <CustomText color="red" fontSize={responsiveFontSize(1.5)}>
          Please Enter Valid Email
        </CustomText>
      )}
      <Row style={{justifyContent: 'flex-end', marginTop: 8}}>
        <Button
          buttonStyle={{width: '35%', marginRight: 8}}
          outlined
          title="Cancel"
          onPress={cancelPress}
        />
        <Button
          buttonStyle={{width: '35%'}}
          title="Share"
          onPress={handleShare}
        />
      </Row>
    </ModalPopup>
  );
};

export default ShareMedRecordModal;

const styles = StyleSheet.create({});
