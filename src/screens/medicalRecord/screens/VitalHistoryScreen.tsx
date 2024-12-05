import {FlatList, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import {colors} from '../../../assets/colors';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import TopNavigationView from '../../../common/topNavigationView';
import VitalsCard from '../components/vitalscard/VitalsCard';
import {getVitalIcon, getVitalNameStr} from '../constants/utils';
import moment from 'moment';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomText from '../../../components/Text/CustomText';
import Card from '../../../components/Card/Card';
import Row from '../../../components/Row/Row';
import MaterialCommunityIcons from '../../../components/Icons/MaterialCommunityIcons';
import {useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import { fontType } from '../../../assets/fontType';

const VitalHistoryScreen = ({navigation, route}: any) => {
  const goBack = () => {
    navigation.pop();
  };

  const vitalData = useAppSelector(
    (state: RootState) => state.medicalrecord.vitalsData,
  );

  const {item} = route && route?.params;

//   console.log('item =>', item);

  const recordsForHistory = vitalData?.data?.content
    ?.filter((record: any) => record.name === item.name)
    ?.map((record: any) => ({
      ...record,
      date: moment(record.recordedDate).format('MM/DD/YYYY'),
      time: moment(record.recordedDate).format('hh:mm A'),
      unit:
        record.unit ||
        (record.name === 'HEART_RATE'
          ? 'bpm'
          : record.name === 'BLOOD_PRESSURE'
          ? 'mmHg'
          : record.name === 'RESPIRATION_RATE'
          ? 'bpm'
          : ''),
    }));

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '20%' : '20%'}>
        <TopNavigationView
          title="Vital History"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      
      <View style={{marginTop: '-10%'}}>
        <VitalsCard
          title={getVitalNameStr(item.name)}
          highTitle={item.highTitle}
          lowTitle={item.lowTitle}
          highValue={item.value1}
          lowValue={item.value2}
          unit={item.unit}
          singleValue={item.singleValue}
          image={getVitalIcon(item.name)}
          datestr={moment(item.recordedDate).format('MM/DD/YYYY HH:MM A')}
          onPressHistory={() =>
            navigation.navigate('VitalHistoryScreen', {item: item})
          }
          showHistoryBtn={false}
        />
      </View>
      <View >
        <CustomText
          style={{marginVertical: 10,marginLeft:6}}
            fontFamily={fontType.Roboto_Medium}
          fontSize={responsiveFontSize(2.3)}>
          History
        </CustomText>
       <ScrollView style={{height:'60%'}}>
       <Card width={null} height={null} style={{marginHorizontal: 5,marginTop:5,marginBottom:10}}>
          <FlatList
            scrollEnabled={false}
            data={recordsForHistory}
            ListEmptyComponent={
              <View>
                <CustomText
                  style={{padding: 8, fontSize: responsiveFontSize(2)}}>
                  No History for this Date!
                </CustomText>
              </View>
            }
            renderItem={({item}) => {
              const value1 = item.value1;
              const value2 = item.value2;
              const value2String = value2 ? `/${value2}` : '';
              const result = `${value1}${value2String}`;
              return (
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: '#D9D9D9',
                  }}>
                  <Row style={{alignItems: 'flex-start'}}>
                    <MaterialCommunityIcons
                      color="#22AE19"
                      size={responsiveFontSize(3)}
                      name="check-decagram"
                      style={{marginRight: 8}}
                    />
                    <View>
                      <CustomText
                        style={{marginBottom: 10}}
                        color="#1A1A1A66"
                        fontSize={responsiveFontSize(2)}>
                        {item?.date} at {item?.time}
                      </CustomText>
                      <Row>
                        <CustomText
                          style={{marginRight: 6}}
                          fontSize={responsiveFontSize(2.3)}>
                          {result ? result : '-'}
                        </CustomText>
                        <CustomText  fontSize={responsiveFontSize(2)} color="#1A1A1A66">{item?.unit}</CustomText>
                      </Row>
                    </View>
                  </Row>
                </View>
              );
            }}
          />
        </Card>
       </ScrollView>
      </View>
    </View>
  );
};

export default VitalHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingBottom: 60,
    // marginBottom: 60,
  },
});
