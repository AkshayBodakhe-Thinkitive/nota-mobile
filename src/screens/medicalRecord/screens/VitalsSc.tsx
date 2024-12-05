import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {getVitalAction} from '../../../redux/reducers/medicalrecord/aysnc-action/getVitalsAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import VitalsCard from '../components/vitalscard/VitalsCard';
import {getVitalIcon, getVitalNameStr} from '../constants/utils';
import {getUniqueRecordsByNameWithLatestDate} from '../constants/utils';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Row from '../../../components/Row/Row';

const {height, width} = Dimensions.get('screen');

const VitalsSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );
  const vitalData = useAppSelector(
    (state: RootState) => state.medicalrecord.vitalsData,
  );

  // console.log(JSON.stringify(vitalData))

  const [uniqueVitals,setuniqueVitals] = useState<any>([])

  useEffect(()=>{
    const uniqueVitals = getUniqueRecordsByNameWithLatestDate(
      vitalData?.data?.content,
    );
    setuniqueVitals(uniqueVitals)
  },[vitalData])

  const [update,setUpdate] = useState(false)

console.log("uuidForMedicalRecords  ",uuidForMedicalRecords);

  useEffect(() => {
    let UUID = profileData?.data?.uuid;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
      dispatch(
        getVitalAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: UUID,
          refreshToken: loginData?.data?.refreshToken,
        }),
      );
    }
    setUpdate(false)
  }, [loginData?.data?.accessToken,update]);

  const goBack = () => {
    navigation.pop();
  };



  // console.log(JSON.stringify(uniqueVitals))

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '20%' : '20%'}>
        <TopNavigationView
          title="Vitals"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>

      <View style={styles.scrollView}>
        {uniqueVitals.length > 0 ? (
          <FlatList
            data={uniqueVitals}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <VitalsCard
                title={getVitalNameStr(item.name)}
                highTitle={item.highTitle}
                lowTitle={item.lowTitle}
                highValue={item.value1}
                lowValue={item.value2}
                unit={item.unit}
                singleValue={item.singleValue}
                image={getVitalIcon(item.name)}
                datestr={moment(item.recordedDate).format('MM/DD/YYYY HH:MM A')}
                onPressHistory={() =>
                  navigation.navigate('VitalHistoryScreen', {item: item})
                }
              />
            )}
          />
        ) : (
          <View style={{height: 100, width: '100%'}}>
            <Text
              style={{
                top: 50,
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                color: 'black',
              }}>
              No vitals for the patient
            </Text>
          </View>
        )}
      </View>
      <Row style={styles.btnContainer}>
      <Button
          title="Edit Vitals"
          onPress={() => navigation.navigate('AddVitals',{update:true,item:uniqueVitals,edit:setUpdate})}
          buttonStyle={{width:'49%'}}
          outlined
        />
        <Button
          title="Add Vitals"
          onPress={() => navigation.navigate('AddVitals',{udpate:false,edit:setUpdate})}
          buttonStyle={{width:'49%'}}
        />
      </Row>
      {loading && <Loader />}
    </View>
  );
};

export default VitalsSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 60,
    //
  },
  scrollView: {
    position: 'absolute',
    top: height * 0.14,
    height: '98%',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 60,
    paddingBottom: 100,
    backgroundColor: colors.white,
  },
  btnContainer: {
    bottom: '3%',
    position: 'absolute',
    paddingHorizontal: '3%',
    width: '100%',
    justifyContent:'space-between'
  },
});
