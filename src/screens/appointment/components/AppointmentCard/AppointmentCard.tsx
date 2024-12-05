import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import {FeatherIcon} from '../../../../components/Icons/FeatherIcon';
import Row from '../../../../components/Row/Row';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import CustomText from '../../../../components/Text/CustomText';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {colors} from '../../../../assets/colors';
import {fontType} from '../../../../assets/fontType';
import MaterialCommunityIcons from '../../../../components/Icons/MaterialCommunityIcons';
import {MaterialIcons} from '../../../../components/Icons/MaterialIcons';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import {useAppDispatch, useAppSelector} from '../../../../redux/store/hooks';
import {RootState} from '../../../../redux/store/storeConfig';
import AppointmentStatus from './AppointmentStatus';
import {clearZoomTokenData} from '../../../../redux/reducers/zoom/ZoomReducer';
import {cancelAppointmentAction} from '../../../../redux/reducers/home/aysnc-actions/cancelAppointmentAction';
import Toast from 'react-native-simple-toast';
import {clearCancelAppointmentData} from '../../../../redux/reducers/home/HomeReducer';
import {getUpcomingAppointmentAction} from '../../../../redux/reducers/home/aysnc-actions/getUpcomingAppointment';
import {Text} from 'react-native-paper';
import Button from '../../../../components/ButtonComponent/ButtonComponent';
import AppointmentButtons from './AppointmentButtons';
import { convertAppointmentTime } from '../../constants/appointmentUtils';

type Props = {
  type?: 'upcoming' | 'past';
  status?: string;
  navigation: any;
  data: any;
};

const AppointmentCard = ({type, status, data}: Props) => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const navigation = useNavigation<any>();
  const [appointmentUuid, setAppointmentUuid] = useState('');
  const [showCancel, setShowCancel] = useState(false);

  const result = convertAppointmentTime(data?.appointmentDate, data?.startTime, data?.endTime , data?.timeZone);

  const cancelAppointmentData = useAppSelector(
    (state: RootState) => state.home.cancelAppointmentData,
  );
  const visitDetails = () => {
    navigation.navigate('VisitHistoryDetails',{data:data});
  };
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const goToIntakeForm = () => {
    navigation.navigate('IntakeFormListScreen', {data});
  };

  const cancelAppointment = () => {
    console.log('Press Yes button to cancel an appointment');
    dispatch(
      cancelAppointmentAction({
        accessToken: loginData?.data?.accessToken,
        appointmentId: data?.appointmentId,
        reasonForCancellation: '',
      })
    ).then((res:any)=>{
      Toast.show('Appointment cancelled successfully!', 2);
    })
  };
  useEffect(() => {
    dispatch(clearCancelAppointmentData());
  }, []);
  useEffect(() => {
    if (cancelAppointmentData) {
      dispatch(
        getUpcomingAppointmentAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: profileData?.data?.uuid,
          appointmentState: 'FUTURE',
        }),
      );
      setShowCancel(false);
    }
  }, [cancelAppointmentData]);

  const onPressJoinCall = async () => {
    console.log('data?.appointmentUuid', data?.appointmentUuid);
    setAppointmentUuid(data?.appointmentUuid);
    dispatch(clearZoomTokenData());
    navigation.navigate('ReadyToJoin', {data});
  };
  const Capitalize2 = (str: string) => {
    if (!str) return '';
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };
  
  return (
    <View style={{marginVertical: 10}}>
      <Card width={'100%'} height={'auto'}>
        <View
          style={{
            padding: 12,
            borderBottomWidth: 1,
            borderColor: '#1A1A1A66',
            justifyContent: 'space-between',
            flex: 0.4,
          }}>
          {data?.appointmentDate && (
            <Row>
              <MaterialCommunityIcons
                name="calendar-outline"
                color={colors.primary}
                size={responsiveFontSize(3)}
                style={{marginRight: 10}}
              />
              <CustomText fontSize={responsiveFontSize(1.8)}>
                {moment(result?.date).format('MM/DD/YYYY')}
              </CustomText>

              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <AppointmentStatus>{data?.appointmentStatus}</AppointmentStatus>
                {
                  data?.appointmentStatus == 'NOT_CONFIRMED' || data?.appointmentStatus == 'REQUESTED' ? null : (
                  <TouchableOpacity
                    style={{
                        backgroundColor: colors.new_blue,
                        padding: 4,
                        borderRadius: 5,
                        top: 10,
                    }}
                    onPress={() => goToIntakeForm()}>
                      <Text style={{alignItems: 'center',color:'white',fontWeight:'600'}}>Intake form</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Row>
          )}

          {data?.startTime && (
            <Row style={{marginTop: 10}}>
              <FeatherIcon
                name="clock"
                color={colors.primary}
                size={responsiveFontSize(3)}
                style={{marginRight: 10}}
              />
              <CustomText fontSize={responsiveFontSize(1.8)}>
              {moment(result?.startTime, 'HH:mm').format('hh:mm A') + ' to ' + moment(result?.endTime, 'HH:mm').format('hh:mm A')}
              </CustomText>
            </Row>
          )}
          {/* locationName */}
          {data?.locationName && (
            <Row style={{marginTop: 10}}>
              <MaterialIcons
                name="location-on"
                color={colors.primary}
                size={responsiveFontSize(3)}
                style={{marginRight: 10}}
              />
              <CustomText fontSize={responsiveFontSize(1.8)}>
                {data?.locationName}
              </CustomText>
            </Row>
          )}
        </View>
        <View
          style={{
            padding: 12,
            flex: 0.6,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'space-between',
            }}>
            {data?.appointmentType && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Appointment Type
                </CustomText>
                <CustomText
                  style={{
                    width: '40%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {Capitalize2(data?.appointmentType)}
                </CustomText>
              </Row>
            )}
            {data?.presentType && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Visit Type
                </CustomText>
                <CustomText
                  style={{
                    width: '40%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {Capitalize2(data?.presentType)}
                </CustomText>
              </Row>
            )}
            {data?.providerName && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Provider name
                </CustomText>
                <CustomText
                  style={{
                    width: '40%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {data?.providerName}
                </CustomText>
              </Row>
            )}
            {data?.clinicName && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Clinic name
                </CustomText>
                <CustomText
                  style={{
                    width: '40%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {data?.clinicName}
                </CustomText>
              </Row>
            )}
            {data?.patientName && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Patient name
                </CustomText>
                <CustomText
                  style={{
                    width: '40%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {data?.patientName}
                </CustomText>
              </Row>
            )}
            {data?.reasonOfVisit && (
              <Row style={{marginTop: 10}}>
                <CustomText
                  style={{
                    width: '40%',
                    color: '#00000066',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  Reason
                </CustomText>
                <CustomText
                  style={{
                    width: '50%',
                    fontSize: responsiveFontSize(1.8),
                  }}>
                  {data?.reasonOfVisit}
                </CustomText>
              </Row>
            )}
          </View>
          {type === 'upcoming' ? (
            <AppointmentButtons
            data={data} 
            onPressJoinCall={onPressJoinCall} 
            setShowCancel={setShowCancel} 
          />
          ) : (
            <>
           {data?.encounterUuid && <Row style={{flex: 0.3, justifyContent: 'flex-end'}}>
              <SmallButton
                onPress={visitDetails}
                outlined
                title="View Visit Details"
                containerStyle={{width: '46%',marginTop : 10}}
              />
            </Row>}
            </>
          )}
        </View>
      </Card>
      <ModalPopup show={showCancel} setShow={setShowCancel}>
        <View style={{alignItems: 'center'}}>
          <CustomText
            fontFamily={fontType.Roboto_Medium}
            fontSize={responsiveFontSize(2.4)}
            style={{marginBottom: responsiveHeight(2)}}>
            Cancel Appointment
          </CustomText>
          <CustomText
            fontSize={responsiveFontSize(2)}
            style={{textAlign: 'center', marginBottom: responsiveHeight(3)}}>
            Are you sure you want to cancel the appointment?
          </CustomText>
        </View>
        <Row style={{justifyContent: 'space-between'}}>
          <SmallButton
            outlined
            title="Yes"
            containerStyle={{width: '46%', borderColor: '#FF2300'}}
            textStyle={{color: '#FF2300'}}
            onPress={() => cancelAppointment()}
          />
          <SmallButton
            outlined
            title="No"
            containerStyle={{width: '46%'}}
            onPress={() => setShowCancel(false)}
          />
        </Row>
      </ModalPopup>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({});
