import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';
import {EntypoIcons} from '../../components/Icons/EntypoIcons';
import Row from '../../components/Row/Row';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {get, put} from '../../config/AxiosConfig';
import moment from 'moment';
import Loader from '../../components/Loader/Loader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const NotificationSc = ({visible, setVisible, navigation,setNotificationCount}: any) => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector(state => state.auth.loginData);
  const profileData = useAppSelector(state => state.profile.profileData);

  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    // setLoading(true);
    try {
      const response: any = await get(
        `/notification/patient/${profileData?.data?.uuid}`,
        {
          headers: {Authorization: `Bearer ${loginData?.data?.accessToken}`},
        },
      );
      setNotificationData(response.data);
    } catch (error) {
      // console.error(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); 
    return () => clearInterval(interval);
  }, [profileData?.data?.uuid]);

  useEffect(()=>{
    setNotificationCount &&  setNotificationCount(notificationData?.length)
  },[notificationData])

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications().then(() => setRefreshing(false));
  };

  const handleClearNotifications = async () => {
    setLoading(true);
    // await clearNotification(patientId); // Your clear notifications API call
    fetchNotifications();
    setLoading(false);
  };

  const handleViewNotification = async (item: any) => {
    setLoading(true);
    try {
      const response: any = await put(
        `/notification/seen/${item?.id}`,{},
        {
          headers: {Authorization: `Bearer ${loginData?.data?.accessToken}`},
        },
      );
     await fetchNotifications()
    } catch (error) {
      // console.error(error);
    }
    setLoading(false);
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleExpand = (index: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  function convertTo12HourFormat(time24:any) {
    const [hours, minutes, seconds] = time24.split(':');
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }
  

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <SafeAreaView style={styles.container}>
        <View style={styles.containerView}>
          <View style={styles.header}>
            <Text style={styles.appConTxt}>Notifications</Text>
            <Row>
              {/* <TextButton
                text="Clear All"
                onPress={handleClearNotifications}
                textStyle={{ padding: 0, marginRight: responsiveWidth(6) }}
              /> */}
              <TouchableOpacity
                style={{padding: 3}}
                onPress={() => {
                  setVisible ? setVisible(false) : navigation.goBack();
                }}>
                <EntypoIcons
                  name="cross"
                  size={responsiveFontSize(2.5)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </Row>
          </View>
          <>
            <View style={styles.blurView}>
              <View style={styles.cardContent}>
                {/* <Text style={styles.unread}>Unread</Text> */}
                <FlatList
                  data={notificationData}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[colors.primary]}
                    />
                  }
                  renderItem={({item, index}: any) => {
                    const isExpanded = expandedIndex === index;
                    return (
                      <View
                        style={[
                          styles.notification,
                          index === notificationData.length - 1 && {
                            borderBottomWidth: 0,
                          },
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={[styles.notTitle]}>{item?.title}</Text>
                          <TouchableOpacity
                            onPress={() => handleToggleExpand(index)}>
                            <EntypoIcons
                              name={isExpanded ? 'chevron-up' : 'chevron-down'}
                              size={responsiveFontSize(2.5)}
                              color={colors.white}
                              style={{padding:5}}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.desc}>{item?.message}</Text>
                        <Text style={{color: '#ACB4BD'}}>
                          Date:{' '}
                          {moment(item?.date).format('MM-DD-YYYY hh:mm A')}
                        </Text>
                        {isExpanded && (
                          <View>
                            <Text style={styles.moreContent}>
                            Appointment Date : {`${moment(item?.appointmentDate).format('MM-DD-YYYY')}`}
                            </Text>
                            <Text style={styles.moreContent}>
                              Start Time : {convertTo12HourFormat(item?.appointmentStatTime)}
                            </Text>
                            <Text style={styles.moreContent}>
                              Visit Type : {`${item?.visitType}`}
                            </Text>
                            <Text style={styles.moreContent}>
                              Visit reason : {`${item?.visitReason}`}
                            </Text>
                            {/* Add more content here */}
                            <TouchableOpacity
                              style={styles.viewButton}
                              onPress={() => handleViewNotification(item)}>
                              <Text style={styles.viewBtn}>Clear</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </>
        </View>
      </SafeAreaView>
      {loading && <Loader />}
    </Modal>
  );
};

export default NotificationSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000CC',
    width: '93%',
    alignSelf: 'flex-end',
  },
  containerView: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  blurView: {
    width: '100%',
    height: '94%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: '#282828',
    opacity: 0.8,
    marginBottom: responsiveHeight(1),
  },
  cardContent: {borderWidth: 0, margin: '4%', flex: 1},
  appConTxt: {
    color: colors.white,
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2),
  },
  viewButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  unread: {
    color: colors.primary,
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2),
    marginBottom: '2%',
  },
  notTitle: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  desc: {
    color: '#ACB4BD',
    marginBottom: 5,
  },
  notification: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.4)',
    marginTop: 10,
    paddingBottom : 8
  },
  viewBtn: {
    color: colors.primary,
    fontFamily: fontType.Roboto_Bold,
    fontSize: responsiveFontSize(2),
  },
  moreContent: {
    color: '#ACB4BD',
    marginTop: 10,
  },
});
