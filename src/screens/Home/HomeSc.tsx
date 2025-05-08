import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {useIsFocused} from '@react-navigation/native';
import {fontType} from '../../assets/fontType';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {getProfileAction} from '../../redux/reducers/profile/async-action/getProfileAction';
import {getTopRatedProviderAction} from '../../redux/reducers/zoom/async-action/getTopRatedProviderAction';
import {setUUIDForMedicalRecords} from '../../redux/reducers/medicalrecord/medicalRecordReducer';
import ConsultedProviderCard from './ConsultedProviderCard';
import PatientConsentForm from './PatientConsentForm';
import Button from '../../components/ButtonComponent/ButtonComponent';
import StarRating from '../../components/StarRating/StarRating';
import homeScStyles from '../authentication/styles/HomeScreenScStyle';
import {cradData} from '../schedulingManagement/constants/StringConstants';
import {getProviderListAction} from '../../redux/reducers/home/aysnc-actions/getProviderListAction';
import {getConsentFormAction} from '../../redux/reducers/home/aysnc-actions/getConsentFormAction';
import {resetproviderDataUuid} from '../../redux/reducers/home/HomeReducer';
import {getConsultedProvidersAction} from '../../redux/reducers/home/aysnc-actions/getConsultedProvidersAction';
import Row from '../../components/Row/Row';
import {ImagePath} from '../../assets/images/ImagePaths';
import {MaterialIcons} from '../../components/Icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NotificationSc from '../notification/NotificationSc';
import TextInput from '../../components/TextInput/TextInput';
import {Ionicons} from '../../components/Icons/Ionicons';
import {colors} from '../../assets/colors';

const HomeSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const topRatedProviders = useAppSelector(
    (state: RootState) => state.zoom.topRatedProviderData,
  );
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const consentFormData = useAppSelector(
    (state: RootState) => state.home.consentFormData,
  );

  const providerData = useAppSelector(
    (state: RootState) => state.home.providerDataUuid?.data,
  );
  const isFocused = useIsFocused();

  const handleProviderSelection = async (data: any) => {
    setSelectedProvider(data);
    if (providerData) {
      dispatch(resetproviderDataUuid());
      navigation.navigate('bookappointment', {
        providerData,
        selectedProvider: data,
      });
    }
  };

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      dispatch(getProfileAction({accessToken: loginData.data.accessToken}));
      dispatch(setUUIDForMedicalRecords(null));
      dispatch(
        getProviderListAction({accessToken: loginData.data.accessToken}),
      );
      getConsultedProviders();
      dispatch(getConsentFormAction({accessToken: loginData.data.accessToken}));
      dispatch(
        getTopRatedProviderAction({accessToken: loginData.data.accessToken}),
      );
    }
  }, []);

  const getConsultedProviders = useCallback(() => {
    if (profileData?.data?.uuid && loginData?.data?.accessToken) {
      const data = {
        accessToken: loginData.data.accessToken,
        patientId: profileData.data.uuid,
        page: 0,
      };
      dispatch(getConsultedProvidersAction(data));
    }
  }, [dispatch, loginData, profileData]);

  const consultedProvidersData = useAppSelector(
    (state: RootState) => state.home.consultedProvidersData,
  );

  const consultedProviderLength = consultedProvidersData?.data?.content.length;
  const specialities =
    consultedProvidersData?.data?.content?.[consultedProviderLength - 1]
      ?.specialities;

  const handleDrawerOpen = () => navigation.openDrawer();

  const renderCardItem = ({item}: any) => (
    <View style={homeScStyles.cardstyle}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(item.nextScreenName, {isBack: true})
        }>
        <Image source={item.name} style={{width: '100%', height: '100%'}} />
      </TouchableOpacity>
    </View>
  );

  const renderSpecialistItem = ({item}: any) => (
    <View style={[homeScStyles.specilistView, {alignItems: 'flex-start'}]}>
      <Image
        source={
          item?.provider?.avatar
            ? {uri: item?.provider?.avatar}
            : ImagePath1.hospitalImg
        }
        style={[homeScStyles.specilistImg, {borderRadius: 5, marginBottom: 8}]}
        resizeMode="cover"
      />

      <Text
        style={{
          color: 'black',
          fontSize: 16,
          fontWeight: '600',
          paddingVertical: 8,
        }}>
        {item?.provider?.firstName} {item?.provider?.lastName}
      </Text>
      <Row>
        <StarRating disabled value={item?.averageRating} />
        {/* <SmallButton title="book" /> */}
      </Row>
    </View>
  );

  const [showNofication, setShowNotification] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const inputRef = useRef<any>();
  const navigateToProviderFun = () => {
    inputRef.current.blur();
    navigation.navigate('ProvidersListScreen', {focusOnSearch: true});
  };

  return (
    <SafeAreaView style={homeScStyles.mainContainer}>
      <View style={homeScStyles.container}>
        <TouchableOpacity onPress={handleDrawerOpen}>
          <Image
            source={
              profileData?.data?.avatar
                ? {uri: profileData.data.avatar}
                : ImagePath1.personImg
            }
            style={homeScStyles.profilePhoto}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '82%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text style={homeScStyles.screenName}>Your Location</Text>
          <Text style={homeScStyles.locationName}>
            {profileData?.data?.address?.city
              ? profileData?.data?.address?.city
              : '-'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowNotification(true)}>
          <ImageBackground
            source={ImagePath1.bellBg}
            style={homeScStyles.bellBg}>
            <MaterialIcons
              color="black"
              name="notifications-none"
              size={responsiveFontSize(3.9)}
            />
            {notificationCount > 0 && (
              <View style={homeScStyles.notificationBadge}>
                <Text style={homeScStyles.notificationText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </ImageBackground>
          <NotificationSc
            visible={showNofication}
            setVisible={setShowNotification}
            setNotificationCount={setNotificationCount}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: '90%'}}>
        <ScrollView contentContainerStyle={{paddingBottom: 50, paddingTop: 15}}>
          <View style={homeScStyles.searchProvInputContainer}>
            <TouchableOpacity
              onPress={navigateToProviderFun}
              style={{
                position: 'absolute',
                width: '100%',
                height: '80%',
                zIndex: 1,
              }}></TouchableOpacity>
            <TextInput
              editable={false}
              ref={inputRef}
              placeholder="Search clinic name"
              leftIcon={
                <Ionicons
                  name={'search'}
                  color={colors.grey70}
                  style={{fontSize: responsiveFontSize(3)}}
                />
              }
            />
          </View>
          <View style={homeScStyles.imageBackgroundView}>
            <ImageBackground
              style={homeScStyles.image2}
              source={ImagePath1.homeBackgroundImage}>
              <Row style={{top:responsiveHeight(1),paddingLeft:'4%'}}>
                <Image
                  source={ImagePath1.navalalogo}
                  style={{
                    resizeMode: 'contain',
                    height: responsiveHeight(6),
                    width: responsiveWidth(10),
                  }}
                />
                <Text style={homeScStyles.titleText}>Navala</Text>
              </Row>
              <View style={{flexDirection: 'row'}}>
                <Text style={homeScStyles.welcomeText}>
                  Welcome {profileData?.data?.legalFirstName}
                  <Image
                    style={{height: 20, width: 20}}
                    source={ImagePath1.smilyImage}
                  />
                </Text>
              </View>
              <Text style={homeScStyles.txt3}>You are in safe hands</Text>
              <Button
                buttonStyle={homeScStyles.btn1}
                title="Find Clinics"
                onPress={() => navigation.navigate('ProvidersListScreen')}
              />
            </ImageBackground>
          </View>
          <View style={homeScStyles.cardViewStyle}>
            <FlatList
              data={cradData}
              renderItem={renderCardItem}
              keyExtractor={item => item.name}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={{
                justifyContent: 'space-evenly',
                height: '100%',
              }}
            />
          </View>
          {consultedProvidersData?.data?.content?.length > 0 && (
            <>
              <View style={homeScStyles.providerView}>
                <Text style={{fontWeight: '600', fontSize: 20, color: 'black'}}>
                  Providers you have consulted
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConsultedProvidersScreen')
                  }
                  style={{width: '20%'}}>
                  <Text style={{color: '#0097F0', alignSelf: 'center'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 12}}>
                <ConsultedProviderCard
                  data={
                    consultedProvidersData?.data?.content[
                      consultedProviderLength - 1
                    ]
                  }
                  accessToken={loginData?.data?.accessToken}
                  name={`${
                    consultedProvidersData?.data?.content[
                      consultedProviderLength - 1
                    ].firstName
                  } ${consultedProvidersData?.data?.content[0]?.lastName}`}
                  providerImage={
                    consultedProvidersData?.data?.content[
                      consultedProviderLength - 1
                    ].avatar
                  }
                  selectedData={handleProviderSelection}
                  specialities={specialities}
                />
              </View>
            </>
          )}
          <View style={homeScStyles.providerView}>
            <Text style={{fontWeight: '600', fontSize: 20, color: 'black'}}>
              Choose top providers
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TopProvidersScreen')}>
              <Text style={{color: '#0097F0', alignSelf: 'center'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={homeScStyles.specilistOuterView}>
            <FlatList
              data={topRatedProviders?.data?.content.slice(0, 4)}
              renderItem={renderSpecialistItem}
              keyExtractor={item => item?.provider?.uuid}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                height: '100%',
              }}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={consentFormData?.data?.isAccepted === false}
            onRequestClose={() => {}}>
            <PatientConsentForm />
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeSc;
