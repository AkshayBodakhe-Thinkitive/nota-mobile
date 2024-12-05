import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header/Header';
import Row from '../../../components/Row/Row';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {bookappmapping} from '../constants/StringConstants';
import {BookandPayStyles as styles} from '../styles/BookandPayStyles';
import BookingCard from '../components/BookingCard/BookingCard';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import TextInput from '../../../components/TextInput/TextInput';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {getCardsAction} from '../../../redux/reducers/payments/async-actions/getCardsAction';
import {RootState} from '../../../redux/store/storeConfig';
import {makePaymentAction} from '../../../redux/reducers/payments/async-actions/makePaymentAction';

const BookandPay = ({navigation, route}: any) => {
  const {item, bookData} = route?.params;

  // console.log('bookData ==>', JSON.stringify(bookData));

  const [showPayModal, setShowPayModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const [isValidCard, setIsValidCard] = useState(false);
  const [isValidAmout, setIsValidAmount] = useState(false);

  console.log(selectedCard);

  const dispatch = useAppDispatch();

  const handleNavigateToPay = async () => {
    await dispatch(getCardsAction());
    setShowPayModal(!showPayModal);
  };

  const cardsData = useAppSelector(
    (state: RootState) => state.payments?.cardsData,
  );

  const mappedCards = cardsData.map((item: any) => {
    return {
      label: `**** **** **** ${item?.lastFour}`,
      value: item?.uuid,
    };
  });

  const makePayementFun = () => {
    if (selectedCard === '') {
      setIsValidCard(true);
    }
    if (enteredAmount === '') {
      setIsValidAmount(true);
    }
    if (enteredAmount !== '' && selectedCard !== '') {
      dispatch(
        makePaymentAction({
          card: selectedCard,
          amount: enteredAmount,
          paymentStatus: 'FINAL',
        }),
      );
    }
  };

  const cancelPress = () => {
    setSelectedCard('');
    setEnteredAmount('');
    setIsValidAmount(false);
    setIsValidCard(false);
    setShowPayModal(false);
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: '15%'}}>
        <Header
          onPress={goBack}
          title="Book video consultation"
          containerStyle={{height: '90%'}}
        />
      </SafeAreaView>
      <View style={styles.pageContainer}>
        <BookingCard
          drName={item?.params?.providerData?.name}
          drTitle={item?.params?.providerData?.specialities}
          drImageSource={item?.params?.providerData?.avatar}
          // starRatingValue={3.5}
          dataArray={[bookData]}
          keyMapping={bookappmapping}
        />
        {/* <Card style={styles.card2}>
          <View>
            <Text style={styles.billDetails}>Bill Details</Text>
            <KeyValuePairs
              dataArray={payArray}
              keyMapping={paymapping}
              labelStyle={styles.card2labelStyles}
              valueStyle={styles.valueStyle}
            />
            <Row style={styles.totalPayableRow}>
              <Text style={styles.billDetails}>Total Payable:</Text>
              <Text style={styles.billDetails}>$50</Text>
            </Row>
          </View>
        </Card> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={handleNavigateToPay}></Button>
      </View>
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
          placeholder="Enter Amount"
          onChangeText={(text: any) => {
            setIsValidAmount(false);
            setEnteredAmount(text);
          }}
          isValid={isValidAmout}
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
    </View>
  );
};

export default BookandPay;
