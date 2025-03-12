import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useStripe, StripeProvider } from "@stripe/stripe-react-native";
import axios from "axios";
import { useAppSelector } from "../../../../redux/store/hooks";
import { RootState } from "../../../../redux/store/storeConfig";
import { useRoute } from "@react-navigation/native";
import { instance, post, post2 } from "../../../../config/AxiosConfig";

const PaymentScreen_Stripe = () => {

  const route = useRoute<any>();

  const {data} = route?.params || {}

  //console.log("data---->",data)

  // appointmentUuid

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD ");
  const [customerStripId, setCustomeStripId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  // const { data: patientData, isSuccess: getpatient } =
  // usePatientControllerServiceGetPatient({
  //   patientUuid: aptData?.patientUuid,
  // });

  // useEffect(() => {
    
  // }, [data]);

    const profileData = useAppSelector(
      (state: RootState) => state.profile.profileData,
    );

    console.log("PROFILE: "+JSON.stringify(profileData));
    

     const uuidForMedicalRecords = useAppSelector(
        (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
      );

      const accessToken = useAppSelector(
        (state: RootState) => state?.auth.loginData?.data?.accessToken,
      );

      console.log("AccessToken: "+accessToken);
      

  const getcustomerStripeId = async () => {
      let csid = profileData?.data?.customerStripeId;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      if (!csid) {
      Alert.alert("c: "+profileData?.data?.uuid)
      try{
        const createCustomerResponse : any = await post2(
          `https://dev.api.navalaglobal.com/api/master/patient/stripe/add-customer/${profileData?.data?.uuid}`, headers
        );

        const cusS_Id = createCustomerResponse.data.customerStripeId;

        setCustomeStripId(cusS_Id)
      }catch (e:any) {
        Alert.alert("Error: "+e)
      }
      }

  };

  console.log("ADSAASD: "+customerStripId);
  

  const getClientSecret = async () => {
    if (profileData)
    {
      await getcustomerStripeId()

      
      // if (!clientSecret && customerStripId) {
      //   const chargeResponse = await instance.post(
      //     `/api/master/stripe-payment/charge-stripe/${data?.appointmentUuid}`,
      //     {
      //       amount: `${amount}`,
      //       customerId: customerStripId,
      //       currency: { name: `${currency}` }, 
      //       paymentMode: "ONLINE",
      //     }
      //   );
      //   setClientSecret(chargeResponse?.data?.data);

      //   console.log("SECRETTTTTT: "+chargeResponse?.data?.data);
        
      // }
    }
  }

  const handlePay = async () => {

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }

    await getClientSecret();

    try {
      // 🔹 Step 1: Initialize Stripe Payment Sheet
      const { error } = await initPaymentSheet({
        merchantDisplayName: "NOTA",
        paymentIntentClientSecret: clientSecret, // Test secret for static integration
        //amount: parseFloat(amount) * 100, // Convert USD to cents
        //currencyCode: "USD",
        //customerId: "",
        allowsDelayedPaymentMethods: true, // Enable all payment methods
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // 🔹 Step 2: Open Stripe Payment Sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert("Payment Failed", paymentError.message);
      } else {
        Alert.alert("Success", "Your payment was successful!");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
      console.error(error);
    }
  };

  //if (!publishableKey) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Amount (USD)</Text>
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            width: "80%",
            textAlign: "center",
            marginBottom: 20,
          }}
        />
        <Button title="Pay" onPress={handlePay} />
      </View>
  );
};

export default PaymentScreen_Stripe;
