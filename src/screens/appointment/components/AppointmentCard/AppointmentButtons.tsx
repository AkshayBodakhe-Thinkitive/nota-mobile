import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Row from '../../../../components/Row/Row';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import { useAppDispatch } from '../../../../redux/store/hooks';
import { getCardsAction } from '../../../../redux/reducers/payments/async-actions/getCardsAction';
import PayModal from '../../screens/PayModal';
import { useNavigation } from '@react-navigation/native';
import RescheduleAppointment from '../../screens/RescheduleAppointment';
import PaymentModal from './PaymentModal';
import PaymentSuccessModal from './PaymentSuccessModal';

const AppointmentButtons = ({
  successCallback,
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

  const dispatch = useAppDispatch();

  const [showPayModal, setShowPayModal] = useState(false);

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleNavigateToPay = async () => {
    await dispatch(getCardsAction());
    setShowPayModal(!showPayModal);

    //navigation.navigate("PaymentScreen_Stripe",{data:data})
  };

  const handlePaymentSuccess = ()=>{
    console.log("CHECKKKKK");
    setIsPaymentSuccess(true);
  }

  const handleSuccessCallback = ()=>{
    console.log("handle succes callback");
    successCallback()
  }

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
              containerStyle={(data?.paymentStatus == 'FINAL')?{width: '49%'}:{ width: buttonWidth }}
              onPress={() => setShowCancel(true)}
            />
          )}
        {isSpecialStatus && data?.paymentStatus !== 'FINAL' && (
          <SmallButton
            title="Pay"
            containerStyle={{ width: '30%' }}
            onPress={handleNavigateToPay}
          />
        )}
        {data?.presentType === 'VIRTUAL' && isSpecialStatus && (
          <SmallButton
            title="Join Call"
            containerStyle={(data?.paymentStatus == 'FINAL')?{width: '49%'}:{width: '30%'}}
            onPress={onPressJoinCall}
          />
        )}
        {reschedule && (
          <SmallButton
            title="Reschedule"
            containerStyle={{ width: '50%' }}
            onPress={() => {
              // Handle reschedule logic here
              navigation.navigate('rescheduleappointment', { data: data });
              // setShowRescModal(true);
            }}
          />
        )}
      </Row>
      {/* <PayModal
        firstTime={data?.pay}
        appointmentUuid={data?.appointmentUuid}
        showPayModal={showPayModal}
        setShowPayModal={setShowPayModal}
      /> */}

      {showPayModal ? (
        <PaymentModal success={handlePaymentSuccess} visible={setShowPayModal} appointmentUuid={data?.appointmentUuid} />) : ""}
      {/* <RescheduleAppointment data={data} show={showRescModal} setShow={setShowRescModal} /> */}


      {isPaymentSuccess? (<PaymentSuccessModal setVisible={setIsPaymentSuccess} onClose={handleSuccessCallback}/>): ""}
    </>
  );
};

export default AppointmentButtons;
