import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import {colors} from '../../../../assets/colors';
import moment from 'moment';

const AppointmentDetailsCard = ({
  name,
  idNo,
  birthDate,
  providerName,
  appointmentDate,
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

  const getAge = () => {
    let birthDt = validateForNull(birthDate);
    if (birthDt != '-') {
      const dob = moment(birthDate);
      const currentDate = moment();
      const age = currentDate.diff(dob, 'years');
      if (age == null) {
        return '-'
      } else if (age == undefined) {
        return '-'
      } else {
        return `${age} yr`
      }
    } else {
        return '-'
    }
  };

  const getBirthDateStr = () => {
    let birthDt = validateForNull(birthDate);
    if (birthDt != '-') {
        let date = moment(birthDt).format('MMM DD YYYY')
        if (date == null) {
          return '-'
        } else if (date == undefined) {
          return '-'
        } else {
          return date
        }
    } else {
        return '-'
    }
  }

  const RowContainer = ({label, value}: any) => {
    return (
      <View style={style.row}>
        <CustomText style={[style.label]}>{label}: </CustomText>
        <CustomText style={[style.value]}>{validateForNull(value)}</CustomText>
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
          Appointments Details
        </CustomText>
      </View>
      <View
        style={{
          width: '100%',
          height: 0.5,
          backgroundColor: colors.navala_grey,
        }}
      />
      <View style={style.labelsContainer}>
        <RowContainer label={'Name'} value={name} />
        <RowContainer label={'Age'} value={getAge()} />
        <RowContainer label={'Id No'} value={`#${idNo.substring(0, 4)}`} />
        <RowContainer
          label={'Dob'}
          value={getBirthDateStr()}
        />
        <RowContainer label={'Provider Name'} value={providerName} />
        <RowContainer
          label={'Appt. Date/Time'}
          value={moment(appointmentDate).format('MMM DD YYYY, h:mm A')}
        />
      </View>
    </Card>
  );
};
export default AppointmentDetailsCard;

const style = StyleSheet.create({
  labelsContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 14,
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
