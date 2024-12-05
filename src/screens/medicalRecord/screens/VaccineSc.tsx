import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
// import { ImagePath } from '../../../constants/ImagePaths';
import moment from 'moment';
import { colors } from '../../../assets/colors';
import { fontType } from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import Loader from '../../../components/Loader/Loader';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import { getVaccineAction } from '../../../redux/reducers/medicalrecord/aysnc-action/getVaccinesAction';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';
import VaccineCard from '../components/VaccineCard/VaccineCard';
import { DemographicScreenStyles } from '../styles/DemoGraphicScreenStyles';
import Button from '../../../components/ButtonComponent/ButtonComponent';

const VaccineSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const uuidForMedicalRecords = useAppSelector((state: RootState) => state.medicalrecord.uuidForMedicalRecords);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const vaccineData = useAppSelector(
    (state: RootState) => state.medicalrecord.vaccineData,
  );
  const goBack = () => {
    navigation.pop();
  };

  const [update,setUpdate] = useState(false)

  useEffect(() => {
    let UUID = profileData?.data?.uuid
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
        UUID = uuidForMedicalRecords
    }
    if (UUID) {
      dispatch(
        getVaccineAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: UUID,
          page: '0',
          size: '10',
        }),
      );
    }
    setUpdate(false)
  }, [loginData?.data?.accessToken,update]);

  // console.log(
  //   'vaccineData in vaccine  ',
  //   JSON.stringify(vaccineData?.data?.content),
  // );

  const Capitalize = (str: string) => {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const Capitalize2 = (str: string) => {
    if (!str) return ''; 
    // Convert the entire string to lowercase and then capitalize the first letter
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };

  const goToNotification = () => navigation.navigate('NotificationSc');

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '20%' : '22%'}>
        <TopNavigationView
          title="Vaccines"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={DemographicScreenStyles.scrollView}>
        {vaccineData?.data?.empty === false ? (
          <FlatList
            data={vaccineData?.data?.content}
            contentContainerStyle={{marginHorizontal:5}}
            renderItem={({item, index}) => {
              return (
                <VaccineCard
                  vaccineName={item?.vaccine}
                  status={
                    Capitalize2(item?.type)
                  }
                  doseDuration={item?.dose}
                  startDate={item?.administerDate ? moment(item?.administerDate).format('MM/DD/YYYY'): '-'}//{item?.administerDate}
                  note={item?.note}
                  item={item}
                  setUpdate={setUpdate}
                  onPressEdit={()=>navigation.navigate('AddVaccine',{update:true,item:item,edit:setUpdate})}
                />
              );
            }}
          />
        ) : (
          <View
        style={{height:100,width:'100%'}}>
          <Text
            style={{
              top: 50,
              alignSelf: 'center',
              fontFamily: fontType.Roboto,
              color: 'black',
            }}>
            No vaccines for the patient
          </Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Add Vaccine"
          onPress={() => navigation.navigate('AddVaccine',{update:false,edit:setUpdate})}
        />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default VaccineSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(18),
    // marginBottom: responsiveHeight(3),
  },
  scrollView: {
    position: 'absolute',
    top: 130,
    height: '98%',
    width: '100%',
  },
  btnContainer: {
    bottom: '3%',
    position: 'absolute',
    paddingHorizontal: '3%',
    width: '100%',
  },
});
