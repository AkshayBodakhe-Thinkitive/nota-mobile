import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {DemographicScreenStyles as styles} from '../styles/DemoGraphicScreenStyles';
import {RootState} from '../../../redux/store/storeConfig';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import Loader from '../../../components/Loader/Loader';
import AppointmentDetailsCard from '../components/visitHistoryCard/AppointmentDetailsCard';
import {setViewMoreVisitDetails} from '../../../redux/reducers/medicalrecord/medicalRecordReducer';
import PrescriptionCard from '../components/visitHistoryCard/PrescriptionCard';
import {useRoute} from '@react-navigation/native';
import { getVisitHistoryDetailsAction } from '../../../redux/reducers/medicalrecord/aysnc-action/getVisitHistoryDetailsAction';

const VisitHistoryDetails = ({navigation}: any) => {
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const dispatch = useAppDispatch();

  const route = useRoute<any>();

  const data = route.params;

  const appointmentData = data?.data;

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);

  const [visitData, setVisitData] = useState();

  useEffect(() => {
    dispatch(
      getVisitHistoryDetailsAction({
        accessToken: loginData?.data?.accessToken,
        encounterUuid: appointmentData?.encounterUuid,
      }),
    ).then((data: any) => {
      const medicationData =
        data?.payload?.data?.encounterPlan?.patientMedications;
      setVisitData(medicationData);
    });

    return () => {
      dispatch(setViewMoreVisitDetails(null));
    };
  }, []);

  const goBack = () => {
    navigation.pop();
  };

  const goToNotification = () => navigation.navigate('NotificationSc');
  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '25%' : '22%'}>
        <TopNavigationView
          title="Visit History"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={style.scrollviewContainer}>
        <AppointmentDetailsCard
          name={appointmentData?.patientName}
          idNo={appointmentData?.appointmentUuid}
          birthDate={appointmentData?.dob}
          providerName={appointmentData?.providerName}
          appointmentDate={appointmentData?.appointmentDate}
        />
        <PrescriptionCard prescription={visitData} />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default VisitHistoryDetails;

const style = StyleSheet.create({
  scrollviewContainer: {
    position: 'absolute',
    top: 120,
    width: '100%',
    paddingHorizontal: 15,
  },
});