import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {getCardsAction} from '../../redux/reducers/payments/async-actions/getCardsAction';
import {RootState} from '../../redux/store/storeConfig';
import {colors} from '../../assets/colors';
import Card from '../../components/Card/Card';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Button from '../../components/ButtonComponent/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const CardsList = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<any>()

  useEffect(() => {
    dispatch(getCardsAction());
  }, []);

  const cardsData = useAppSelector(
    (state: RootState) => state.payments?.cardsData,
  );

  // console.log('cardsData on screen=>', cardsData);

  const CardItem = ({item}: any) => {
    return (
     <>
     <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Card Holder Name : </Text>
          <Text style={styles.value}>{`${item.cardHolderFirstName} ${item.cardHolderLastName}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Card Type : </Text>
          <Text style={styles.value}>{item.cardType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Card Mode : </Text>
          <Text style={styles.value}>{item.cardMode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Card Expiry : </Text>
          <Text style={styles.value}>{item.cardExp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Four Digit : </Text>
          <Text style={styles.value}>
          {`**** **** **** ${item.lastFour}`}
          </Text>
        </View>
    </Card>
     </>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="+ Add Card"
        buttonStyle={styles.addInsButton}
        onPress={() => navigation.navigate('addcard')}
      />
      <FlatList
        data={cardsData}
        bounces={false}
        keyExtractor={item => item?.uuid}
        renderItem={({item}) => <CardItem item={item} />}
      />
    </View>
  );
};

export default CardsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addInsButton: {
    width: '30%',
    alignSelf: 'flex-end',
    marginVertical: '2%',
    marginRight: '3%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardCell: {
    flex: 1,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: '3%',
    marginVertical : '1%',
    padding : '3%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height : null,
    width:null
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: responsiveFontSize(1.7),
    width:'40%'
  },
  value: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
  },
});
