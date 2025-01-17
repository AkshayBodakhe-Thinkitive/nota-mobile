import React, {useEffect, useState} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {fontType} from '../../../../assets/fontType';
import {useAppDispatch, useAppSelector} from '../../../../redux/store/hooks';
import {RootState} from '../../../../redux/store/storeConfig';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {colors} from '../../../../assets/colors';
import MedicationCard from './MedicationCard';
import {getCurrentMedicationsAction} from '../../../../redux/reducers/medicalrecord/aysnc-action/getCurrentMedicationsAction';

const CurrentMedications = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const medicationsData = useAppSelector(
    (state: RootState) => state.medicalrecord.currentMedicationsData,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const [patientUUID, setPatientUUID] = useState('');

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let UUID = profileData?.data?.uuid;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
      setPatientUUID(UUID);
      dispatch(
        getCurrentMedicationsAction({
          patientUUID: UUID,
          page: '0',
        }),
      );
    }
  }, [loginData?.data?.accessToken]);

  const fetchPagedMedications = () => {
    console.log('fetchPaged current Medications:', medicationsData?.data?.last);
    if (!medicationsData?.data?.last) {
      if (pageNumber < medicationsData?.data?.totalPages) {
        let page = pageNumber + 1;
        setPageNumber(page);
        console.log('Page Number updated:', pageNumber);
        let data = {
          patientUUID: patientUUID,
          page: pageNumber,
        };
        dispatch(getCurrentMedicationsAction(data));
      }
    }
  };

  return (
    <View style={styles.contentContainer}>
      {medicationsData?.data?.empty === false ? (
        <FlatList
          onEndReachedThreshold={0.5}
          contentContainerStyle={[
            {paddingHorizontal: 12, paddingTop: 8, paddingBottom: 16},
          ]}
          onEndReached={fetchPagedMedications}
          data={medicationsData?.data?.content}
          renderItem={({item, index}) => {
            return (
              <MedicationCard
                name={item?.drugCatalog}
                startDate={item?.startDate}
                endDate={item?.endDate}
                dosageTime={item?.dosageTime}
                dosageUnit={item?.dosageUnit}
                dosageWhen={item?.dosageWhen}
                duration={item?.duration}
                sig={item?.sig}
                note={item?.note}
                item={item}
                type='current'
              />
            );
          }}
        />
      ) : (
        <View style={{height: 100, width: '100%'}}>
          <Text
            style={{
              top: Platform.OS == 'android' ? 80 : 50,
              alignSelf: 'center',
              fontFamily: fontType.Roboto,
              // fontWeight: 20,
              color: 'black',
            }}>
            No medications found!
          </Text>
        </View>
      )}
    </View>
  );
};

export default CurrentMedications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(15),
    marginBottom: responsiveHeight(3),
  },
  contentContainer: {
    flex: 1,
    marginTop: 8,
  },
  screenName: {
    color: colors.navala_grey, // Change the text color as per your design
    fontSize: 12,
    marginLeft: 20,
    // textAlign: 'center',
  },
  locationName: {
    color: colors.new_black, // Change the text color as per your design
    fontSize: 12,
    marginLeft: 20,
    top: 5,
    // textAlign: 'center',
    fontFamily: fontType.Roboto_Medium,
  },
});
