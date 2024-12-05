import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import AddCard from './AddCard';
import PaymentHistoryTopTab from '../../navigation/PaymentHistoryTab';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {colors} from '../../assets/colors';
import Loader from '../../components/Loader/Loader';

const Mybills = ({navigation}: any) => {

  const onPress = () => {
    navigation.pop();
  };

  const goToNotification = () => navigation.navigate('NotificationSc');

  const loading = useAppSelector((state: RootState) => state.payments?.loading);

  return (
    <View style={styles.container}>
      <HeaderBg height={'16%'}>
        <TopNavigationView
          title="Payments"
          onTap={onPress}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={{flex: 1, top: -15}}>
        <PaymentHistoryTopTab />
      </View>
      {loading && <Loader/>}
    </View>
  );
};

export default Mybills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.white
  },
  webview: {
    flex: 1,
  },
});
