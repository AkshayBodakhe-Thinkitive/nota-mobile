import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../components/Card/Card';
import CustomText from '../../../components/Text/CustomText';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../../assets/colors';
import { Text } from 'react-native';
type Props = {
  data: any;
  onTap: () => void;
};


function formatDate(dateString:string) {
  const [year, month, day] = dateString.split('-');
  return `${month}-${day}-${year}`;
}

const IntakeFormListCard = (data: Props) => {
  const validateForNull = (str: string) => {
    if (str == null) {
      return '-';
    } else if (str == undefined) {
      return '-';
    } else if (str == '') {
      return '-';
    } else {
      return str;
    }
  };

  const date = validateForNull(data.data?.sendDate)


  return (
    <TouchableOpacity onPress={data.onTap}>
      <Card height={85} style={styles.card}>
        <View style={styles.labelsContainer}>
          <View style={styles.row}>
            <CustomText style={[styles.label]}>{'Provider Name'}: </CustomText>
            <CustomText numberOfLines={2}  style={[styles.value]}>
              {validateForNull(data.data?.providerName)}
            </CustomText>
            <View
            style={{
              backgroundColor: colors.new_blue,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 5,
              alignSelf: 'center',
              marginLeft: 2
            }}>
            <Text style={{alignItems: 'center',color:'white',fontWeight:'600'}}>{data?.data?.intakeFormStatus}</Text>
          </View>
          </View>
          <View style={styles.row}>
            <CustomText style={[styles.label]}>{'Send Date'}: </CustomText>
            <CustomText style={[styles.value]}>
              {formatDate(date)}
            </CustomText>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default IntakeFormListCard;

const styles = StyleSheet.create({
  card: {
    width: '98.5%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 6,
  },
  labelsContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 14,
  },
  row: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.6),
  },
  label: {
    marginRight: 4,
    width: '30%',
    color: '#1A1A1A80',
    fontSize: responsiveFontSize(1.7),
  },
  value: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
  },
});
