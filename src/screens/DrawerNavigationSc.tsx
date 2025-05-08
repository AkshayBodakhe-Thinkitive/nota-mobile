import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/storeConfig';
import HomeSc from './Home/HomeSc';
import { MedicalRecordsMenu } from './medicalRecord/screens/MedicalRecordsMenu';
import ProfileScreen from './profile/ProfileScreen';
import BookAppointmentSc from './schedulingManagement/BookAppointmentSc';
import MessagesSc from './Message/MessagesSc';
import { ImagePath1 } from '../Constants1/ImagePathConstant1';
import LogoutModal from './authentication/components/LogoutModal';
import { logoutAction } from '../redux/reducers/auth/async-actions/logoutAction';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeSc}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="home-outline"
              size={size}
              color={focused ? '#0097F0' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={BookAppointmentSc}
        options={{
          title: 'Appointment',
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="calendar-outline"
              size={size}
              color={focused ? '#0097F0' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medical Record"
        component={MedicalRecordsMenu}
        options={{
          title: 'Medical Records',
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="file-document-outline"
              size={size}
              color={focused ? '#0097F0' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <PersonIcon
              name="person-outline"
              size={size}
              color={focused ? '#0097F0' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DrawerNavigationSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {width, height} = Dimensions.get('window');
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    loggedIn === false  && navigation.replace('SignIn');
  }, [loggedIn,loginData]);

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const guidelineBaseHeight = 812;
  const guidelineBaseWidth = 375;
  const Capitalize = (str: string) => {
    if (!str || str.length === 0) {
        return str; // Return empty string or undefined as is
    }
    
    return str.charAt(0).toUpperCase() + str.slice(1);
};
  const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;


  const handlelogout = async () => {
   await dispatch(
      logoutAction({
        accessToken: loginData?.data?.accessToken,
        refreshToken: loginData?.data?.refreshToken,
      }),
    );
    navigation.replace('SignIn');
  };

  const logoutFun = () => {
    setShowLogoutModal(false);
    handlelogout()
  };


  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props} style={{height: 100}}>
        <View>
          <TouchableOpacity
            style={{padding: 8, alignItems: 'center', flexDirection: 'row'}}
            onPress={() =>
              props.navigation.navigate('ProfileScreen', {isback: true})
            }>
            <Image
              source={
                profileData?.data?.avatar === null
                  ? ImagePath1.personImg
                  : {
                      uri: profileData?.data?.avatar,
                    }
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 25, 
                borderColor: '#0097F0',
              }}
            />
            <View style={{width:'65%'}}>
              <Text style={{paddingLeft: 15,fontSize:responsiveFontSize(1.8),fontWeight:'bold', fontFamily:fontType.Roboto_Medium,color: 'black'}}>
                {Capitalize(profileData?.data?.legalFirstName) +
                  ' ' +
                  Capitalize(profileData?.data?.legalLastName)}
              </Text>
              <Text
                style={{
                  color: '#0097F0',
                  paddingLeft: 15,
                  paddingTop: 5,
                  fontWeight: 'bold',
                }}>
                View and Edit profile
              </Text>
            </View>
            <View style={{}}>
              <PaymentIcon
                name="arrow-forward-ios"
                size={21}
                paddingLeft={20}
                color={colors.navala_grey}
                fontWeight="bold"
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: colors.navala_grey,
            }}
          />
        </View>
        <View>
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <Icon
                  name={'home-outline'}
                  size={24}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Home'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={24}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() => props.navigation.navigate('HomeSc')}
          />
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <PersonIcon
                  name={'person-outline'}
                  size={24}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Clinics'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={24}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() => props.navigation.navigate('ProvidersListScreen')}
          />
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <Icon
                  name={'calendar-outline'}
                  size={24}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Appointments'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={24}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() =>
              props.navigation.navigate('BookAppointmentSc', {isBack: true})
            }
          />
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <PaymentIcon
                  name={'payment'}
                  size={24}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Payments History'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={24}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() => props.navigation.navigate('Mybills')}
          />
        </View>
        <View
          style={{height: Platform.OS === 'android' ? '40%' : '50%'}}></View>
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: colors.navala_grey,
          }}
        />
        <View
          style={[Platform.OS === 'android' && {height: horizontalScale(450)}]}>
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <PersonIcon
                  name={'settings-outline'}
                  size={24}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Settings'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={24}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() => props.navigation.navigate('SettingSc')}
          />
          <DrawerItem
            label={() => (
              <View style={{flexDirection: 'row', width: '110%'}}>
                <PaymentIcon
                  name={'logout'}
                  size={21}
                  color={colors.navala_grey}
                />
                <Text
                  style={{
                    color: colors.navala_grey,
                    marginLeft: 21,
                    fontFamily: fontType.Roboto_Regular,
                  }}>
                  {'Logout'}
                </Text>
                <PaymentIcon
                  name={'arrow-forward-ios'}
                  size={21}
                  color={colors.navala_grey}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            )}
            onPress={() => {
              setShowLogoutModal(!showLogoutModal);
            }}
          />
        </View>
        <LogoutModal
            show={showLogoutModal}
            setShow={setShowLogoutModal}
            onLogout={logoutFun}
          />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="HomeSc"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeSc"
        component={HomeTab}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home-outline"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigationSc;

const styles = StyleSheet.create({});
