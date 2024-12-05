import React, {useEffect} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {decode} from 'react-native-pure-jwt';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import EventSource from 'react-native-sse';
import {fontType} from '../../../assets/fontType';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import ProfilePictureComponent from '../../../components/ProfilePictureComponent';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {requestPermissions} from '../utils/androidpermissions';
import {ZOOM_APP_SECRET} from '../utils/config';
import {getPermissionToJoinVideoCall} from '../../../redux/reducers/zoom/async-action/getPermissionToJoinVideoCall';
import {getZoomTokenAction} from '../../../redux/reducers/zoom/async-action/getZoomTokenAction';
import Loader from '../../../components/Loader/Loader';
import {clearZoomTokenData, setIsLoader} from '../../../redux/reducers/zoom/ZoomReducer';
import TopNavigationView from '../../../common/topNavigationView';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import { colors } from '../../../assets/colors';

type JoinScreenProps = {
  route: any;
  navigation: any;
};

const ReadyToJoin = ({navigation, route}: JoinScreenProps) => {
  const {params} = route;
  const tokenData = useAppSelector((state: RootState) => state.zoom.zoomData);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.zoom.loading);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);

  const env = useAppSelector((state: RootState) => state.auth.baseUrl);


  console.log("env ==>",`${env}/event/subscribe/${params?.data?.appointmentUuid}_ACCEPT`)

  useEffect(() => {
    // dispatch(clearZoomTokenData())
    dispatch(setIsLoader(false));
    requestPermissions();
  }, []);

  const AppItem = params?.data;
  const ProviderName = `${AppItem?.providerName}`;

  // providerpic need to be updated
  const patientProfilePic = useAppSelector(
    (state: RootState) => state.home.patientProfilePic,
  );
  useEffect(() => {
    if (tokenData) {
      onPressJoinCall();
    }
  }, [tokenData]);

  const onPressJoinCall = async () => {

    if (tokenData?.statusCode && tokenData?.statusCode == 400) {
      Alert.alert('Unable to dcode', tokenData?.message);
    } else {
      const decoded: any = await decode(
        tokenData?.data?.authToken,
        ZOOM_APP_SECRET,
        {
          skipValidation: true,
        },
      );

      const sessionName = decoded?.payload?.tpc;
      const roleType = decoded?.payload?.role_type;
      const displayName = decoded?.payload?.user_identity;
      const sessionIdleTimeoutMins = 40;
      const data = params?.data;
      navigation.navigate('CallScreen', {
        data,
        sessionName,
        displayName,
        roleType,
        token: tokenData?.data?.authToken,
        sessionIdleTimeoutMins,
      });
    }
  };


  const navigateToCall = () => {

    dispatch(
      getPermissionToJoinVideoCall({
        appointmentUuid: params?.data?.appointmentUuid,
        accessToken: loginData?.data?.accessToken,
      }),
    );
  };

  useEffect(() => {
    const handleDenyEvent = () => {
      // if (isPatient) {
      const es = new EventSource(
        `${env}/event/subscribe/${params?.data?.appointmentUuid}_DENY`,
      );

      es.addEventListener('open', event => {
      });

      es.addEventListener('message', event => {
        dispatch(setIsLoader(false));
        Alert.alert('Request denied to join Appointment', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.pop();
            },
          },
        ]);
      });

      es.addEventListener('error', event => {
        if (event.type === 'error') {
          console.log('Connection error:', event.message);
         
        } else if (event.type === 'exception') {
          // console.error(
          //   'Error: addEventListener handleDenyEvent',
          //   event.message,
          //   event.error,
          // );
        }
      });

      es.addEventListener('close', event => {
      });

      // eventSource.dispatch = async () => {
      //   if (isPatient) {
      //     setRequesting(false);
      //     setAlertText("Request denied to join Appointment, click on join now to rejoin");
      //     setShowRequestDeniedAlert(true);
      //   }
      // };
      // eventSource.onerror = (event) => {
      //   event;
      //   handleDenyEvent();
      // };
      return () => es.close();
      // }
    };
    handleDenyEvent();
  }, []);
  

  useEffect(() => {
    const handleAcceptEvent = () => {
      // if (isPatient) {
      const es = new EventSource(
        `${env}/event/subscribe/${params?.data?.appointmentUuid}_ACCEPT`,
      );

      es.addEventListener('open', event => {
      });

      es.addEventListener('message', event => {
        dispatch(
          getZoomTokenAction({
            appointmentUuid: params?.data?.appointmentUuid,
            accessToken: loginData?.data?.accessToken,
          }),
        );
      });

      es.addEventListener('error', event => {
        if (event.type === 'error') {
        } else if (event.type === 'exception') {
        } else {
            
        }
      });

      es.addEventListener('close', event => {
      });
      return () => {
        es.close();
        // es.removeAllEventListeners();
      };
      // } 
    };
    handleAcceptEvent();
  }, []);

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '14%'}>
        <TopNavigationView
          title={''}
          onTap={goBack}
          onTapNotification={() => {}}
          source1={ImagePath1.backImage}
          source2={null}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.readyToJoinContainer}>
        <Text style={styles.readyToJoinText}>Ready to Join ?</Text>
        <Text style={styles.drWaitingTxt}>
          Dr. {ProviderName} is waiting in the room!
        </Text>
        {/*  providerpic need to be updated */}
        <ProfilePictureComponent
          imageUrl={''}
          firstName={AppItem?.providerName}
          lastName={AppItem?.providerName}
          imageContainerStyles={styles.imageContainerStyles}
          imageStyles={styles.imageStyles}
          textStyle={{fontSize: responsiveFontSize(5)}}
        />
        <View></View>
        <View style={styles.btnContainer}>
          <Button title="Join Call" onPress={navigateToCall} />
        </View>
        <View style={styles.cancelBtnContainer}>
            <Button title="Cancel" buttonStyle={{backgroundColor: colors.white,borderColor: colors.black,borderWidth: 1}} textStyle={{color: colors.black}} onPress={goBack} />
        </View>
      </View>
      {loading && <Loader />}
    </View>
  );
};

export default ReadyToJoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  readyToJoinContainer: {
    top: '8%',
    alignItems: 'center',
  },
  readyToJoinText: {
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2.8),
    marginBottom: '2%',
    color: colors.black
  },
  drWaitingTxt: {
    fontFamily: fontType.Roboto_Regular,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '400',
    marginBottom: '2%',
    color: colors.black
  },
  imageContainerStyles: {
    borderRadius: 8,
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    borderWidth: 0,
  },
  imageStyles: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  btnContainer: {
    // borderWidth : 1,
    width: '50%',
    marginVertical: '3%',
    paddingTop: 10
  },
  cancelBtnContainer: {
    // borderWidth : 1,
    width: '50%',
    marginVertical: '3%',
    paddingTop: 10,
    backgroundColor: colors.white,
    color: colors.black

  },
});
