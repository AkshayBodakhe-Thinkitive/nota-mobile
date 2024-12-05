import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import CustomText from '../../components/Text/CustomText';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import MaterialCommunityIcons from '../../components/Icons/MaterialCommunityIcons';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import ProfileTabNavigator from '../../navigation/ProfileTabNavigator';
import {getProfileAction} from '../../redux/reducers/profile/async-action/getProfileAction';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';

const ProfileScreen = (routes: any) => {
  const {navigation, route} = routes && routes;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const Capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    dispatch(getProfileAction({accessToken: loginData?.data?.accessToken}));
  }, [loginData?.data?.accessToken, isFocused]);

  const onPress = () => {
    navigation.navigate('EditProfileScreen');
  };
  const goBack = () => {
    navigation.navigate('DrawerNavigationSc');
  };

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <HeaderBg height={'20%'}>
        <Header
          title="My Profile"
          onPress={goBack}
          isHideBackButton={
            routes?.route?.params?.isback === true ? false : true
          }
          leftIcon={
            <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileScreen')}>
            <ImageBackground
              source={require('../../assets/images/bellBg1.png')}
              style={styles.bellBg}>
            
                <MaterialCommunityIcons
                  name="pencil-outline"
                  color={colors.black}
                  size={responsiveFontSize(2.8)}
                />
            </ImageBackground>
            </TouchableOpacity>
          }></Header>
        <View style={{alignSelf: 'center'}}>
          {loading && (
            <View style={styles.imageContainer}>
              <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator}/>
            </View>
          )}
           <View style={styles.imageContainer}>
          <Image
            source={
              profileData?.data?.avatar === null
                ? ImagePath1.personImg
                : {
                    uri: profileData?.data?.avatar,
                  }
            }
            resizeMode="cover"
            style={styles.image1}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          </View>
        </View>
      </HeaderBg>
      <View style={styles.patDetailsContainer}>
        <CustomText
          fontSize={responsiveFontSize(2)}
          fontFamily={fontType.Roboto_Medium}>
          {Capitalize(profileData?.data?.legalFirstName) +
            ' ' +
            Capitalize(profileData?.data?.legalLastName)}
        </CustomText>
        <CustomText fontSize={responsiveFontSize(1.7)} color={colors.navala_grey}>
          {profileData?.data?.id}
        </CustomText>
      </View>
      <View style={{flex: 1}}>
        <ProfileTabNavigator></ProfileTabNavigator>
      </View>
    </View>
  );
};

export default ProfileScreen;

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
  image1: {
    width: 100,
    height: 100,
    borderRadius: borderRadiusPixel,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadiusPixel,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    position: 'absolute',
    alignSelf:'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  patDetailsContainer: {
    // borderWidth: 1,
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
  loadingIndicator: {
    position: 'absolute',
  },
});
