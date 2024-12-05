import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fontType } from '../../assets/fontType';
import { getPastAppointmentAction } from '../../redux/reducers/home/aysnc-actions/getPastAppoinmentAction';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/storeConfig';
import AppointmentCard from './components/AppointmentCard/AppointmentCard';

const PastAppointments = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const upcomingAppointmentData = useAppSelector((state: RootState) => state.home.pastAppoinmentData);
  //upcomingAppointmentData
  useEffect(() => {
    if (loginData?.data?.accessToken) {

      dispatch(
        getPastAppointmentAction({
          accessToken: loginData?.data?.accessToken,
          patientUUID: profileData?.data?.uuid,
          appointmentState:'PAST'
        }),
      );
    }
  }, [loginData?.data?.accessToken,isFocused]);
  return (
    <View style={styles.container}>
       {upcomingAppointmentData?.data?.empty === false ? (
      <FlatList
        data={upcomingAppointmentData?.data?.content}
        contentContainerStyle={{padding: 10}}
        renderItem={({item}) => {
          return <AppointmentCard type="past" status={item.status} data={item} />;
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
        No past appointment for the patient
      </Text>
      </View> }
    </View>
  );
};

export default PastAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
