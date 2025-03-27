import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
  TurboModuleRegistry,
  Alert,
} from 'react-native';
import {
  confirmPaymentSheetPayment,
  initPaymentSheet,
  initStripe,
  useStripe,
} from '@stripe/stripe-react-native';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import Row from '../../../../components/Row/Row';
import {Picker} from '@react-native-picker/picker';
import {useAppSelector} from '../../../../redux/store/hooks';
import {RootState} from '../../../../redux/store/storeConfig';
import axios, {AxiosInstance} from 'axios';
import RadioButton from '../../../../components/RadioButton/RadioButton';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {get, post} from '../../../../config/AxiosConfig';
import {colors} from '../../../../assets/colors';

const PaymentModal = ({
  success,
  visible,
  appointmentUuid,
  providerGroupUuid,
  presentType,
  appointmentData,
}: any) => {
  // console.log("appointmentData-->",appointmentData)

  const env = useAppSelector((state: RootState) => state.auth.baseUrl);

  let pubKey = '';

  if (env === 'https://api.navalaglobal.com/api/master') {
    pubKey =
      'pk_live_51QX0cgFDolZMURpEaCg6tKBKxpGgc41LycSaqv1wXEUGrfh7vdLZ1rTX8WSDkf0UZ1RBDuvZBWGuMbpkY7BEe6mY003e2OjWQF';
  } else {
    pubKey =
      'pk_test_51QgjuSFyq8hFB20LVDlrM3ZI2RRjIhhv2dERfqTLuOoq3zbYyIfh1Q62duPDimIJeSEMRTdjmRcQkPXg3n3tCC5k00rJI7vX87';
  }

  const initializeStripe = async () => {
    try {
      await initStripe({publishableKey: pubKey});
    } catch (error) {
      console.error('Stripe Initialization Error:', error);
    }
  };

  const [pgGroupDetails, setPGGroupDetails] = useState<any>();

  const getCost = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await get(`/auth/${providerGroupUuid}`, {headers});
      // console.log('getCost response ===>', response);
      setPGGroupDetails(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    initializeStripe();
    getCost();
  }, []);

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  const instance: AxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 16000,
  });

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [paymentType, setPaymentType] = useState<any>('');

  const [paymentMode, setPaymentMode] = useState<any>('cash');

  const [amount, setAmount] = useState('5.00'); // Default for Deposit
  const [validAmount, setValidAmount] = useState(true);

  const [selectedCurrency, setSelectedCurrency] = useState('USD ');
  const [clientStripId, setClientStripId] = useState<any>(null);
  const [exchangeRates, setExchangeRates] = useState<any>();
  const [amountInUSD, setAmountInUSD] = useState(amount);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.log('Error', 'Failed to fetch exchange rates.');
    }
  };

  const currencyList = [
    'USD ',
    'AFN',
    'ALL',
    'DZD',
    'EUR ',
    'INR',
    'AOA',
    'XCD',
    'ARS',
    'AMD ',
    'JMD ',
    'JPY',
    'GBP ',
    'JOD',
    'KZT',
    'KES',
    'AUD',
    'KPW',
    'KRW',
    'KWD',
    'KGS',
    'LAK',
    'LBP',
    'LSL ',
    'LRD ',
    'LYD',
    'CHF',
    'MKD',
    'MGA',
    'MWK',
    'MYR',
    'MVR',
  ];

  const handleSelection = (type: string) => {
    setPaymentType(type);
    if (type === 'deposit') {
      setAmount('5.00');
      setSelectedCurrency('USD ');
      setValidAmount(true);
    } else {
      presentType === 'VIRTUAL'
        ? setAmount(pgGroupDetails?.virtualAmount?.toString())
        : setAmount(pgGroupDetails?.inPersonAmount?.toString());
    }
  };

  // console.log("paymentType-->",paymentType)

  // console.log('APM_ID: ' + appointmentUuid);
  // console.log('UUID: ' + profileData?.data?.uuid);
  console.log('ClientStripId: ' + clientStripId);

  const [cashPayLoading, setCashPayLoading] = useState(false);

  const handleCollectCashPayment = async () => {
    try {
      console.log('SELECTED C:' + selectedCurrency);
      console.log('AMOUNT: ' + amount);
      setCashPayLoading(true);
      const chargeResponse = await instance.post(
        `${env}/stripe-payment/charge-stripe/${appointmentUuid}`,
        {
          amount: `${amount}`,
          customerId: clientStripId,
          currency: {name: `${selectedCurrency}`},
          paymentMode: 'CASH',
        },
      );
      setCashPayLoading(false);

      console.log('STRIP CLIENT SECREAT: ' + JSON.stringify(chargeResponse));

      if (chargeResponse.data?.code == 'OK') {
        console.log('Payment  In cash Success');
        handlePaymentSuccess();
      } else {
        console.log('Failed for cash');
      }
    } catch (error) {
      console.error('Error processing payment CASH:', JSON.stringify(error));
    }
  };

  const handleCurrencyChange = (curr: string) => {
    if (paymentType === 'deposit') {
      setAmount('5.00');
      const currency = curr.trim();

      if (exchangeRates[currency] && exchangeRates['USD']) {
        const conversionRate = exchangeRates[currency] / exchangeRates['USD']; // Convert from USD
        console.log('CR: ' + conversionRate);

        const newAmount = (
          parseFloat(amountInUSD || '0') * conversionRate
        ).toFixed(2); // Ensure amountInUSD is valid
        console.log('NA: ' + newAmount);

        setSelectedCurrency(curr); // Update state before calling handleAmountChange
        handleAmountChange(newAmount, currency);
      }
    } else {
      setSelectedCurrency(curr);
    }
  };

  const handleAmountChange = (newAmount: string, currency: string) => {
    setAmount(newAmount);

    if (paymentType === 'deposit' && exchangeRates[currency]) {
      const convertedUSD = (
        parseFloat(newAmount || '0') / exchangeRates[currency]
      ).toFixed(2);
      setAmountInUSD(convertedUSD);
    }
  };

  const getCustomerStripId = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (!clientStripId) {
      try {
        const response = await instance.get(
          `${env}/patient/${profileData?.data?.uuid}`,
        );
        console.log("response--->",response?.data?.data)
        if(response?.data?.data?.customerStripeId === null){
          const addCustomerStripeId: any = await post(
            `/patient/stripe/add-customer/${appointmentData?.patientUuid}`,
            null,
            {headers},
          )
          console.log("addCustomerStripeId res 1--->",addCustomerStripeId)
          const response = await instance.get(
            `${env}/patient/${profileData?.data?.uuid}`,
          );
          setClientStripId(response?.data?.data?.customerStripeId);
          return
         }
        setClientStripId(response?.data?.data?.customerStripeId);
      } catch (err) {
        console.log('ERROR: ' + err);
      }
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    //getStripCurrencies();
    getCustomerStripId();
  }, []);

  const handlePaymentSuccess = () => {
    console.log('Payment Success');
    visible(false);
    success();
  };

  const handlePaymentFailed = () => {
    console.log('Payment Failed');
    //visible(false)
  };

  const getPaymentClientSecrete = async () => {
    let clientSecret: string = '';

    try {
      console.log('SELECTED C:' + selectedCurrency);
      console.log('AMOUNT: ' + amount);

      const chargeResponse = await instance.post(
        `${env}/stripe-payment/charge-stripe/${appointmentUuid}`,
        {
          amount: '' + amount,
          customerId: clientStripId,
          currency: {name: `${selectedCurrency}`},
          paymentMode: 'ONLINE',
        },
      );

      clientSecret = chargeResponse?.data?.data;

      console.log('STRIP CLIENT SECREAT: ' + clientSecret);

      return clientSecret;
    } catch (error) {
      console.error('Error processing payment:', JSON.stringify(error));
    }
  };

  const setupPaymentSheet = async (clientSecret: any) => {
    // Initialize Stripe PaymentSheet
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customerId: profileData?.data?.customerId,
      merchantDisplayName: 'NOTA',
      allowsDelayedPaymentMethods: true,
      style: 'automatic',
    });

    if (error) {
      console.log('Error - Payment Intent Creation');
    } else {
      presentPaymentSheetNow();
    }
  };

  const presentPaymentSheetNow = async () => {
    console.log('Payment sheet initialized successfully');
    const {error} = await presentPaymentSheet();
    if (!error) {
      handlePaymentSuccess();
    } else {
      console.log('Payment failed:', error);
      handlePaymentFailed();
    }
  };

  const handlePay = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const paymentAmount = paymentType === 'deposit' ? '5.00' : amount;

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setValidAmount(false);
      return;
    } else {
      setValidAmount(true);
    }

    const cs = await getPaymentClientSecrete();
    await setupPaymentSheet(cs);
  };

  return (
    <Modal transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
              marginBottom: 18,
            }}>
            Payment
          </Text>
          <Row style={{borderWidth: 0}}>
            <RadioButton
              selected={paymentType === 'deposit'}
              label="Deposit"
              onSelect={() => handleSelection('deposit')}
            />
            <RadioButton
              selected={paymentType === 'full'}
              label="Full Payment"
              onSelect={() => handleSelection('full')}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: '#fff',
                borderCurve: 'circular',
                borderRadius: 5,
                width: '38%',
                height: responsiveHeight(3.5),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={selectedCurrency}
                onValueChange={itemValue => handleCurrencyChange(itemValue)}
                dropdownIconColor="#000"
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#000',
                  color: colors.grey90,
                }}>
                {currencyList.length > 0
                  ? currencyList.map(item => (
                      <Picker.Item key={item} label={item} value={item} />
                    ))
                  : ''}
              </Picker>
            </View>
          </Row>

          {paymentType !== '' && (
            <Row style={{}}>
              <View style={{width: '48%'}}>
                <RadioButton
                  selected={paymentMode === 'cash'}
                  label="Cash Payment"
                  onSelect={() => setPaymentMode('cash')}
                />
              </View>
              {/* <RadioButton
          selected={paymentMode === 'online'}
          label="Online Payment"
          onSelect={() =>  setPaymentMode("online")}
        /> */}
            </Row>
          )}

          {paymentType !== '' && paymentMode === 'cash' && (
            <Row style={{borderWidth: 0, justifyContent: 'space-between'}}>
              <View style={{width: '100%'}}>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={handleAmountChange}
                  style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    borderCurve: 'circular',
                    borderRadius: 5,
                    fontSize: 16,
                    height: responsiveHeight(5),
                    paddingLeft: 10,
                    color: colors.grey90,
                    fontWeight: '600',
                  }}
                />
                {!validAmount ? <Text>*Please enter a valid amount</Text> : ''}
              </View>
            </Row>
          )}
          <RadioButton
            selected={paymentMode === 'online'}
            label="Online Payment"
            onSelect={() => setPaymentMode('online')}
          />
          {paymentType !== '' && paymentMode === 'online' && (
            <Row style={{borderWidth: 0, justifyContent: 'space-between'}}>
              <View style={{width: '100%'}}>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={handleAmountChange}
                  style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    borderCurve: 'circular',
                    borderRadius: 5,
                    fontSize: 16,
                    height: responsiveHeight(5),
                    paddingLeft: 10,
                    color: colors.grey90,
                    fontWeight: '600',
                  }}
                />
                {!validAmount ? <Text>*Please enter a valid amount</Text> : ''}
              </View>
            </Row>
          )}

          <Row
            style={{
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SmallButton
              outlined
              title="Cancel"
              containerStyle={{width: '49%'}}
              onPress={() => visible(false)}
            />

            <SmallButton
              title={paymentMode === 'cash' ? 'Collect' : 'Pay'}
              disabled={amount === '0' || amount === '' || paymentType === ''}
              containerStyle={{width: '49%'}}
              onPress={
                paymentMode === 'cash' ? handleCollectCashPayment : handlePay
              }
            />
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
