import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {setUUIDForMedicalRecords} from '../../../redux/reducers/medicalrecord/medicalRecordReducer';
import {RootState} from '../../../redux/store/storeConfig';
import Row from '../../../components/Row/Row';
import {EvilIcons} from '../../../components/Icons/EvilIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {EntypoIcons} from '../../../components/Icons/EntypoIcons';
import ShareMedRecordModal from '../components/ShareMedRecord';
import {fontType} from '../../../assets/fontType';
export const MedicalRecordsMenu = (routes: any) => {
  const {navigation, route} = routes && routes;
  const [isBack, setIsBack] = useState(
    route?.params === undefined ? false : true,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setUUIDForMedicalRecords(null));
    };
  }, []);

  const EmptyView = ({source, title}: any) => {
    return (
      <View
        style={{
          alignItems: 'center',
          width: '25%',
          marginHorizontal: 10,
          opacity: 0,
        }}>
        <Image style={styles.icon} source={source} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const RecordButton = ({source, title, opacity = 1, ontap}: any) => {
    return opacity == 0 ? (
      EmptyView({source, title})
    ) : (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          // backgroundColor: 'black',
          width: '25%',
          marginHorizontal: 10,
        }}
        onPress={ontap}>
        <Image style={styles.icon} source={source} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const gotoDemographics = () => {
    navigation.navigate('DemographicScreen');
  };
  const onTap = () => {
    navigation.pop();
  };
  const {height, width} = Dimensions.get('screen');

  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* //{ImagePath.backImage} */}
      {isBack && (
        <TouchableOpacity onPress={onTap} style={{top: -(height * 0.4)}}>
          <Image
            style={{width: 28, height: 25, tintColor: colors.white}}
            source={ImagePath1.backImage}
          />
        </TouchableOpacity>
      )}
      <View style={styles.mainView}>
        <Row
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            top: 15,
            alignItems: 'center',
          }}>
          <Text style={styles.heading}>Medical Records</Text>
          <TouchableOpacity onPress={() => setShowShareModal(true)}>
            <Row
              style={{
                marginRight: 10,
                backgroundColor: colors.primary,
                padding: 5,
                borderRadius: 8,
              }}>
              <EntypoIcons
                name="share"
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(2),
                  marginRight: 5,
                }}
              />
              <Text style={{color: 'white', fontSize: responsiveFontSize(2)}}>
                Share
              </Text>
            </Row>
          </TouchableOpacity>
        </Row>
        <View style={styles.recordContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <RecordButton
              source={ImagePath1.demographicsImage}
              title={'Demographic'}
              ontap={() => {
                navigation.navigate('DemographicScreen');
              }}
            />
            <RecordButton
              source={ImagePath1.vitalsImage}
              title={'Vitals'}
              ontap={() => {
                navigation.navigate('VitalsSc');
              }}
            />
            <RecordButton
              source={ImagePath1.problemsImage}
              title={'Diagnosis'}
              ontap={() => {
                navigation.navigate('ProblemSc');
              }}
            />
            <RecordButton
              source={ImagePath1.allergiesImage}
              title={'Allergies'}
              ontap={() => {
                navigation.navigate('AllergySc');
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <RecordButton
              source={ImagePath1.medicationsImage}
              title={'Medication'}
              ontap={() => {
                navigation.navigate('MedicationSc');
              }}
            />
            <RecordButton
              source={ImagePath1.vaccacineImage}
              title={'Vaccine'}
              ontap={() => {
                navigation.navigate('VaccineSc');
              }}
            />

            <RecordButton
              source={ImagePath1.visitHistoryImage}
              title={'Visit History'}
              ontap={() => {
                navigation.navigate('VisitHistorySc');
              }}
            />
            <RecordButton
              source={ImagePath1.medicalReportImage}
              title={'Documents'}
              // opacity = {0}
              ontap={() => {
                navigation.navigate('DocumentsScreen');
              }}
            />
          </View>
        </View>
      </View>
      <ShareMedRecordModal show={showShareModal} setShow={setShowShareModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    opacity: 0.75,
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainView: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c6c5c5',
    marginBottom: Dimensions.get('window').height * 0.1,
    margin: responsiveFontSize(2),
    height: Platform.OS === 'android' ? responsiveHeight(35) : '38%'
  },
  recordContainer: {
    backgroundColor: 'transparent',
    margin: responsiveFontSize(1),
    height: '85%',
    justifyContent: 'space-evenly',
  },

  icon: {
    // height: Dimensions.get('window').width * 0.19,
    // width: Dimensions.get('window').width * 0.19,
    height: responsiveHeight(8),
    width: responsiveWidth(20),
  },

  heading: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: 'white',
    paddingStart: 10,
  },

  title: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: fontType.Roboto_Regular,
    color: 'white',
  },
});
