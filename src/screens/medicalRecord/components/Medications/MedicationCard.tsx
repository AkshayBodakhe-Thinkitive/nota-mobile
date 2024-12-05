import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import Button from '../../../../components/ButtonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';

const MedicationCard = ({
  name,
  startDate,
  endDate,
  dosageTime,
  dosageUnit,
  dosageWhen,
  duration,
  sig,
  note,
  item,
  type,
}: any) => {
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

  function formatDate(dateString: string) {
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      return `${month}-${day}-${year}`;
    }
  }

  const Row = ({label, value}: any) => {
    return (
      <View style={style.row}>
        <CustomText style={[style.label]}>{label}: </CustomText>
        <CustomText style={[style.value]}>{validateForNull(value)}</CustomText>
      </View>
    );
  };

  const navigation = useNavigation<any>();

  return (
    <Card
      width={'100%'}
      style={{marginBottom: 10, height: null, paddingBottom: 8}}>
      <View style={style.labelsContainer}>
        <Row label={'Medicine'} value={name} />
        <Row label={'Start Date'} value={formatDate(startDate)} />
        <Row label={'End Date'} value={formatDate(endDate)} />
        <Row label={'Dosage Time'} value={dosageTime} />
        <Row label={'Dosage Unit'} value={dosageUnit} />
        <Row label={'Dosage When'} value={dosageWhen} />
        <Row label={'duration'} value={duration} />
        <Row label={'Sig'} value={sig} />
        <Row label={'Note'} value={note} />
        {/* {type && type === 'current' && ( */}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              title="Edit"
              outlined
              onPress={() =>
                navigation.navigate('AddMedication', {update: true, item: item})
              }
            />
          </View>
        {/* )} */}
      </View>
    </Card>
  );
};

export default MedicationCard;

const style = StyleSheet.create({
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
