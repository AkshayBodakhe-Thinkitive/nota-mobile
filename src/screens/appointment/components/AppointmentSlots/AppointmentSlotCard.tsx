import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
// import { FontType } from '../../../../constants/FontType';
import { fontType } from '../../../../assets/fontType';

const AppointmentSlotCard = () => {
  // Sample data for days and dates
  const data = [
    { day: 'Mon', date: '28' },
    { day: 'Tue', date: '1' },
    { day: 'Wed', date: '2' },
    { day: 'Thu', date: '3' },
    { day: 'Fri', date: '4' },
    { day: 'Sat', date: '5' },
    { day: 'Sun', date: '6' },
  ];

  // Render item for FlatList
  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.dayText}>{item.day}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    // borderWidth:1
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginRight: responsiveWidth(1.8),
    width: responsiveWidth(12),
    padding: 8,
    borderRadius: 10,
    marginVertical : 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity : 0.2,
    shadowOffset : {
        height : 0,
        width : 0
    },
    
  },
  dayText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily : fontType.Roboto_Regular,
    color : "#1A1A1A66"
  },
  dateText: {
    fontSize: responsiveFontSize(1.6),
    color : "#1A1A1A66",
    fontFamily : fontType.Roboto_Regular,
  },
});

export default AppointmentSlotCard;
