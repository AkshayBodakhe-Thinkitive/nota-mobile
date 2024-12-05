import moment from 'moment';
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
import { colors } from '../../../assets/colors';
import { fontType } from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import { getProblemsAction } from '../../../redux/reducers/medicalrecord/aysnc-action/getProblemsAction';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';
import ProblemCard from '../components/problemCard/problemCard';
import Button from '../../../components/ButtonComponent/ButtonComponent';

const ProblemSc = ({navigation}: any) => {
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const dispatch = useAppDispatch();
  const uuidForMedicalRecords = useAppSelector((state: RootState) => state.medicalrecord.uuidForMedicalRecords);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const problemData = useAppSelector(
    (state: RootState) => state.medicalrecord.problemData,
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
            getProblemsAction({
              accessToken: loginData?.data?.accessToken,
              patientUUID: UUID,
              page: '0',
              size: '10',
            }),
        );
    }
    setUpdate(false)
  }, [loginData?.data?.accessToken,update]);

  const goToNotification = () => navigation.navigate('NotificationSc');
  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '22%' : '22%'}>
        <TopNavigationView
          title="Diagnoses"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.scrollView}>
        {problemData?.data?.empty === false ? (
          <FlatList
          contentContainerStyle={{marginBottom:50}}
            data={problemData?.data?.content}
            renderItem={({item, index}) => {
              return (
                <ProblemCard
                  name={item?.billingCodes?.code + ' ' +  item?.billingCodes?.description}
                  status={item?.active === true ? 'Active': 'Historical'} 
                  type={item?.type}
                  note={item?.note}
                  onsetDate={ item?.diagnosedDate ? moment(item?.diagnosedDate).format('MM/DD/YYYY') : '-'}
                  onPressEdit={()=>navigation.navigate('AddDiagnosis',{update:true,item:item,edit:setUpdate})}
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
            No diagnoses for the patient
          </Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Add Diagnoses"
          onPress={() => navigation.navigate('AddDiagnosis',{update:false,edit:setUpdate})}
        />
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default ProblemSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(18),
    // marginBottom: responsiveHeight(3),
  },
  scrollView: {
    position: 'absolute',
    top: 125,
    height: '98%',
    width: '100%',
    paddingHorizontal: 15,
  },
  btnContainer: {
    bottom: '3%',
    position: 'absolute',
    paddingHorizontal: '3%',
    width: '100%',
  },
});
