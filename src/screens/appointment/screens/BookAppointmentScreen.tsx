import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import TopNavigationView from '../../../common/topNavigationView';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Card from '../../../components/Card/Card';
import Dropdown from '../../../components/Dropdown/DropDown';
import Row from '../../../components/Row/Row';
import CustomText from '../../../components/Text/CustomText';
import TextInput from '../../../components/TextInput/TextInput';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {
  clearSelectedSlot,
  resetBookAppointmentAction,
  resetErrorBookAppointmentAction,
  resetSlotAction,
} from '../../../redux/reducers/home/HomeReducer';
import {bookAppinmentWithoutSlotAction} from '../../../redux/reducers/home/aysnc-actions/bookAppinmentWithoutSlotAction';
import {bookAppointmentAction} from '../../../redux/reducers/home/aysnc-actions/bookappoinmentAction';
import {getLocationAction} from '../../../redux/reducers/home/aysnc-actions/getLocationAction';
import {getProviderAction} from '../../../redux/reducers/home/aysnc-actions/getProviderAction';
import {getSlotWithLocationAction} from '../../../redux/reducers/home/aysnc-actions/getSlotWithLocationAction';
import {getSlotsAction} from '../../../redux/reducers/home/aysnc-actions/getSlotsAction';
import {getMemberAction} from '../../../redux/reducers/member/async-action/getMembersAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import AppointmentSlotTimeCard from '../components/AppointmentSlots/AppointmentSlotTimeCard';
import {ValidationMessageInAppointment} from '../constants/StringConstants';
import {BookAppointmentStyles as styles} from '../styles/BookAppointmentStyles';
import {resetMembersData} from '../../../redux/reducers/member/memberReducer';
import {get} from '../../../config/AxiosConfig';

const BookAppointmentScreen = (routes: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {navigation, route} = routes && routes;
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const providers = useAppSelector((state: RootState) => state.home.providers);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const slotData = useAppSelector((state: RootState) => state.home.slotData);

  const timeZone = slotData?.data?.bookingWindowTimeZone;

  const membersData = useAppSelector(
    (state: RootState) => state.member.membersData,
  );
  const bookAppointmentData = useAppSelector(
    (state: RootState) => state.home.bookAppointmentData,
  );
  const appointmentErrorData = useAppSelector(
    (state: RootState) => state.home.appointmentErrorData,
  );
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const selectedSlotData = useAppSelector(
    (state: RootState) => state.home.selectedSlotData,
  );

  const locationData = useAppSelector(
    (state: RootState) => state.home.locationData,
  );
  const [getSlot, setGetSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (isFocused) {
      dispatch(resetSlotAction());
      dispatch(clearSelectedSlot());
    }
  }, [isFocused]);
  useEffect(() => {
    dispatch(resetMembersData());
    dispatch(getMemberAction(profileData?.data?.uuid));
  }, []);

  useEffect(() => {
    if (appointmentErrorData != null) {
      const msg = appointmentErrorData?.message;
      Toast.show(msg, 2);
      dispatch(resetErrorBookAppointmentAction());
    }
  }, [appointmentErrorData]);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      dispatch(
        getProviderAction({
          accessToken: loginData?.data?.accessToken,
          searchBy: '',
          sourceId: '',
          providerUUID: route?.params?.providerData?.uuid,
        }),
      );
    }
  }, [loginData?.data?.accessToken, isFocused]);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      dispatch(
        getLocationAction({
          accessToken: loginData?.data?.accessToken,
          searchBy: '',
          status: '',
          providerUUID: route?.params?.providerData?.uuid,
        }),
      );
    }
  }, [loginData?.data?.accessToken, isFocused]);

  const AppType = [
    {label: 'Initial', value: 'Initial'},
    {label: 'Follow Up', value: 'Follow Up'},
  ];

  const visitType = [
    {label: 'Virtual', value: 'Virtual'},
    {label: 'In-Person', value: 'In-Person'},
  ];

  const [selectedValueForAppoinmentType, setSelectedValueForAppoinmentType] =
    useState('');
  const handleValueChangeForAppoinmentTypeDropDown = value => {
    setSelectedValueForAppoinmentType(value);
  };

  const [selectedValueForVisitType, setSelectedValueForVisitType] =
    useState('');
  const handleValueChangeForVisitTypeDropDown = value => {
    setSelectedValueForVisitType(value);
  };

  const [selectedValueForLocation, setSelectedValueForLocation] = useState('');
  const handleValueChangeForLocationDropDown = value => {
    setSelectedValueForLocation(value);
  };

  const [selectedValueForProvider, setSelectedValueForProvider] = useState('');
  const handleValueChangeForProviderDropDown = value => {
    setSelectedValueForProvider(value);
  };

  const [selectedValueForSpeciality, setSelectedValueForSpeciality] =
    useState('');
  const handleValueChangeForSpecialityDropDown = value => {
    setSelectedValueForSpeciality(value);
  };

  selectedValueForSpeciality;

  const [selectedValueForMember, setSelectedValueForMember] = useState('');
  const handleValueChangeForMemberDropDown = value => {
    setSelectedValueForMember(value);
  };
  const goBack = () => {
    navigation.pop();
  };

  const [locations, setDropDownData] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (locationData?.data?.content.length > 0) {
      const activeLocations = locationData.data.content.filter(
        (item: any) => item.active,
      );

      const newData = activeLocations.map((item: any) => {
        return {
          label: item?.name,
          value: item?.uuid,
        };
      });

      setDropDownData(newData);
    } else {
      const data = [{label: 'No Location', value: 'No Location'}];
      setDropDownData(data);
    }
  }, [locationData]);

  const generateTimeSlots = (start, end) => {
    const startTime = moment(start, 'HH:mm:ss');
    const endTime = moment(end, 'HH:mm:ss');
    const slots = [];

    while (startTime.isBefore(endTime)) {
      const slot = {
        from: startTime.format('HH:mm:ss'),
        to: startTime.add(30, 'minutes').format('HH:mm:ss'),
        isselected: false,
      };
      slots.push(slot);
    }

    return slots;
  };

  function getDayOfWeek(date: any) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  // Example usage:
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selected) {
      const dateFromString = moment(selected).toDate();
      const currentDate = new Date();
      const dayOfWeek = getDayOfWeek(dateFromString);
      setSelectedDay(dayOfWeek);
      if (
        moment(selected).format('yyyy-MM-DD') < moment().format('yyyy-MM-DD')
      ) {
        Toast.show(ValidationMessageInAppointment.pastDate, 2);
        setSelected('');
      } else {
      }
    }
  }, [selected]);
  const getTimeIntervalForClinic = () => {
    if (selectedDay) {
      const slotsBeforeOrEqualToTime =
        route?.params?.providerData?.workingHours?.filter(day => {
          return day.dayOfWeek == selectedDay.toUpperCase(); //
        });
      return slotsBeforeOrEqualToTime;
    }
  };

  const timeIntervalForClinic = selectedDay && getTimeIntervalForClinic();

  const slotsClinicTime =
    timeIntervalForClinic.length > 0 &&
    generateTimeSlots(
      timeIntervalForClinic[0].openingTime,
      timeIntervalForClinic[0].closingTime,
    );

  // console.log('slotsClinicTime =>', slotsClinicTime);

  const [memberData, setMemberData] = useState([]);
  useEffect(() => {
    if (membersData?.data?.content.length > 0) {
      let newData = membersData?.data?.content?.map((item: any) => {
        return {
          label: item?.legalFirstName + ' ' + item?.legalLastName,
          value: item?.uuid,
        };
      });

      newData = [{label: 'self', value: profileData?.data?.uuid}, ...newData];

      setMemberData(newData);
    } else {
      const data = [{label: 'self', value: profileData?.data?.uuid}];
      setMemberData(data);
    }
  }, [membersData]);

  const [providerData, setProviderData] = useState([]);

  // console.log('route?.params?.selectedProvider =>',route?.params?.selectedProvider)

  useEffect(() => {
    if (route?.params?.selectedProvider !== null) {
      setSelectedValueForProvider(route?.params?.selectedProvider?.userUuid);
    }
  }, [route?.params]);
  useEffect(() => {
    if (providers?.data?.content.length > 0) {
      const activeProviders = providers?.data?.content.filter(
        (item: any) => item.active,
      );
      const newData = activeProviders.map((item: any) => {
        return {
          label: item?.firstName + ' ' + item?.lastName,
          value: item?.userUuid,
        };
      });
      setProviderData(newData);
    } else {
      const data = [{label: 'No Provider', value: 'No Provider'}];
      setProviderData(data);
    }
  }, [providers]);

  useEffect(() => {
    if (slotData?.data?.timeIntervalSet.length > 0) {
      // let arr = [];
      const newData = slotData?.data?.timeIntervalSet?.map((item: any) => {
        return {
          startTime: item?.from,
          endTime: item?.to,
          isselected: false,
        };
      });
      setSlots(newData);
    }
  }, [slotData]);

  const filterAndSortSlots = (data, time) => {
    console.log("data  ",data);
    
    const slotsBeforeOrEqualToTime = data?.filter(slot => {
      return slot.to <= time;
    });

    const sortedSlots = slotsBeforeOrEqualToTime.sort((slotA, slotB) => {
      return slotA.to.localeCompare(slotB.to);
    });

    return sortedSlots;
  };

  const filterAndSortSlots2 = (data, time, time2) => {
    const slotsBeforeOrEqualToTime = data?.filter(slot => {
      return slot.to <= time && slot.to > time2;
    });

    const sortedSlots = slotsBeforeOrEqualToTime.sort((slotA, slotB) => {
      return slotA.to.localeCompare(slotB.to);
    });

    return sortedSlots;
  };

  

  const moringSlot =
    slotData &&
    slotData?.data?.timeIntervalSet?.length !== 0 &&
    filterAndSortSlots(slotData?.data?.timeIntervalSet, '12:00:00');

  const moringSlotClinic =
    slotsClinicTime && filterAndSortSlots(slotsClinicTime, '12:00:00');

  const afternoonSlot =
    slotData &&
    slotData?.data?.timeIntervalSet?.length !== 0 &&
    filterAndSortSlots2(
      slotData?.data?.timeIntervalSet,
      '18:00:00',
      '12:00:00',
    );
  const afternoonSlotClinic =
    slotsClinicTime &&
    filterAndSortSlots2(slotsClinicTime, '18:00:00', '12:00:00');

  const eveningSlot =
    slotData &&
    slotData?.data?.timeIntervalSet?.length !== 0 &&
    filterAndSortSlots2(
      slotData?.data?.timeIntervalSet,
      '24:00:00',
      '18:00:00',
    );

    console.log("eveningSlot =>",eveningSlot)

  const eveningSlotForClinic =
    slotsClinicTime &&
    filterAndSortSlots2(slotsClinicTime, '24:00:00', '18:00:00');

  // console.log(moringSlot,afternoonSlot,eveningSlot)

  useEffect(() => {
    if (selectedValueForLocation) {
      if (
        loginData?.data?.accessToken &&
        selected &&
        selectedValueForProvider &&
        selectedValueForAppoinmentType &&
        selectedValueForVisitType &&
        selectedValueForLocation
      ) {
        const appointmentType =
          selectedValueForAppoinmentType === 'Follow Up'
            ? 'FOLLOW_UP'
            : 'INITIAL';
        const visitType =
          selectedValueForVisitType === 'Virtual' ? 'VIRTUAL' : 'IN_PERSON';

        dispatch(
          getSlotWithLocationAction({
            accessToken: loginData?.data?.accessToken,
            providerUUID: selectedValueForProvider,
            visitType: visitType,
            appointmentType: appointmentType,
            appointmentDate: selected,
            locationUUID: selectedValueForLocation,
          }),
        ).then((res: any) => {
          if (res?.error) {
            setSelected('');

            Toast.show(
              'Slots are not available with selected location for this provider!',
              2,
            );
          }
        });
      }
    } else {
      if (
        loginData?.data?.accessToken &&
        selected &&
        selectedValueForProvider &&
        selectedValueForAppoinmentType &&
        selectedValueForVisitType
      ) {
        const appointmentType =
          selectedValueForAppoinmentType === 'Follow Up'
            ? 'FOLLOW_UP'
            : 'INITIAL';
        const visitType =
          selectedValueForVisitType === 'Virtual' ? 'VIRTUAL' : 'IN_PERSON';
        setGetSlot(true);
        dispatch(
          getSlotsAction({
            accessToken: loginData?.data?.accessToken,
            providerUUID: selectedValueForProvider,
            visitType: visitType,
            appointmentType: appointmentType,
            appointmentDate: selected,
          }),
        );
      }
    }
  }, [
    loginData?.data?.accessToken,
    selected,
    selectedValueForVisitType,
    selectedValueForAppoinmentType,
    selectedValueForProvider,
    selectedValueForLocation,
  ]);

  const goToBookFun = () => {
    if (!selected) {
      Toast.show(ValidationMessageInAppointment.validationForDate, 2);
      return;
    }
    if (!selectedValueForAppoinmentType) {
      Toast.show(
        ValidationMessageInAppointment.validationForAppointmentType,
        2,
      );
      return;
    }
    if (!selectedValueForVisitType) {
      Toast.show(ValidationMessageInAppointment.validationForVisitType, 2);
      return;
    }
    if (selectedValueForVisitType == 'In-Person' && !selectedValueForLocation) {
      Toast.show(
        ValidationMessageInAppointment.validationForAppointmentType,
        2,
      );
      return;
    }
    if (!selectedValueForMember) {
      Toast.show(ValidationMessageInAppointment.validationForMemder, 2);
      return;
    }

    if (!reasonForAppointment) {
      Toast.show(ValidationMessageInAppointment.validationForReason, 2);
      return;
    }

    if (
      slotData?.data?.timeIntervalSet.length > 0 ||
      slotData?.data?.timeIntervalSet.length == undefined ||
      timeIntervalForClinic.length > 0
    ) {
      if (selectedSlotData == null) {
        Toast.show(ValidationMessageInAppointment.slotValidation, 2);
        return;
      } else {
        if (
          loginData?.data?.accessToken &&
          selected &&
          selectedValueForProvider &&
          selectedValueForAppoinmentType &&
          selectedValueForVisitType &&
          selectedSlotData &&
          slotData
        ) {
          const appointmentType =
            selectedValueForAppoinmentType === 'Follow Up'
              ? 'FOLLOW_UP'
              : 'INITIAL';
          const visitType =
            selectedValueForVisitType === 'Virtual' ? 'VIRTUAL' : 'IN_PERSON';

          if (selectedValueForLocation) {
          }
          dispatch(
            bookAppointmentAction({
              accessToken: loginData?.data?.accessToken,
              providerUUID: selectedValueForProvider,
              visitType: visitType,
              appointmentType: appointmentType,
              appointmentDate: selected,
              startTime: selectedSlotData?.from,
              endTime: selectedSlotData?.to,
              visitReason: reasonForAppointment,
              bookByPatient: true,
              providerGroupId: route?.params?.providerData?.uuid,
              patientUserUuid: selectedValueForMember,
              locationUUID: selectedValueForLocation,
            }),
          );
          return;
        }

        if (
          loginData?.data?.accessToken &&
          selected &&
          selectedValueForAppoinmentType &&
          selectedValueForVisitType &&
          selectedSlotData
        ) {
          const appointmentType =
            selectedValueForAppoinmentType === 'Follow Up'
              ? 'FOLLOW_UP'
              : 'INITIAL';
          const visitType =
            selectedValueForVisitType === 'Virtual' ? 'VIRTUAL' : 'IN_PERSON';

          dispatch(
            bookAppinmentWithoutSlotAction({
              accessToken: loginData?.data?.accessToken,
              patientId: selectedValueForMember,
              providerGroupId: route?.params?.providerData?.uuid,
              appointmentDate: selected,
              appointmentType: appointmentType,
              appointmentMode: visitType,
              startTime: selectedSlotData?.from,
              endTime: selectedSlotData?.to,
              visitReason: reasonForAppointment,
              speciality: selectedValueForSpeciality,
            }),
          );

          return;
        }
      }
    } else {
      Toast.show(ValidationMessageInAppointment.noSlotValidation, 2);
      return;
    }
  };

  useEffect(() => {
    if (bookAppointmentData) {
      Toast.show('Appointment booked successfully!', 2);
      dispatch(resetBookAppointmentAction());
      navigation.goBack();
    }
  }, [bookAppointmentData]);

  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${loginData?.data?.accessToken}`,
    };

    const fetchSpecialities = async () => {
      try {
        const response: any = await get('/get/specialities?page=0&size=1000', {
          headers,
        });
        //  console.log('response ====>',JSON.stringify(response))
        const formattedData = response.data.content.map((item: any) => ({
          label: item.name,
          value: item.name,
        }));
        setDropdownData(formattedData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchSpecialities();
  }, []);
  
  console.log("slotData?.data?.timeIntervalSet     ",slotData);
  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <TopNavigationView
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
        <View style={styles.pageContainer}>
          <View style={styles.doctorContainer}>
            <View style={styles.ellipseImgBg}>
              <Image
                style={styles.doctorImg}
                source={
                  route?.params?.providerData?.avatar === null
                    ? ImagePath1.personImg
                    : {
                        uri: route?.params?.providerData?.avatar,
                      }
                }
              />
            </View>
            <Text style={styles.drName}>
              {' '}
              {route?.params?.providerData?.name}
            </Text>
          </View>
          <ScrollView style={styles.drDetailsContainer}>
            <Text style={styles.drTitle}>
              {route?.params?.providerData?.physicalAddress?.line1 +
                ' ' +
                route?.params?.providerData?.physicalAddress?.line2 +
                ' ' +
                route?.params?.providerData?.physicalAddress?.city +
                ' ' +
                route?.params?.providerData?.physicalAddress?.state +
                ' ' +
                route?.params?.providerData?.physicalAddress?.country +
                ' ' +
                route?.params?.providerData?.physicalAddress?.zipcode}
            </Text>

            <Card height={'100%'} width={null} style={{padding: '3%'}}>
              <Text style={styles.drName}>Clinic Description</Text>
              <Text style={styles.drBioDesc}>
                {route?.params?.providerData?.description}
              </Text>

              <Dropdown
                data={AppType}
                label="Select Appointment Type"
                placeholder="Appointment Type"
                selectedValue={selectedValueForAppoinmentType}
                onValueChange={handleValueChangeForAppoinmentTypeDropDown}
              />
              <Dropdown
                data={visitType}
                label="Select Visit Type"
                placeholder="Visit Type"
                selectedValue={selectedValueForVisitType}
                onValueChange={handleValueChangeForVisitTypeDropDown}
              />
              {selectedValueForVisitType === 'In-Person' && (
                <Dropdown
                  data={locations}
                  label="Select Location"
                  placeholder="Location"
                  selectedValue={selectedValueForLocation}
                  onValueChange={handleValueChangeForLocationDropDown}
                />
              )}
              <Dropdown
                data={memberData}
                label="Select members"
                placeholder="Select members"
                selectedValue={selectedValueForMember}
                onValueChange={handleValueChangeForMemberDropDown}
              />

              {!selectedValueForProvider && (
                <Dropdown
                  data={dropdownData}
                  label="Select Speciality"
                  placeholder="Speciality"
                  selectedValue={selectedValueForSpeciality}
                  onValueChange={handleValueChangeForSpecialityDropDown}
                />
              )}

              {!selectedValueForSpeciality && (
                <Dropdown
                  data={providerData}
                  label="Select Provider"
                  placeholder="Provider"
                  selectedValue={selectedValueForProvider}
                  onValueChange={handleValueChangeForProviderDropDown}
                />
              )}

              <Text style={styles.drName}>Appointment</Text>

              <Calendar
                onDayPress={day => setSelected(day.dateString)}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: 'orange',
                  },
                  ...(moment().isAfter(moment(selected)) && {
                    [selected]: {disabled: true},
                  }),
                }}
              />

              {moringSlot && afternoonSlot && eveningSlot && (
                <AppointmentSlotTimeCard
                  firstSlot={'Morning'}
                  secondSlot={'Afternoon'}
                  thirdSlot={'Evening'}
                  firstData={moringSlot}
                  secondData={afternoonSlot}
                  thirdData={eveningSlot}
                  forDate={selected}
                  timezone={timeZone}
                  slotData={slotData}
                />
              )}
              {moringSlot == null &&
              afternoonSlot == null &&
              eveningSlot == null &&
              selected &&
              timeIntervalForClinic &&
              afternoonSlotClinic &&
              moringSlotClinic &&
              eveningSlotForClinic ? (
                <>
                  {selectedValueForProvider && (
                    <View>
                      <Text>
                        Slots are not available for selected provider, showing
                        clinic slots!
                      </Text>
                    </View>
                  )}
                  <AppointmentSlotTimeCard
                    firstSlot={'Morning'}
                    secondSlot={'Afternoon'}
                    thirdSlot={'Evening'}
                    firstData={moringSlotClinic}
                    secondData={afternoonSlotClinic}
                    thirdData={eveningSlotForClinic}
                    forDate={selected}
                    slotData={slotData}
                  />
                </>
              ) : (
                <Text></Text>
              )}
              <Text style={styles.drName}>Reason for Appointment</Text>
              <TextInput
                value={reasonForAppointment}
                placeholder="Reason for Appointment"
                onChangeText={value => setReasonForAppointment(value)}
              />
            </Card>
          </ScrollView>
          <Card
            height={responsiveHeight(8.5)}
            width={null}
            style={{padding: '3%', paddingHorizontal: '5%'}}>
            <Row
              style={{
                justifyContent: 'space-between',
              }}>
              <View>
                {/* <Button title="Book" onPress={()=>navigation.navigate('bookandpay',{item:route,bookData:requiredDataToPass})}></Button> */}
              </View>
              <Button title="Book Appointment" onPress={goToBookFun}></Button>
            </Row>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BookAppointmentScreen;
