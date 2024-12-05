import {SafeAreaView, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header/Header';
import BookingCard from '../components/BookingCard/BookingCard';
import {ImagePath} from '../../../Constants1/ImagePaths';
import {bookappmapping, bookedappdataArray} from '../constants/StringConstants';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import TextButton from '../../../components/TextButton/TextButton';
import CustomText from '../../../components/Text/CustomText';
import {
  AppNavConstants,
  BottomNavConstants,
} from '../../../Constants1/NavConstants';
import { BookingConfirmedStyles as styles} from '../styles/BookingConfirmedStyles';

const BookingConfirmedScreen = () => {
  const navigation = useNavigation<any>();

  const handleNavigateToAppointment = () => {
    navigation.navigate(BottomNavConstants.APPOINTMENT);
  };

  const handleNavigateToReschedule = () => {
    navigation.navigate(AppNavConstants.BOOK_APPOINTMENT);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: '12%'}}>
        <Header title="Booking is confirmed" containerStyle={{height: '90%'}} />
      </SafeAreaView>
      <View style={styles.pageContainer}>
        <BookingCard
          drName="Dr. Corina Earle"
          drTitle="General Physician"
          drImageSource={ImagePath.doctorcircle}
          starRatingValue={3.5}
          dataArray={bookedappdataArray}
          keyMapping={bookappmapping}
        />
        <CustomText style={styles.textStyle}>
          Booking Confirmation is pending From Dr. Corina Earle
        </CustomText>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={handleNavigateToAppointment}></Button>
        <TextButton
          style={styles.textBtn}
          text="Reschedule Your Appointment"
          onPress={handleNavigateToReschedule}
        />
      </View>
    </View>
  );
};

export default BookingConfirmedScreen;


