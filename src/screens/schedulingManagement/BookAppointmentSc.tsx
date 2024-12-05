import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../assets/colors';

import TopNavigationView from '../../common/topNavigationView';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';
import AppointmentTopTabs from '../../navigation/AppointmentTopTab';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/storeConfig';
import Loader from '../../components/Loader/Loader';
const BookAppointmentSc = (routes: any) => {
  const {navigation, route} = routes && routes;
  const onPress = () => {
    navigation.pop();
  };
  const goToNotification = () => navigation.navigate('NotificationSc');

  const loading = useAppSelector(
    (state: RootState) => state.payments?.loading,
  );

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? responsiveHeight(10) : responsiveHeight(15)}>
        <TopNavigationView
          title="Appointments"
          onTap={onPress}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={route?.params ? true : false}
        />
      </HeaderBg>
      <AppointmentTopTabs></AppointmentTopTabs>
      {loading && <Loader/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(12),
  },
});

export default BookAppointmentSc;
