import React, {useEffect} from 'react';
import {FlatList, Platform, View} from 'react-native';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import VisitHistoryCard from '../components/visitHistoryCard/VisitHistoryCard';
import {DemographicScreenStyles as styles} from '../styles/DemoGraphicScreenStyles';
import {RootState} from '../../../redux/store/storeConfig';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {getVisitHistoryAction} from '../../../redux/reducers/medicalrecord/aysnc-action/getVisitHistoryAction';
import moment from 'moment';
import {Text} from 'react-native-paper';
import {fontType} from '../../../assets/fontType';
import Loader from '../../../components/Loader/Loader';
import { setViewMoreVisitDetails } from '../../../redux/reducers/medicalrecord/medicalRecordReducer';

const VisitHistorySc = ({navigation}: any) => {
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const dispatch = useAppDispatch();
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const visitHistoryData = useAppSelector(
    (state: RootState) => state.medicalrecord.visitHistoryData,
  );

  useEffect(() => {
    let UUID = profileData?.data?.uuid;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
      dispatch(
        getVisitHistoryAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: UUID,
        }),
      );
    }
  }, [loginData?.data?.accessToken]);

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
      <View style={styles.scrollView}>
        {visitHistoryData?.data?.empty === false ? (
          <FlatList
            data={visitHistoryData?.data?.content}
            contentContainerStyle={[{paddingHorizontal: 5}]}
            renderItem={({item, index}) => {
              //Formatting visit date
              const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const formattedVisitDate = moment(item.visitDate).zone(timeZone).format('MM/DD/YYYY, h:mm A');
              //Taking out medicine from patientMedications and add comma
              let visitMedicines: [String] = item.patientMedications?.map((data: any)=>{
                return `${data?.drugCatalog?.medicine}, `
              })

              //Removing comma & extra space from last element
              if (visitMedicines?.length > 0) {
                let lastMedicine = visitMedicines[visitMedicines.length - 1]
                var commaNSpaceRemovedLastMedicine = lastMedicine?.substring(0, lastMedicine.length - 2)
                visitMedicines[visitMedicines.length - 1] = commaNSpaceRemovedLastMedicine
              }
              
              return (
                <VisitHistoryCard 
                    visitDate={formattedVisitDate}
                    location={item.location}
                    reasonForVisit={item.reasonForVisit}
                    medication={visitMedicines}
                    onTapViewMore={()=>{
                        console.log('Item: ', JSON.stringify(item))
                        dispatch(setViewMoreVisitDetails(item))
                        navigation.navigate('VisitHistoryDetailsSc')
                    }}
                />
              );
            }}
          />
        ) : (
          <View style={{height: 100, width: '100%'}}>
            <Text
              style={{
                top: 50,
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                fontWeight: '600',
                color: 'black'
              }}>
              Visit details not found
            </Text>
          </View>
        )}
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default VisitHistorySc;
