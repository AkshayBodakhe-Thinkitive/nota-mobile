import React, {useEffect, useState} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import TextInput from '../../../components/TextInput/TextInput';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import Loader from '../../../components/Loader/Loader';
import MedicationsTopTabs from '../../../navigation/MedicationsTopTab';
import Button from '../../../components/ButtonComponent/ButtonComponent';

const MedicationSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const medicationsData = useAppSelector(
    (state: RootState) => state.medicalrecord.medicationsData,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );

  useEffect(() => {
    // let UUID = profileData?.data?.uuid
    // if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
    //     UUID = uuidForMedicalRecords
    // }
    // if (UUID) {
    //     setPatientUUID(UUID)
    //     dispatch(
    //         getMedicationsAction({
    //           patientUUID: UUID,
    //           page: '0',
    //         }),
    //     );
    // }
  }, [loginData?.data?.accessToken]);

  const goBack = () => {
    navigation.pop();
  };

  const goToNotification = () => navigation.navigate('NotificationSc');

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '16%'}>
        <TopNavigationView
          title="Medications"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <MedicationsTopTabs></MedicationsTopTabs>
      <View style={styles.btnContainer}>
        <Button
          title="Add Medications"
          onPress={() => navigation.navigate('AddMedication',{update:false})}
        />
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default MedicationSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    position: 'absolute',
    top: 120,
    height: '98%',
    width: '100%',
    paddingHorizontal: 15,
  },
  screenName: {
    color: colors.navala_grey, 
    fontSize: 12,
    marginLeft: 20,
  },
  locationName: {
    color: colors.new_black, 
    fontSize: 12,
    marginLeft: 20,
    top: 5,
    fontFamily: fontType.Roboto_Medium,
  },
  btnContainer: {
    bottom: '3%',
    // position: 'absolute',
    paddingHorizontal: '3%',
    paddingTop:5,
    width: '100%',
    backgroundColor : colors.white
  },
});
