import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
  TurboModuleRegistry,
  Alert,
  StyleSheet,
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
import axios, {AxiosInstance, AxiosError} from 'axios';
import RadioButton from '../../../../components/RadioButton/RadioButton';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {get, post, post3} from '../../../../config/AxiosConfig';
import {colors} from '../../../../assets/colors';
import DropdownComponent from '../../../../components/Dropdown/DropDown';

// Types
interface PaymentModalProps {
  success: () => void;
  visible: (show: boolean) => void;
  appointmentUuid: string;
  providerGroupUuid: string;
  presentType: 'VIRTUAL' | 'IN_PERSON';
  appointmentData: {
    patientUuid: string;
  };
}

interface PaymentResponse {
  code?: string;
  data?: string;
  message?: string;
}

const STRIPE_KEYS = {
  live: 'pk_live_51QX0cgFDolZMURpEaCg6tKBKxpGgc41LycSaqv1wXEUGrfh7vdLZ1rTX8WSDkf0UZ1RBDuvZBWGuMbpkY7BEe6mY003e2OjWQF',
  test: 'pk_test_51QgjuSFyq8hFB20LVDlrM3ZI2RRjIhhv2dERfqTLuOoq3zbYyIfh1Q62duPDimIJeSEMRTdjmRcQkPXg3n3tCC5k00rJI7vX87',
};

const CURRENCY_LIST = [
  'USD ', 'AFN', 'ALL', 'DZD', 'EUR', 'INR', 'AOA', 'XCD', 'ARS', 'AMD',
  'JMD', 'JPY', 'GBP', 'JOD', 'KZT', 'KES', 'AUD', 'KPW', 'KRW', 'KWD',
  'KGS', 'LAK', 'LBP', 'LSL', 'LRD', 'LYD', 'CHF', 'MKD', 'MGA', 'MWK',
  'MYR', 'MVR',
];

const PaymentModal: React.FC<PaymentModalProps> = ({
  success,
  visible,
  appointmentUuid,
  providerGroupUuid,
  presentType,
  appointmentData,
}) => {
  const env = useAppSelector((state: RootState) => state.auth.baseUrl);
  const profileData = useAppSelector((state: RootState) => state.profile.profileData);
  const accessToken = useAppSelector((state: RootState) => state?.auth.loginData?.data?.accessToken);

  const [pgGroupDetails, setPGGroupDetails] = useState<any>(null);
  const [paymentType, setPaymentType] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'cash' | 'online'>('cash');
  const [amount, setAmount] = useState('5.00');
  const [validAmount, setValidAmount] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ');
  const [clientStripId, setClientStripId] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [amountInUSD, setAmountInUSD] = useState(amount);
  const [cashPayLoading, setCashPayLoading] = useState(false);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const pubKey = useMemo(() => 
    env === 'https://api.navalaglobal.com/api/master' ? STRIPE_KEYS.live : STRIPE_KEYS.test,
    [env]
  );

  const axiosInstance = useMemo(() => axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 16000,
  }), [accessToken]);

  const initializeStripe = useCallback(async () => {
    try {
      await initStripe({
        publishableKey: pubKey,
        // Only add these if you have properly configured them in your Apple Developer account
        // merchantIdentifier: 'merchant.com.navalaglobal.navala',
        // urlScheme: 'nota',
      });
    } catch (error) {
      console.error('Stripe Initialization Error:', error);
    }
  }, [pubKey]);

  const getCost = useCallback(async () => {
    try {
      const response: any = await get(`/auth/${providerGroupUuid}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setPGGroupDetails(response?.data);
    } catch (error) {
      console.error('Error fetching cost:', error);
    }
  }, [providerGroupUuid, accessToken]);

  const fetchExchangeRates = useCallback(async () => {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  }, []);

  const getCustomerStripId = useCallback(async () => {
    if (!clientStripId) {
      try {
        const response = await axiosInstance.get(`${env}/patient/${profileData?.data?.uuid}`);
        if (!response?.data?.data?.customerStripeId) {
          await post(`/patient/stripe/add-customer/${appointmentData?.patientUuid}`, null, {
            headers: {Authorization: `Bearer ${accessToken}`},
          });
          const updatedResponse = await axiosInstance.get(`${env}/patient/${profileData?.data?.uuid}`);
          setClientStripId(updatedResponse?.data?.data?.customerStripeId);
          return;
        }
        setClientStripId(response?.data?.data?.customerStripeId);
      } catch (error) {
        console.error('Error fetching customer Stripe ID:', error);
      }
    }
  }, [clientStripId, env, profileData, appointmentData, accessToken, axiosInstance]);

  // Separate useEffect for initialization
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  // Separate useEffect for data fetching
  useEffect(() => {
    getCost();
    fetchExchangeRates();
    getCustomerStripId();
  }, [getCost, fetchExchangeRates, getCustomerStripId]);

  const handleSelection = useCallback((type: string) => {
    setPaymentType(type);
    if (type === 'deposit') {
      setAmount('5.00');
      setSelectedCurrency('USD ');
      setValidAmount(true);
    } else {
      const newAmount = presentType === 'VIRTUAL'
        ? pgGroupDetails?.virtualAmount?.toString()
        : pgGroupDetails?.inPersonAmount?.toString();
      setAmount(newAmount || '0.00');
    }
  }, [presentType, pgGroupDetails]);

  const handleAmountChange = useCallback((newAmount: string, currency: string = selectedCurrency) => {
    setAmount(newAmount);
    if (paymentType === 'deposit' && exchangeRates[currency]) {
      const convertedUSD = (parseFloat(newAmount || '0') / exchangeRates[currency]).toFixed(2);
      setAmountInUSD(convertedUSD);
    }
  }, [paymentType, exchangeRates, selectedCurrency]);

  const handleCurrencyChange = useCallback((curr: string) => {
    const currency = curr.trim();
    if (paymentType === 'deposit') {
      setAmount('5.00');
      if (exchangeRates[currency] && exchangeRates['USD ']) {
        const conversionRate = exchangeRates[currency] / exchangeRates['USD '];
        const newAmount = (parseFloat(amountInUSD || '0') * conversionRate).toFixed(2);
        setSelectedCurrency(currency);
        handleAmountChange(newAmount, currency);
      }
    } else {
      setSelectedCurrency(currency);
    }
  }, [paymentType, exchangeRates, amountInUSD, handleAmountChange]);

  const handlePaymentSuccess = useCallback(() => {
    visible(false);
    success();
  }, [visible, success]);

  const getPaymentClientSecret = useCallback(async () => {
    try {
      const formattedCurrency = selectedCurrency.trim() + ' ';
      const chargeResponse: any = await post3(
        `${env}/stripe-payment/charge-stripe/${appointmentUuid}`,
        {
          amount: `${amount}`,
          customerId: clientStripId,
          currency: {
            name: formattedCurrency
          },
          paymentMode: 'ONLINE',
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );

      if (!chargeResponse?.data) {
        throw new Error('No client secret received');
      }

      return chargeResponse.data;
    } catch (error) {
      const axiosError = error as AxiosError<PaymentResponse>;
      console.error('Error processing payment:', axiosError.response?.data?.message);
      throw error;
    }
  }, [env, appointmentUuid, amount, clientStripId, selectedCurrency, accessToken]);

  const setupPaymentSheet = useCallback(async (clientSecret: string) => {
    try {
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customerId: profileData?.data?.customerId,
        merchantDisplayName: 'NOTA',
        allowsDelayedPaymentMethods: true,
        style: 'automatic',
        returnURL: 'nota://stripe-redirect',
        defaultBillingDetails: {
          name: profileData?.data?.firstName + ' ' + profileData?.data?.lastName,
          email: profileData?.data?.email,
        },
      });

      if (error) {
        console.error('Payment sheet initialization error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error setting up payment sheet:', error);
      throw error;
    }
  }, [initPaymentSheet, profileData]);

  const handlePay = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setValidAmount(false);
      return;
    }
    setValidAmount(true);

    try {
      // Get client secret
      const clientSecret = await getPaymentClientSecret();
      if (!clientSecret) {
        throw new Error('Failed to get client secret');
      }

      // Setup payment sheet
      await setupPaymentSheet(clientSecret);

      // Present payment sheet
      const {error, paymentOption} = await presentPaymentSheet();
      
      if (error) {
        console.log('Payment sheet error:', error);
        Alert.alert('Error', 'Payment failed: ' + error.message);
      } else if (paymentOption) {
        // Payment was successful
        handlePaymentSuccess();
      } else {
        // User cancelled the payment
        console.log('Payment cancelled by user');
        visible(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Failed to process payment. Please try again.');
      visible(false);
    }
  }, [
    amount,
    getPaymentClientSecret,
    setupPaymentSheet,
    presentPaymentSheet,
    handlePaymentSuccess,
    visible,
  ]);

  const handleCollectCashPayment = useCallback(async () => {
    try {
      setCashPayLoading(true);
      const formattedCurrency = selectedCurrency.trim();
      const chargeResponse: any = await post(
        `${env}/stripe-payment/charge-stripe/${appointmentUuid}`,
        {
          amount: amount.toString(),
          customerId: clientStripId,
          currency: {
            name: formattedCurrency
          },
          paymentMode: 'CASH',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (chargeResponse?.code === 'OK') {
        handlePaymentSuccess();
      } else {
        Alert.alert('Error', 'Cash payment failed');
      }
    } catch (error) {
      console.error('Error processing cash payment:', error);
      Alert.alert('Error', 'Failed to process cash payment');
    } finally {
      setCashPayLoading(false);
    }
  }, [env, appointmentUuid, amount, clientStripId, selectedCurrency, accessToken, handlePaymentSuccess]);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 18,
    },
    currencyDropdown: {
      width: '38%',
      height: responsiveHeight(3.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      fontSize: 16,
      height: responsiveHeight(5),
      paddingLeft: 10,
      color: colors.grey90,
      fontWeight: '600',
    },
    buttonContainer: {
      justifyContent: 'space-around',
      marginTop: 20,
    },
  });

  return (
    <Modal transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Payment</Text>
          
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
            <View style={styles.currencyDropdown}>
              <DropdownComponent
                selectedValue={selectedCurrency}
                data={CURRENCY_LIST.map(item => ({
                  label: item,
                  value: item,
                }))}
                value={selectedCurrency}
                onValueChange={handleCurrencyChange}
                placeholder="Select Currency"
                style={{
                  width: '100%',
                  borderColor: '#000',
                   marginBottom:0
                }}
              />
            </View>
          </Row>

          {paymentType !== '' && (
            <Row>
              <View style={{width: '48%'}}>
                <RadioButton
                  selected={paymentMode === 'cash'}
                  label="Cash Payment"
                  onSelect={() => setPaymentMode('cash')}
                />
              </View>
            </Row>
          )}

          {paymentType !== '' && paymentMode === 'cash' && (
            <Row style={{borderWidth: 0, justifyContent: 'space-between'}}>
              <View style={{width: '100%'}}>
                <TextInput
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(text) => handleAmountChange(text, selectedCurrency)}
                  style={styles.input}
                />
                {!validAmount && <Text>*Please enter a valid amount</Text>}
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
                  onChangeText={(text) => handleAmountChange(text, selectedCurrency)}
                  style={styles.input}
                />
                {!validAmount && <Text>*Please enter a valid amount</Text>}
              </View>
            </Row>
          )}

          <Row style={styles.buttonContainer}>
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
              onPress={paymentMode === 'cash' ? handleCollectCashPayment : handlePay}
            />
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
