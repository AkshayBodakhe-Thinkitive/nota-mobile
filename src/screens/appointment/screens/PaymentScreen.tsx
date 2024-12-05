import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Row from '../../../components/Row/Row';
import { PaymentScreenStyles as styles } from '../styles/PaymentScreenStyles';
// import { AppNavConstants } from '../../../constants/NavConstants';

const PaymentScreen = () => {
  const navigation = useNavigation<any>()

  const handleNavigate = () => {
   navigation.navigate('bookingconfirmed')
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Payment Interface</Text>
      </SafeAreaView>
      <Row style={styles.buttonsContainer}>
        <Button outlined title="Cancel" buttonStyle={styles.buttonStyles} />
        <Button title="Pay" buttonStyle={styles.buttonStyles} onPress={handleNavigate}/>
      </Row>
    </View>
  );
};

export default PaymentScreen;
