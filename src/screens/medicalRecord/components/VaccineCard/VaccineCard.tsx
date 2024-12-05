import {Image, StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
import {ImagePath1} from '../../../../Constants1/ImagePathConstant1';
import Row from '../../../../components/Row/Row';
import Button from '../../../../components/ButtonComponent/ButtonComponent';

const VaccineCard = ({
  vaccineName,
  status,
  doseDuration,
  startDate,
  note,
  onPressEdit
}: any) => {
  return (
    <Card width={'100%'} height={null} style={{padding: 10, marginBottom: 8}}>
      <View style={{borderWidth: 0, alignItems: 'center'}}>
        <Image
          source={ImagePath1.vaccine}
          resizeMode="cover"
          style={{
            height: responsiveHeight(9),
            width: responsiveHeight(9),
            marginRight: 15,
          }}
        />
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Vaccine Name'}: </CustomText>
        <CustomText style={[style.value]}>{vaccineName}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Status'}: </CustomText>
        <CustomText style={[style.value]}>{status}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Dose'}: </CustomText>
        <CustomText style={[style.value]}>{doseDuration}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Start Date'}: </CustomText>
        <CustomText style={[style.value]}>{startDate}</CustomText>
      </View>
      <View style={style.row}>
        <CustomText style={[style.label]}>{'Note'}: </CustomText>
        <CustomText style={[style.value]}>{note}</CustomText>
      </View>
      <Row style={{justifyContent: 'flex-end', marginBottom: 8}}>
        <Button
          title="Edit"
          outlined
          textStyle={{fontSize: responsiveFontSize(1.5)}}
          buttonStyle={{height: responsiveHeight(4)}}
          onPress={onPressEdit}
        />
      </Row>
    </Card>
  );
};
export default VaccineCard;
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
