import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Modal, Button, TouchableOpacity, TurboModuleRegistry, Alert } from "react-native";
import { confirmPaymentSheetPayment, initPaymentSheet, initStripe, useStripe } from "@stripe/stripe-react-native";
import SmallButton from "../../../../components/SmallButton/SmallButton";
import Row from "../../../../components/Row/Row";
import { Picker } from "@react-native-picker/picker";
import { useAppSelector } from "../../../../redux/store/hooks";
import { RootState } from "../../../../redux/store/storeConfig";
import axios, { AxiosInstance } from "axios";
import PaymentSuccessModal from "./PaymentSuccessModal";

const PaymentModal = ({ success, visible, appointmentUuid }) => {

  const BASE_URL_DEV = 'https://dev.api.navalaglobal.com/api/master/';
  const BASE_URL_QA = 'https://qa.api.navalaglobal.com/api/master/';
  const BASE_URL_PROD = 'https://api.navalaglobal.com/api/master/';

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const accessToken = useAppSelector(
    (state: RootState) => state?.auth.loginData?.data?.accessToken,
  );

  //console.log("TOKEN: "+accessToken);


  const instance: AxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 16000,
  });


  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentType, setPaymentType] = useState("deposit");
  const [amount, setAmount] = useState("5.00"); // Default for Deposit
  const [validAmount, setValidAmount] = useState(true)
  const [exchangeRates, setExchangeRates] = useState();
  const [amountInUSD, setAmountInUSD] = useState(amount); // Store the original amount in USD


  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [clientStripId, setClientStripId] = useState(null);

  const currencyList = [
    "usd", "aed", "afn", "all", "amd", "ang", "aoa", "ars", "aud", "awg", "azn", "bam", "bbd", "bdt", "bgn", "bhd",
    "bif", "bmd", "bnd", "bob", "brl", "bsd", "bwp", "byn", "bzd", "cad", "cdf", "chf", "clp", "cny", "cop", "crc",
    "cve", "czk", "djf", "dkk", "dop", "dzd", "egp", "etb", "eur", "fjd", "fkp", "gbp", "gel", "gip", "gmd", "gnf",
    "gtq", "gyd", "hkd", "hnl", "hrk", "htg", "huf", "idr", "ils", "inr", "isk", "jmd", "jod", "jpy", "kes", "kgs",
    "khr", "kmf", "krw", "kwd", "kyd", "kzt", "lak", "lbp", "lkr", "lrd", "lsl", "mad", "mdl", "mga", "mkd", "mmk",
    "mnt", "mop", "mur", "mvr", "mwk", "mxn", "myr", "mzn", "nad", "ngn", "nio", "nok", "npr", "nzd", "omr", "pab",
    "pen", "pgk", "php", "pkr", "pln", "pyg", "qar", "ron", "rsd", "rub", "rwf", "sar", "sbd", "scr", "sek", "sgd",
    "shp", "sle", "sos", "srd", "std", "szl", "thb", "tjs", "tnd", "top", "try", "ttd", "twd", "tzs", "uah", "ugx",
    "uyu", "uzs", "vnd", "vuv", "wst", "xaf", "xcd", "xof", "xpf", "yer", "zar", "zmw", "usdc", "btn", "ghs", "eek",
    "lvl", "svc", "vef", "itl", "sll", "mro"
  ];

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
      setExchangeRates(response.data.rates);
      console.log("RATE: " + JSON.stringify(response?.data?.rates));

    } catch (error) {
      Alert.alert("Error", "Failed to fetch exchange rates.");
    } finally {
      //setLoading(false);
    }
  };


  const handleSelection = (type: string) => {
    setPaymentType(type);
    if (type === "deposit") {
      setAmount("5.00");
      setValidAmount(true)
    } else {
      setAmount("");
    }
  };

  console.log("APM_ID: " + appointmentUuid);
  console.log("UUID: " + profileData?.data?.uuid);
  console.log("ClientStripId: " + clientStripId);

  // Handle currency change and convert amount
  const handleCurrencyChange = (currency: string) => {
    const UPPER_CURRENCY = currency.toUpperCase();

    if (exchangeRates[UPPER_CURRENCY]) {
      const conversionRate = exchangeRates[UPPER_CURRENCY] / exchangeRates["USD"]; // Convert from USD
      const newAmount = (parseFloat(amountInUSD) * conversionRate).toFixed(2); // Always convert from USD

      //setAmount(newAmount);
      handleAmountChange(newAmount)
      setSelectedCurrency(currency);
    }
  };

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    setAmountInUSD((parseFloat(newAmount) / exchangeRates[selectedCurrency]).toFixed(2)); // Store in USD
  };

  const getCustomerStripId = async () => {
    if (!clientStripId) {
      console.log("1");

      try {
        const response = await instance.get(`https://dev.api.navalaglobal.com/api/master/patient/${profileData?.data?.uuid}`);

        setClientStripId(response?.data?.data?.customerStripeId)
      } catch (err) {
        console.log("ERROR: " + err);
      }
    }
  }

  useEffect(() => {
    fetchExchangeRates()
    getCustomerStripId();
  }, []);

  const handlePaymentSuccess = ()=>{
    //console.log("Payment Success");
    visible(false)
    //<PaymentSuccessModal visible={true} onClose={()=>void}/>
    success()
  }

  const handlePaymentFailed = ()=>{
    console.log("Payment Failed");
    //visible(false)
  }

  const getPaymentClientSecrete = async ()=>{
    let clientSecret:string = "";

      try {
        const chargeResponse = await instance.post(`https://dev.api.navalaglobal.com/api/master/stripe-payment/charge-stripe/${appointmentUuid}`,
          {
            amount: "1000",
            customerId: clientStripId,
            currency: { name: "USD " },
            paymentMode: "ONLINE",
          }
        );
        clientSecret = chargeResponse?.data?.data;

        console.log("STRIP CLIENT SECREAT: " + clientSecret);

        return clientSecret;
      } catch (error) {
        console.error("Error processing payment:", error);
      }
  }

  const setupPaymentSheet = async (clientSecret:any)=>{
    // Initialize Stripe PaymentSheet
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customerId: profileData?.data?.customerId,
      merchantDisplayName: "NOTA",
      allowsDelayedPaymentMethods: true,

      // applePay: {
      //   merchantCountryCode: 'US',
      //   cartItems: [
      //     {
      //       paymentType: 'Recurring',
      //       label: 'This is a subscription',
      //       amount: '10.00',
      //       intervalCount: 1,
      //       intervalUnit: 'month',
      //     },
      //   ],
      // },
      style: 'automatic',
    });
  
    if (error)
    {
      console.log("Error - Payment Intent Creation");
    }else{
      presentPaymentSheetNow()
    }
  }

  const presentPaymentSheetNow = async ()=>{
    console.log("Payment sheet initialized successfully");
    const { error } = await presentPaymentSheet();
    if (!error) {
      handlePaymentSuccess()
    } else {
      console.log("Payment failed:", error);
      handlePaymentFailed()
    }
  }

  const handlePay = async () => {
      const paymentAmount = paymentType === "deposit" ? "5.00" : amount;

      if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
        setValidAmount(false)
        return;
      } else {
        setValidAmount(true)
      }

      const cs = await getPaymentClientSecrete()

      await setupPaymentSheet(cs)
  }

  return (
    <Modal transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 18 }}>Payment</Text>

          {/* Radio Buttons */}
          <TouchableOpacity onPress={() => handleSelection("deposit")}>
            <Text>{paymentType === "deposit" ? "🔘" : "⚪"} Deposit (5.00)</Text>
          </TouchableOpacity>
          <View style={{ height: 12 }}></View>
          <TouchableOpacity onPress={() => handleSelection("full")}>
            <Text>{paymentType === "full" ? "🔘" : "⚪"} Full Payment</Text>
          </TouchableOpacity>

          <View style={{
            borderWidth: 1,
            borderColor: "#000",
            marginTop: 20,
            backgroundColor: "#fff",
            borderCurve: 'circular',
            borderRadius: 5
          }}>
            <Picker
              selectedValue={selectedCurrency}
              onValueChange={(itemValue: string) => handleCurrencyChange(itemValue)}
              style={{ height: 50, width: "100%", borderWidth: 2, borderColor: "#000" }}
            >
              {currencyList.map((currency) => (
                <Picker.Item key={currency} label={currency.toUpperCase()} value={currency} />
              ))}
            </Picker>
          </View>

          {/* Amount Input */}
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            editable={paymentType === "full"}
            onChangeText={handleAmountChange}
            style={{
              borderWidth: 1,
              borderColor: "#000",
              padding: 10,
              marginTop: 20,
              backgroundColor: paymentType === "deposit" ? "#f0f0f0" : "#fff",
              borderCurve: 'circular',
              borderRadius: 5
            }}
          />

          {!validAmount ? (
            <Text >*Please enter a valid amount</Text>) : ""}

          <Row
            style={{
              justifyContent: 'space-around',
              marginTop: 20,
            }}>

            <SmallButton
              outlined
              title="Cancle"
              containerStyle={{ width: '49%' }}
              onPress={() => visible(false)}
            />


            <SmallButton
              title="Pay"
              containerStyle={{ width: '49%' }}
              onPress={handlePay}
            />
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

