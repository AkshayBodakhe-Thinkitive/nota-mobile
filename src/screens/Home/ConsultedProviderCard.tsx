import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {validateStringForNull} from '../../common/Helper';
import Card from '../../components/Card/Card';
import {useAppDispatch} from '../../redux/store/hooks';
import {GetProviderByUuid} from '../../redux/reducers/home/aysnc-actions/GetProviderByUuid';
import SmallButton from '../../components/SmallButton/SmallButton';

const ConsultedProviderCard = ({
  name,
  providerImage,
  specialities,
  visitDate,
  data,
  accessToken,
  selectedData,
}: any) => {
  const dispatch = useAppDispatch();

  const getSpecialityStr = (specialityArray: any) => {
    if (specialityArray == undefined || specialityArray == null) {
      return '-';
    } else {
      if (specialityArray?.length == 1) {
        return validateStringForNull(specialityArray?.[0]?.name);
      } else if (specialityArray?.length > 1) {
        return 'Multispecialist';
      } else {
        return '-';
      }
    }
  };

  return (
    <Card width={'100%'} style={styles.providerCardContainer} height={null}>
      <Image
        source={
          providerImage === null || providerImage === undefined
            ? ImagePath1.profileDefault
            : {
                uri: providerImage,
              }
        }
        style={styles.providerImgStyle}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#1A1A1A',
              fontWeight : '600',
              fontFamily: fontType.Roboto_Medium,
              fontSize: 16,
            }}>
            {`Dr. ${validateStringForNull(name)}`}
          </Text>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => {
              dispatch(
                GetProviderByUuid({
                  id: data.providerGroup,
                  accessToken: accessToken,
                }),
              );
              selectedData(data);
            }}>
            <Text style={{padding: 5, color: '#FFFFFF'}}>Book Again</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: '#1A1A1A80',
              fontFamily: fontType.Roboto_Medium,
              fontSize: 14,
              bottom: 4,
            }}>
            {getSpecialityStr(specialities)}
          </Text>
          {/* <Text
            style={{
              color: colors.navala_grey,
              fontSize: 10,
              fontFamily: fontType.Roboto_Regular,
            }}>
            {validateStringForNull(visitDate) === '-'
              ? '-'
              : moment(visitDate).format('DD-MM-YYYY')}
          </Text> */}
        
        </View>
      </View>
    </Card>
  );
};

export default ConsultedProviderCard;

const styles = StyleSheet.create({
  providerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    padding: '4%',
    // paddingHorizontal: 12,
    // paddingRight: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },
  bookBtn: {
    backgroundColor: colors.app_color1,
    height: 30,
    // width: '31%',
    borderRadius: 5,
    marginVertical: 3,
    alignItems: 'center',
  },
  providerImgStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 8,
  },
});
