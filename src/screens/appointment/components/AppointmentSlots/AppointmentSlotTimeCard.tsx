import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../components/Card/Card';
import Toast from 'react-native-simple-toast';
import { colors } from '../../../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { fontType } from '../../../../assets/fontType';
import { selectedSlots } from '../../../../redux/reducers/home/HomeReducer';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks';
import moment from 'moment';


const AppointmentSlotTimeCard = ({firstSlot, secondSlot,thirdSlot,firstData,secondData,thirdData, forDate,slotData}: any) => {
  const [isselected, setIsSelected] = useState(null);
  const [slotName,setSlotName] = useState('');
  const [same, setSame] = useState(false);
  const dispatch = useAppDispatch();

  const slotMapping = slotData?.slotMapping || {};

  const onPress = (item: any, index: number, name: string) => {
    let todaysConvertedDate = moment().format('YYYY-MM-DD'); // Corrected format
    let currentTime = moment().format('HH:mm');
    let selectedFromTime = moment(item?.from, 'HH:mm').format('HH:mm');

    // Check if the selected slot is in the past
    if (selectedFromTime <= currentTime && forDate === todaysConvertedDate) {
      console.log('Trying to select past time slot');
      Toast.show('Can\'t select past time slot!', 2);
      return;
    }
  
    setIsSelected(index);
    setSlotName(name);
  
    if (index === isselected) {
      setSame(true);
      console.log('selectedSlots', null);
      dispatch(selectedSlots(null));
    } else {
      setSame(false);
      
      // Find the original slot using slotMapping
      const originalSlot = Object.keys(slotMapping).find(key => {
        const slot = JSON.parse(key);
        const modifiedSlot = slotMapping[key];
        return item.from === modifiedSlot.from && item.to === modifiedSlot.to;
      });
  
      if (originalSlot) {
        console.log('selectedSlots', JSON.parse(originalSlot));
        dispatch(selectedSlots(JSON.parse(originalSlot)));
      } else {
        console.log('No matching original slot found, dispatching the current slot');
        dispatch(selectedSlots(item));
      }
    }
  
    setSlotName(name);
  };
  

  return (
    <View>
      <Text style={styles.heading}>{firstSlot} Slots</Text>
      <FlatList
        data={firstData}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{marginBottom: '3%'}}
        contentContainerStyle={{margin: 6}}
        renderItem={({item, index}) => {
          // console.log("firstData  ",firstData)
          return (
            <TouchableOpacity
              onPress={() => {
                let name='morning';
                onPress(item, index,name);
              }}>
              <Card
                style={{
                  margin: 5,
                  justifyContent: 'space-between',
                  padding: 2,
                  height: responsiveHeight(3),
                  width: '95%',
                  borderRadius: 6,
                  flexDirection: 'row',
                  backgroundColor: slotName === 'morning' ? same  ? '#FFFFFF' : isselected === index ? colors.primary : '#FFFFFF' : '#FFFFFF',
                }}>
                <Text style={[styles.timeText,  slotName === 'morning' && isselected === index && styles.selectedText]}>
                {moment(item.from, 'HH:mm').format('hh:mm A')} - {moment(item.to, 'HH:mm').format('hh:mm A')}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.heading}>{secondSlot} Slots</Text>
      <FlatList
        data={secondData}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{marginBottom: '3%'}}
        contentContainerStyle={{margin: 6}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                let name='afternoon';
                onPress(item, index, name);
              }}>
              <Card
                style={{
                  margin: 5,
                  justifyContent: 'space-between',
                  padding: 2,
                  height: responsiveHeight(3),
                  width: '95%',
                  borderRadius: 6,
                  flexDirection: 'row',
                  backgroundColor:  slotName === 'afternoon' ? same
                    ? '#FFFFFF'
                    : isselected === index
                    ? colors.primary
                    : '#FFFFFF' : '#FFFFFF',
                }}>
                 <Text style={[styles.timeText,isselected === index && slotName === 'afternoon' && styles.selectedText]}>
                 {moment(item.from, 'HH:mm').format('hh:mm A')} - {moment(item.to, 'HH:mm').format('hh:mm A')}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.heading}>{thirdSlot} Slots</Text>
      <FlatList
        data={thirdData}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{marginBottom: '3%'}}
        contentContainerStyle={{margin: 6}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                let name='night';
                onPress(item, index,name);
              }}>
              <Card
                style={{
                  margin: 5,
                  justifyContent: 'space-between',
                  padding: 2,
                  height: responsiveHeight(3),
                  width: '95%',
                  borderRadius: 6,
                  flexDirection: 'row',
                  backgroundColor:  slotName === 'night' ? same
                    ? '#FFFFFF'
                    : isselected === index
                    ? colors.primary
                    : '#FFFFFF' : '#FFFFFF',
                }}>
                <Text style={[styles.timeText,isselected === index &&  slotName === 'night' && styles.selectedText]}>
                {moment(item.from, 'HH:mm').format('hh:mm A')} - {moment(item.to, 'HH:mm').format('hh:mm A')}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AppointmentSlotTimeCard;

const styles = StyleSheet.create({
  heading: {
    color: colors.black,
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2),
    marginVertical: '2%',
  },
  slotTimeCard: {},
  timeText: {
    fontFamily: fontType.Roboto_Regular,
    color: '#1A1A1A66',
    fontSize: 16,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});
