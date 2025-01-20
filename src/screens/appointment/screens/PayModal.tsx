import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import Row from '../../../components/Row/Row';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {getCardsAction} from '../../../redux/reducers/payments/async-actions/getCardsAction';
import {RootState} from '../../../redux/store/storeConfig';
import {makePaymentAction} from '../../../redux/reducers/payments/async-actions/makePaymentAction';
import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/ButtonComponent/ButtonComponent';

const PayModal = ({
  appointmentUuid,
  showPayModal,
  setShowPayModal,
  firstTime,
}: any) => {
  const [selectedCard, setSelectedCard] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const [isValidCard, setIsValidCard] = useState(false);
  const [isValidAmout, setIsValidAmount] = useState(false);
  const dispatch = useAppDispatch();

  const cardsData = useAppSelector(
    (state: RootState) => state.payments?.cardsData,
  );

  const loading = useAppSelector((state: RootState) => state.payments?.loading);

  const mappedCards = cardsData.map((item: any) => {
    return {
      label: `**** **** **** ${item?.lastFour}`,
      value: item?.uuid,
    };
  });


  const makePayementFun = async () => {
    if (selectedCard === '') {
      setIsValidCard(true);
    }
    if (!firstTime && selectedCard !== '') {
      await dispatch(
        makePaymentAction({
          appointmentUuid: appointmentUuid,
          card: selectedCard,
          amount: 5,
          paymentStatus: 'INITIAL',
        }),
      ).then(res => {
        console.log('res ==>', res);
        setShowPayModal(false);
        if (res?.payload?.code == 'OK') {
          Alert.alert('Sucess', res?.payload?.message);
        }
      });
    } else {
      if (enteredAmount === '') {
        setIsValidAmount(true);
      }
      if (enteredAmount !== '' && selectedCard !== '') {
        await dispatch(
          makePaymentAction({
            appointmentUuid: appointmentUuid,
            card: selectedCard,
            amount: enteredAmount,
            paymentStatus: 'FINAL',
          }),
        ).then(res => {
          console.log('res ==>', res);
          setShowPayModal(false);
          if (res?.payload?.code == 'OK') {
            Alert.alert('Sucess', res?.payload?.message);
          }
        });
      }
    }
  };

  const cancelPress = () => {
    setSelectedCard('');
    setEnteredAmount('');
    setIsValidAmount(false);
    setIsValidCard(false);
    setShowPayModal(false);
  };

  return (
    <ModalPopup show={showPayModal}>
      <View style={{alignItems: 'center', marginVertical: '3%'}}>
        <Text style={{fontSize: responsiveFontSize(3)}}>Payment</Text>
      </View>
      <DropdownComponent
        data={mappedCards}
        label="Cards"
        placeholder="Select Card"
        onValueChange={(value: any) => {
          setIsValidCard(false);
          setSelectedCard(value);
        }}
        isValid={isValidCard}
      />
      <TextInput
        label="Amount"
        placeholder={firstTime ? 'Enter Amount' : '5'}
        onChangeText={(text: any) => {
          setIsValidAmount(false);
          setEnteredAmount(text);
        }}
        editable={firstTime}
        isValid={isValidAmout}
        value={enteredAmount}
      />
      <Row style={{justifyContent: 'flex-end'}}>
        <Button
          buttonStyle={{width: '35%', marginRight: 8}}
          outlined
          title="Cancel"
          onPress={cancelPress}
        />
        <Button
          buttonStyle={{width: '35%'}}
          title="Pay"
          onPress={makePayementFun}
        />
      </Row>
    </ModalPopup>
  );
};

export default PayModal;

const styles = StyleSheet.create({});
