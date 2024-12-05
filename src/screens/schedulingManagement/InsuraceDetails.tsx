import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../components/ButtonComponent/ButtonComponent';
import {useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import Card from '../../components/Card/Card';
import Row from '../../components/Row/Row';
import CustomText from '../../components/Text/CustomText';
import {colors} from '../../assets/colors';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import TextButton from '../../components/TextButton/TextButton';

const InsuraceDetails = () => {
  const InsuranceData = useAppSelector(
    (state: RootState) => state.home.insuranceData,
  );

  const navigation = useNavigation<any>();

  const navigateShow = (item:any) => {
    navigation.navigate('InsDetails',{response:item})
  }

  return (
    <View style={styles.insuranceContainer}>
      <Button
        outlined
        title="+ Add Insurance"
        buttonStyle={styles.addInsButton}
        onPress={() => navigation.navigate('AddInsurance')}
      />
      <FlatList
        data={InsuranceData}
        contentContainerStyle={styles.insContainer}
        ListEmptyComponent={() => (
          <View style={{marginTop: '40%'}}>
            <ListEmptyComponent message="No Insurance data to show!" />
          </View>
        )}
        renderItem={({item, index}) => {
          return (
            <Card
              width={null}
              height={null}
              style={{marginTop: 5, marginHorizontal: '3%'}}>
              <View style={{margin: '3%'}}>
                <Row>
                  <CustomText
                    color={colors.primary}
                    fontSize={responsiveFontSize(2)}>
                    {item?.insuranceType?.charAt(0).toUpperCase() +
                      item?.insuranceType?.slice(1)?.toLowerCase()}{' '}
                    Insurance
                  </CustomText>
                </Row>
                <Row style={styles.rowStyle}>
                  <Text>Insurance Name : </Text>
                  <Text>{item?.insurancePayer?.payerName}</Text>
                </Row>
                <Row style={styles.rowStyle}>
                  <Text>Plan Name : </Text>
                  <Text>{item?.planName}</Text>
                </Row>
                <Row style={styles.rowStyle}>
                  <Text>Group ID : </Text>
                  <Text>{item?.groupId}</Text>
                </Row>
                <Row style={styles.rowStyle}>
                  <Text>Member ID : </Text>
                  <Text>{item?.memberId}</Text>
                </Row>
              </View>
              <Image
                source={{
                  uri: item?.frontPhoto,
                }}
                resizeMode="cover"
                style={styles.cardImageStyles}
              />
              <Image
                source={{
                  uri: item?.backPhoto,
                }}
                resizeMode="cover"
                style={styles.cardImageStyles}
              />
              <Row style={styles.btnRow}>
                <TextButton text="View More" onPress={() => navigateShow(item)}/>
              </Row>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default InsuraceDetails;

const styles = StyleSheet.create({
  insuranceContainer: {
    flex: 1,
  },
  addInsButton: {
    width: '50%',
    alignSelf: 'flex-end',
    marginVertical: '2%',
    marginRight: '3%',
  },
  insContainer: {
    paddingBottom: responsiveHeight(10),
    marginTop: '3%',
  },
  cardImageStyles: {
    height: responsiveHeight(21),
    width: '80%',
    marginVertical: 6,
    borderRadius: 8,
    marginLeft: '5%',
  },
  rowStyle: {
    marginVertical: 2,
  },
  btnRow: {
    justifyContent: 'flex-end',
    width: '100%',
    padding: 8,
  },
});
