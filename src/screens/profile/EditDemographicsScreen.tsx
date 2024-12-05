import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import {useIsFocused} from '@react-navigation/native';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import EditDemographicTab from '../../navigation/EditDemographicTab';
import {getProfileAction} from '../../redux/reducers/profile/async-action/getProfileAction';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';

const EditDemographicsScreen = (routes: any) => {

  const {navigation, route} = routes && routes;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  // console.log('profileData?.data?.avatar', profileData?.data?.avatar);
  useEffect(() => {
    dispatch(getProfileAction({accessToken: loginData?.data?.accessToken}));
  }, [loginData?.data?.accessToken, isFocused]);


  const goBack = () => {
    navigation.pop();
  };
  const goToNotification = () => navigation.navigate('NotificationSc');
  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '15%' : '15%'}>
        <TopNavigationView
          title="Demographics"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={{flex: 1,borderWidth:0,top:"-1%"}}>
        <EditDemographicTab></EditDemographicTab>
      </View>
    </View>
  );
};

export default EditDemographicsScreen;

const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(12);
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pencilBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    width: responsiveWidth(12),
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: borderRadiusPixel,
    color: 'red',
  },
  patDetailsContainer: {
    zIndex: -1,
    height: responsiveHeight(12),
    alignItems: 'center',
    paddingTop: responsiveHeight(7),
  },
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(12),
  },
});
