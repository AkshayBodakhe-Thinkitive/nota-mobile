import React, {useState} from 'react';
import {View} from 'react-native';
import Row from '../../../../components/Row/Row';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import {useAppDispatch} from '../../../../redux/store/hooks';
import {getCardsAction} from '../../../../redux/reducers/payments/async-actions/getCardsAction';
import PayModal from '../../screens/PayModal';
import {useNavigation} from '@react-navigation/native';
import RescheduleAppointment from '../../screens/RescheduleAppointment';

const AppointmentButtons = ({
  data,
  setShowCancel,
  onPressJoinCall,
  type,
}: any) => {
  const isSpecialStatus =
    data?.appointmentStatus === 'RE_SCHEDULED' ||
    data?.appointmentStatus === 'SCHEDULED' ||
    data?.appointmentStatus === 'CHECKED_IN';

  const reschedule =
    data?.appointmentStatus === 'NOT_CONFIRMED' ||
    data?.appointmentStatus === 'REQUESTED';

  const navigation = useNavigation<any>();

  const buttonWidth = isSpecialStatus ? '30%' : '45%';

  console.log('data from ajinkya ', data);

  const dispatch = useAppDispatch();

  const [showPayModal, setShowPayModal] = useState(false);

  const handleNavigateToPay = async () => {
    await dispatch(getCardsAction());
    setShowPayModal(!showPayModal);
  };

  const [showRescModal, setShowRescModal] = useState(false);

  return (
    <>
      <Row
        style={{
          flex: 0.3,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {data?.appointmentStatus !== 'CANCELLED' &&
          data?.appointmentStatus !== 'COMPLETED' && (
            <SmallButton
              outlined
              title="Cancel"
              containerStyle={{width: buttonWidth}}
              onPress={() => setShowCancel(true)}
            />
          )}
        {isSpecialStatus && data?.paymentStatus !== 'FINAL' && (
          <SmallButton
            title="Pay"
            containerStyle={{width: '30%'}}
            onPress={handleNavigateToPay}
          />
        )}
        {data?.presentType === 'VIRTUAL' && isSpecialStatus && (
          <SmallButton
            title="Join Call"
            containerStyle={{width: '30%'}}
            onPress={onPressJoinCall}
          />
        )}
        {reschedule && (
          <SmallButton
            title="Reschedule"
            containerStyle={{width: '50%'}}
            onPress={() => {
              // Handle reschedule logic here
              navigation.navigate('rescheduleappointment', {data: data});
              // setShowRescModal(true);
            }}
          />
        )}
      </Row>
      <PayModal
        firstTime={data?.pay}
        appointmentUuid={data?.appointmentUuid}
        showPayModal={showPayModal}
        setShowPayModal={setShowPayModal}
      />
      {/* <RescheduleAppointment data={data} show={showRescModal} setShow={setShowRescModal} /> */}
    </>
  );
};

export default AppointmentButtons;
