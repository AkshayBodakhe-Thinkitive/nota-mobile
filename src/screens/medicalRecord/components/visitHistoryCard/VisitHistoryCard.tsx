import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import {colors} from '../../../../assets/colors';
import TextButton from '../../../../components/TextButton/TextButton';

const VisitHistoryCard = ({
  title,
  visitDate,
  location,
  reasonForVisit,
  medication,
  bordered,
  onTapViewMore,
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

  return (
    <Card width={'100%'} style={{marginBottom: 10, height: null}}>
      {title && (
        <View
          style={{
            borderBottomWidth: bordered ? 1 : 0,
            padding: 12,
            paddingBottom: bordered ? null : 0,
            borderColor: '#1A1A1A4D',
          }}>
          <CustomText color={colors.primary} fontSize={responsiveFontSize(2.2)}>
            {title}
          </CustomText>
        </View>
      )}
      <View style={style.labelsContainer}>
        <View style={style.row}>
          <CustomText style={[style.label]}>{'Visit Date'}: </CustomText>
          <CustomText style={[style.value]}>
            {validateForNull(visitDate)}
          </CustomText>
        </View>
        <View style={style.row}>
          <CustomText style={[style.label]}>{'Location'}: </CustomText>
          <CustomText style={[style.value]}>
            {validateForNull(location)}
          </CustomText>
        </View>
        <View style={style.row}>
          <CustomText style={[style.label]}>{'Reason For Visit'}: </CustomText>
          <CustomText style={[style.value]}>
            {validateForNull(reasonForVisit)}
          </CustomText>
        </View>
        <View style={style.row}>
          <CustomText style={[style.label]}>{'Medication'}: </CustomText>
          <CustomText style={[style.value]}>
            {validateForNull(medication)}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          paddingRight: 10,
          paddingBottom: 5,
          alignItems: 'flex-end',
        }}>
        <TextButton onPress={()=>{onTapViewMore()}} text="View More" />
      </View>
    </Card>
  );
};

export default VisitHistoryCard;

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
