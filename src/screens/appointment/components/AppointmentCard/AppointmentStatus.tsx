import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../../../../components/Text/CustomText';

interface Props {
  children: ReactNode;
}

const AppointmentStatus = ({children}: Props) => {
  let bg = '';
  let txtStyle = '';
  let text = '';

  switch (children) {
    case 'COMPLETED':
      bg = '#0BAD0033';
      txtStyle = '#0BAD00';
      text = 'Completed';
      break;
    case 'CHECKED_IN':
      bg = '#003A7033';
      txtStyle = '#003A70';
      text = 'Checked In';
      break;

      case 'SCHEDULED':
        bg = '#0BAD0033';
        txtStyle = '#0BAD00';
        text = 'Scheduled';
        break;
    case 'NOT_CONFIRMED':
      bg = '#FF230033';
      txtStyle = '#FF2300';
      text = 'Not Confirmed';
      break;

      case 'CANCELLED':
        bg = '#003A7033';
        txtStyle = '#003A70';
        text = 'Cancelled';
        break;

        case 'NO_SHOW':
        bg = '#FF230033';
        txtStyle = '#FF2300';
        text = 'No Show';
        break;

        case 'RE_SCHEDULED':
          bg = '#003A7033';
          txtStyle = '#003A70';
          text = 'Rescheduled';
          break;

          case 'REQUESTED':
            bg = '#003A7033';
            txtStyle = '#003A70';
            text = 'Requested';
            break;

    

    case 'REQUESTED':
      bg = '#FF760033';
      txtStyle = '#FF7600';
      text = 'Requested';
      break;

   
  }
  // const tolower = children
  return (
    <View style={{backgroundColor: bg, padding: 4, borderRadius: 5}}>
      <CustomText fontSize={12} color={txtStyle}>
        {text}
      </CustomText>
    </View>
  );
};

export default AppointmentStatus;

const styles = StyleSheet.create({});
