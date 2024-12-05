import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import React, {useEffect, useState} from 'react';
import {getPaymentHistoryAction} from '../../redux/reducers/payments/async-actions/getPayHistoryAction';
import {RootState} from '../../redux/store/storeConfig';
import {colors} from '../../assets/colors';
import PaymentHistoryCard from './PayementHistoryCard';
import Paginator from '../../components/Paginator/Paginator';

const PaymentHistory = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    dispatch(getPaymentHistoryAction(currentPage));
  }, [currentPage]);

  const loading = useAppSelector((state: RootState) => state.payments?.loading);

  const paymentHistory = useAppSelector(
    (state: RootState) => state.payments?.paymentsHistoryData?.data?.content,
  );

  const paymentHis = useAppSelector(
    (state: RootState) => state.payments?.paymentsHistoryData?.data,
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator color={colors.primary} />;
  };


  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentHistory}
        keyExtractor={item => item.transactionId}
        renderItem={({item}) => <PaymentHistoryCard item={item} />}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
      {paymentHistory && (
        <Paginator
          currentPage={currentPage}
          totalPages={paymentHis.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
