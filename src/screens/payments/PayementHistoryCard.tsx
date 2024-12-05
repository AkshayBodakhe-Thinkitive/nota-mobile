import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {formatDate} from '../../utils/DateUtils';
import Card from '../../components/Card/Card';

const PaymentHistoryCard = ({item}: any) => {
  const formatDateToMMDDYYYY = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  };

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Trx ID:</Text>
        <Text style={styles.value}>{item.txId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Trx Date:</Text>
        <Text style={styles.value}>{formatDate(item?.transactionDate)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Trx Amount:</Text>
        <Text style={styles.value}>{item.txAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Payment Mode:</Text>
        <Text style={styles.value}>{item.paymentMode}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Appointment Date:</Text>
        <Text style={styles.value}>
          {formatDateToMMDDYYYY(item?.appointmentId?.appointmentDate)}{' '}
          {item?.appointmentId?.startTime?.slice(0, 5)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Provider Name:</Text>
        <Text style={styles.value}>{item?.appointmentId?.provider}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Transaction Status:</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: '1%',
    padding: '3%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: null,
    width: null,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: responsiveFontSize(1.7),
    width: '40%',
  },
  value: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
  },
});

export default PaymentHistoryCard;
