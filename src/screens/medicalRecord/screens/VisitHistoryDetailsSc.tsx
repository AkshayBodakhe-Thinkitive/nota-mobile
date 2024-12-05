import React, {useEffect} from 'react';
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

const VisitHistoryDetailsSc = ({navigation}: any) => {
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const dispatch = useAppDispatch();

  const visitDetails = useAppSelector(
    (state: RootState) => state.medicalrecord.viewMoreVisitDetails,
  );

  useEffect(() => {
    console.log('Details:', visitDetails);
    return () => {
      console.log('Resetting View More VisitDetails');
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
          name={visitDetails?.patientName}
          idNo={visitDetails?.appointmentUuid}
          birthDate={visitDetails?.birthDate}
          providerName={visitDetails?.providerName}
          appointmentDate={visitDetails?.visitDate}
        />
        <PrescriptionCard
            prescription={visitDetails?.patientMedications}
        />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default VisitHistoryDetailsSc;

const style = StyleSheet.create({
  scrollviewContainer: {
    position: 'absolute',
    top: 120,
    width: '100%',
    paddingHorizontal: 15,
  },
});
