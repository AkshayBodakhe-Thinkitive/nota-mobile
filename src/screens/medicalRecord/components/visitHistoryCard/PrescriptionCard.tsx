import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import {colors} from '../../../../assets/colors';
import moment from 'moment';
import {Text} from 'react-native-paper';
import {fontType} from '../../../../assets/fontType';
import {FlatList} from 'react-native';

const PrescriptionCard = (prescription: any) => {
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

  const medicationData: [any] = prescription?.prescription;

  const calculateRemainingDuration = ({startDate, endDate, duration}: any) => {
    const today = moment().startOf('day');
    const start = moment(startDate);
    const end = moment(endDate);

    // If today's date is before the start date, the remaining duration is the full duration
    if (today.isBefore(start)) {
      return duration;
    }

    // If today's date is after the end date, the remaining duration is 0
    if (today.isAfter(end)) {
      console.log('todays date is after the end date', 'Today:',today, ' start:', start, ' end:', end);
      
      return 0;
    }

    // Calculate the number of days passed since the start date
    const daysPassed = today.diff(start, 'days');

    if (daysPassed == 0) {
        return duration
    }
    // Calculate the remaining duration
    const remainingDuration = (duration - daysPassed)
    // Ensure the remaining duration doesn't go below 0
    return remainingDuration > 0 ? remainingDuration : 0;
  };

  const RowContainer = ({label, value}: any) => {
    return (
      <View style={style.row}>
        <CustomText style={[style.label]}>{label}: </CustomText>
        <CustomText style={[style.value]}>{validateForNull(value)}</CustomText>
      </View>
    );
  };

  const MedicationContainer = ({medication, index}: any) => {
    return (
      <View>
        {index == 0 ? null : (
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: colors.navala_grey,
            }}
          />
        )}

        <View style={style.labelsContainer}>
          <RowContainer
            label={'Medicine'}
            value={medication?.drugCatalog?.medicine}
          />
          <RowContainer
            label={'Start Date'}
            value={moment(medication?.startDate).format('MM-DD-YYYY')}
          />
          <RowContainer
            label={'Duration'}
            value={`${medication?.duration} Days`}
          />
          <RowContainer label={'Note'} value={medication?.note} />
          <RowContainer
            label={'Est End Date'}
            value={moment(medication?.endDate).format('MM-DD-YYYY')}
          />
          <RowContainer
            label={'Remaining Duration'}
            value={`${calculateRemainingDuration({
              startDate: medication?.startDate,
              endDate: medication?.endDate,
              duration: medication?.duration,
            })} Days`}
          />
             <RowContainer
            label={'Note'}
            value={`${medication?.note}`}
          />
        </View>
      </View>
    );
  };

  return (
    <Card width={'100%'} style={{marginBottom: 10, height: null}}>
      <View
        style={{
          borderBottomWidth: 1,
          padding: 12,
          borderColor: '#1A1A1A4D',
        }}>
        <CustomText color={colors.primary} fontSize={responsiveFontSize(2.2)}>
          Prescription/Orders
        </CustomText>
      </View>
      <View style={style.labelsContainer}>
        {prescription?.prescription?.length > 0 ? (
          <FlatList
            data={prescription.prescription}
            contentContainerStyle={[{paddingHorizontal: 5}]}
            renderItem={({item, index}) => {
              return <MedicationContainer medication={item} index={index} />;
            }}
          />
        ) : (
          <View style={{height: 70, width: '100%', justifyContent: 'center'}}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                fontWeight: '600',
                color: 'black',
              }}>
              No Medications
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};
export default PrescriptionCard;

const style = StyleSheet.create({
  labelsContainer: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    //   borderWidth : 1,
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
