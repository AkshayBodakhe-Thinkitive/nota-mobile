import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fontType } from '../../assets/fontType';
import { getUpcomingAppointmentAction } from '../../redux/reducers/home/aysnc-actions/getUpcomingAppointment';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/storeConfig';
import AppointmentCard from './components/AppointmentCard/AppointmentCard';

const UpcomingAppointments = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const upcomingAppointmentData = useAppSelector((state: RootState) => state.home.upcomingAppointmentData);

  // console.log("upcomingAppointmentData =>",JSON.stringify(upcomingAppointmentData?.data?.content)) 

  useEffect(() => {
    if (loginData?.data?.accessToken) {

      dispatch(
        getUpcomingAppointmentAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: profileData?.data?.uuid,
          appointmentState:'FUTURE'
        }),
      );
    }
  }, [loginData?.data?.accessToken,isFocused]);

  console.log(" upcomingAppointmentData?.data?.content   ",upcomingAppointmentData?.data?.content);
  

  return (
    <View style={styles.container}>
      {upcomingAppointmentData?.data?.empty === false ? (
      <FlatList
        data={upcomingAppointmentData?.data?.content}
        contentContainerStyle={{padding: 10}}
        renderItem={({item}) => {
          return <AppointmentCard type="upcoming" status={item.status} navigation={navigation} data = {item}/>;
        }}
      />
      ) :  <View
      style={{height:100,width:'100%'}}>
        <Text
          style={{
            top: 50,
            alignSelf: 'center',
            fontFamily: fontType.Roboto,
            color: 'black',
          }}>
        No upcoming appointment for the patient
      </Text>
      </View> }
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
