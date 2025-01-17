import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fontType} from '../../../../assets/fontType';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import Row from '../../../../components/Row/Row';
import Button from '../../../../components/ButtonComponent/ButtonComponent';
// import {colors} from '../../../../constants/Colors';

const ProblemCard = ({
  title,
  children,
  bordered,
  name,
  status,
  type,
  onsetDate,
  note,
  onPressEdit
}: any) => {
  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {color: 'green'};
      case 'historical':
        return {color: 'red'};
      default:
        return {color: 'black'};
    }
  };

  return (
    <Card
      width={'98%'}
      style={{
        marginBottom: 10,
        height: null,
        padding: 10,
        marginHorizontal: 5,
      }}>
      {title && (
        <View
          style={{
            borderBottomWidth: bordered ? 1 : 0,
            padding: 12,
            paddingBottom: bordered ? null : 0,
            borderColor: '#1A1A1A4D',
          }}></View>
      )}
      <Text
        style={{
          color: '#0097F0',
          fontFamily: fontType.Roboto_Bold,
          fontWeight: 'bold',
        }}>
        {name || '-'}
      </Text>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Status'}: </CustomText>
        <CustomText style={[style.value, getStatusColor(status)]}>
          {status}
        </CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Type'}: </CustomText>
        <CustomText style={[style.value]}>{type}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Onset Date'}: </CustomText>
        <CustomText style={[style.value]}>{onsetDate}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Note'}: </CustomText>
        <CustomText style={[style.value]}>{note}</CustomText>
      </View>
      <View style={{flex: 1}}>{children}</View>
      <Row style={{justifyContent: 'flex-end', marginBottom: 8}}>
        <Button
          title="Edit"
          outlined
          textStyle={{fontSize: responsiveFontSize(1.5)}}
          buttonStyle={{height: responsiveHeight(4), padding: 5}}
          onPress={onPressEdit}
        />
      </Row>
    </Card>
  );
};

export default ProblemCard;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 8,
  },
});
