import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import {getLocationAction} from '../../../redux/reducers/home/aysnc-actions/getLocationAction';
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
import moment from 'moment';
import {getProviderAction} from '../../../redux/reducers/home/aysnc-actions/getProviderAction';
import {getSlotsAction} from '../../../redux/reducers/home/aysnc-actions/getSlotsAction';
import {
  transformLocationData,
  transformMemberData,
  transformProviderData,
  getDayOfWeek,
  AppType,
  visitType,
} from '../constants/appointmentUtils';
import AppointmentSlotTimeCard from '../components/AppointmentSlots/AppointmentSlotTimeCard';
import TextInput from '../../../components/TextInput/TextInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Ionicons} from '../../../components/Icons/Ionicons';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {rescheduleAppointmentProviderAction} from '../../../redux/reducers/home/aysnc-actions/rescheduleAppointmentAction';
import Loader from '../../../components/Loader/Loader';
import {getSlotWithLocationAction} from '../../../redux/reducers/home/aysnc-actions/getSlotWithLocationAction';
import {rescheduleAppointmentClinicAction} from '../../../redux/reducers/home/aysnc-actions/rescheduleAppointmentClinicAction';
import {get} from '../../../config/AxiosConfig';

const RescheduleAppointment = () => {
  const route = useRoute<any>();
  const data = route?.params?.data;

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
        // console.log('Error fetching data:', error);
      }
    };
    fetchSpecialities();
  }, []);

  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);

  const [appointmentType, setAppType] = useState(data?.appointmentType);
  const [selectedVisitType, setVisitType] = useState(data?.presentType);
  const [selectedLocation, setSelectedLocation] = useState(data?.locationUuid);
  const [selectedDate, setSelectedDate] = useState(
    moment(data?.appointmentDate).format('YYYY-MM-DD'),
  );

  const [selectedValueForSpeciality, setSelectedValueForSpeciality] = useState(
    data?.speciality,
  );

  const [selectedValueForProvider, setSelectedValueForProvider] = useState(
    data?.providerUserUuid,
  );
  const [selectedMember, setSelectedMember] = useState();
  const [reasonForAppointment, setReasonForAppointment] = useState(
    data?.reasonOfVisit,
  );

  const [slots, setSlots] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState('');

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const locationData = useAppSelector(
    (state: RootState) => state.home.locationData,
  );
  const membersData = useAppSelector(
    (state: RootState) => state.member.membersData,
  );
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const providers = useAppSelector((state: RootState) => state.home.providers);
  const slotData = useAppSelector((state: RootState) => state.home.slotData);
  const selectedSlotData = useAppSelector(
    (state: RootState) => state.home.selectedSlotData,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(data);
    dispatch(
      getLocationAction({
        accessToken: loginData?.data?.accessToken,
        searchBy: '',
        status: '',
        providerUUID: data?.providerGroupUuid,
      }),
    );
    dispatch(
      getProviderAction({
        accessToken: loginData?.data?.accessToken,
        searchBy: '',
        sourceId: '',
        providerUUID: data?.providerGroupUuid,
      }),
    );
  }, [dispatch, loginData?.data?.accessToken, data?.providerGroupUuid]);

  useEffect(() => {
    if (selectedValueForProvider && selectedDate && appointmentType) {
      if (!selectedLocation) {
        dispatch(
          getSlotsAction({
            accessToken: loginData?.data?.accessToken,
            providerUUID: selectedValueForProvider,
            visitType: selectedVisitType,
            appointmentDate: selectedDate,
            appointmentType: appointmentType,
          }),
        );
      } else if (selectedLocation) {
        dispatch(
          getSlotWithLocationAction({
            accessToken: loginData?.data?.accessToken,
            providerUUID: selectedValueForProvider,
            visitType: selectedVisitType,
            appointmentDate: selectedDate,
            appointmentType: appointmentType,
            locationUUID: selectedLocation,
          }),
        );
      }
    }
  }, [
    dispatch,
    selectedValueForProvider,
    selectedDate,
    appointmentType,
    selectedVisitType,
    selectedLocation,
    loginData?.data?.accessToken,
  ]);

  useEffect(() => {
    if (membersData && profileData) {
      const transformedMembers = transformMemberData(membersData, profileData);
      setSelectedMember(
        transformedMembers.find(
          (member: any) => member.label === data?.patientName,
        )?.value || transformedMembers[0].value,
      );
    }
  }, [membersData, profileData, data?.patientName]);

  const locations = transformLocationData(locationData);
  const memberOptions = transformMemberData(membersData, profileData);
  const providerOptions = transformProviderData(providers);

  const handleDateChange = (date: moment.MomentInput) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

  const generateTimeSlots = (start: any, end: any) => {
    const startTime = moment(start, 'HH:mm:ss');
    const endTime = moment(end, 'HH:mm:ss');
    const slots = [];

    while (startTime.isBefore(endTime)) {
      slots.push({
        from: startTime.format('HH:mm:ss'),
        to: startTime.add(30, 'minutes').format('HH:mm:ss'),
        isselected: false,
      });
    }

    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      const dateFromString = moment(selectedDate).toDate();
      const dayOfWeek = getDayOfWeek(dateFromString);
      setSelectedDay(dayOfWeek);
      if (moment(selectedDate).isBefore(moment().startOf('day'))) {
        setSelectedDate('');
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (data?.appointmentStatus === 'REQUESTED') {
      const clinicSlots = data?.workingHours.filter(
        (day: any) => day?.dayOfWeek === selectedDay?.toUpperCase(),
      );
      if (clinicSlots.length > 0) {
        setSlots(
          generateTimeSlots(
            clinicSlots[0].openingTime,
            clinicSlots[0].closingTime,
          ),
        );
      }
    } else if (data?.appointmentStatus === 'NOT_CONFIRMED') {
      dispatch(
        getSlotsAction({
          accessToken: loginData?.data?.accessToken,
          providerUUID: selectedValueForProvider,
          visitType: selectedVisitType,
          appointmentDate: selectedDate,
          appointmentType: appointmentType,
        }),
      ).then(response => {
        if (response.payload?.data?.content) {
          setSlots(
            response.payload.data.content.map((item: any) => ({
              startTime: item.from,
              endTime: item.to,
              isSelected: false,
            })),
          );
        }
      });
    }
  }, [
    selectedDate,
    selectedValueForProvider,
    appointmentType,
    selectedVisitType,
    data?.appointmentStatus,
    loginData?.data?.accessToken,
  ]);

  const getTimeIntervalForClinic = () => {
    return data?.workingHours.filter(
      (day: any) => day.dayOfWeek === selectedDay?.toUpperCase(),
    );
  };

  const timeIntervalForClinic: any = selectedDay && getTimeIntervalForClinic();

  const slotsClinicTime =
    timeIntervalForClinic?.length > 0 &&
    generateTimeSlots(
      timeIntervalForClinic[0].openingTime,
      timeIntervalForClinic[0].closingTime,
    );

  useEffect(() => {
    if (slotData?.data?.timeIntervalSet.length > 0) {
      setSlots(
        slotData.data.timeIntervalSet.map((item: any) => ({
          startTime: item.from,
          endTime: item.to,
          isselected: false,
        })),
      );
    }
  }, [slotData]);

  const filterAndSortSlots = (data: any, time: any, time2?: any) => {
    return (data || [])
      .filter(
        (slot: any) => slot.to <= time && (time2 ? slot.to > time2 : true),
      )
      .sort((slotA: any, slotB: any) => slotA.to.localeCompare(slotB.to));
  };

  const getFilteredSlots = (data: any, time: any, time2?: any) => {
    return filterAndSortSlots(data?.data?.timeIntervalSet || data, time, time2);
  };

  const morningSlot = getFilteredSlots(slotData, '12:00:00');
  const morningSlotClinic = getFilteredSlots(slotsClinicTime, '12:00:00');

  const afternoonSlot = getFilteredSlots(slotData, '18:00:00', '12:00:00');
  const afternoonSlotClinic = getFilteredSlots(
    slotsClinicTime,
    '18:00:00',
    '12:00:00',
  );

  const eveningSlot = getFilteredSlots(slotData, '24:00:00', '18:00:00');
  const eveningSlotForClinic = getFilteredSlots(
    slotsClinicTime,
    '24:00:00',
    '18:00:00',
  );

  const onBackPress = () => navigation.goBack();

  const handleSubmit = async () => {
    if (
      data?.appointmentStatus === 'NOT_CONFIRMED' ||
      selectedValueForProvider
    ) {
      const payload = {
        providerUUID: selectedValueForProvider,
        visitType: selectedVisitType,
        appointmentType: appointmentType,
        appointmentDate: selectedDate,
        startTime: selectedSlotData?.from,
        endTime: selectedSlotData?.to,
        visitReason: reasonForAppointment,
        bookByPatient: true,
        providerGroupId: data?.providerGroupUuid,
        patientUserUuid: selectedMember,
        locationUUID: selectedLocation,
      };
      // console.log('payload provider=>', payload);
      setLoading(true);
      await dispatch(
        rescheduleAppointmentProviderAction({
          accessToken: loginData?.data?.accessToken,
          payload: payload,
          appointmentId: data?.appointmentId,
        }),
      ).then((res: any) => {
        console.log('response on screen =>', res?.payload);
        if (res?.payload?.code === 'OK') {
          Alert.alert('Success!', res?.payload?.message, [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      });
      setLoading(false);
    } else if (data?.appointmentStatus === 'REQUESTED') {
      const payload = {
        providerUUID: selectedValueForProvider,
        appointmentMode: selectedVisitType,
        appointmentType: appointmentType,
        appointmentDate: selectedDate,
        startTime: selectedSlotData?.from,
        endTime: selectedSlotData?.to,
        visitReason: reasonForAppointment,
        bookByPatient: true,
        providerGroupId: data?.providerGroupUuid,
        patientId: selectedMember,
        locationUUID: selectedLocation,
        speciality : selectedValueForSpeciality
      };
      // console.log('payload clinic=>', payload);
      setLoading(true);
      await dispatch(
        rescheduleAppointmentClinicAction({
          accessToken: loginData?.data?.accessToken,
          payload: payload,
          appointmentId: data?.appointmentId,
        }),
      ).then((res: any) => {
        // console.log('response on screen =>', res?.payload);
        if (res?.payload?.code === 'CREATED') {
          Alert.alert('Success!', res?.payload?.message, [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back-sharp" size={25} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Reschedule Appointment</Text>
          <View />
        </View>
        <Text style={styles.clinicName}>{data?.clinicName}</Text>
        <DropdownComponent
          data={AppType}
          label="Appointment Type"
          placeholder="Appointment Type"
          selectedValue={appointmentType}
          onValueChange={setAppType}
        />
        <DropdownComponent
          data={visitType}
          label="Visit Type"
          placeholder="Visit Type"
          selectedValue={selectedVisitType}
          onValueChange={setVisitType}
        />
        {selectedVisitType === 'IN_PERSON' && (
          <DropdownComponent
            data={locations}
            selectedValue={selectedLocation}
            label="Location"
            placeholder="Location"
            onValueChange={(value: any) => {
              setSelectedLocation(value);
            }}
          />
        )}
        <DropdownComponent
          data={memberOptions}
          label="Select Member"
          placeholder="Select Members"
          selectedValue={selectedMember}
          onValueChange={setSelectedMember}
        />

        {!selectedValueForProvider && (
          <DropdownComponent
            data={dropdownData}
            label="Select Speciality"
            placeholder="Speciality"
            selectedValue={selectedValueForSpeciality}
            onValueChange={setSelectedValueForSpeciality}
          />
        )}

        {!selectedValueForSpeciality && (
          <DropdownComponent
            data={providerOptions}
            label="Provider"
            placeholder="Provider"
            selectedValue={selectedValueForProvider as any}
            onValueChange={(value: any, id: any) => {
              setSelectedValueForProvider(value);
            }}
          />
        )}
        <DatePickerInput
          label="Date"
          minimumDate={new Date()}
          date={selectedDate ? new Date(selectedDate) : null}
          setDate={handleDateChange}
        />
        {selectedValueForProvider &&
          morningSlot &&
          afternoonSlot &&
          eveningSlot && (
            <AppointmentSlotTimeCard
              firstSlot={'Morning'}
              secondSlot={'Afternoon'}
              thirdSlot={'Evening'}
              firstData={morningSlot}
              secondData={afternoonSlot}
              thirdData={eveningSlot}
              forDate={selectedDate}
              slotData={slotData}
            />
          )}
        {!selectedValueForProvider &&
        selectedDate &&
        timeIntervalForClinic &&
        afternoonSlotClinic &&
        morningSlotClinic &&
        eveningSlotForClinic ? (
          <AppointmentSlotTimeCard
            firstSlot={'Morning'}
            secondSlot={'Afternoon'}
            thirdSlot={'Evening'}
            firstData={morningSlotClinic}
            secondData={afternoonSlotClinic}
            thirdData={eveningSlotForClinic}
            forDate={selectedDate}
            slotData={slotData}
          />
        ) : (
          <Text></Text>
        )}
        <TextInput
          label="Reason for appointment"
          value={reasonForAppointment}
          placeholder="Reason for Appointment"
          onChangeText={setReasonForAppointment}
        />
        <Button title="Save" onPress={handleSubmit}></Button>
      </ScrollView>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default RescheduleAppointment;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: responsiveFontSize(1.8),
    alignSelf: 'center',
    fontWeight: '500',
  },
  formContainer: {
    paddingVertical: 10,
    paddingHorizontal: '3%',
  },
  clinicName: {
    textAlign: 'center',
    marginVertical: '2%',
  },
  slotContainer: {
    marginTop: 20,
  },
  slotLabel: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  slots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  slot: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSlot: {
    backgroundColor: '#d3d3d3',
  },
  noSlotsText: {
    color: 'red',
  },
});
