import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOME_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { HomeService } from '../service/HomeService';
import moment from 'moment-timezone';
import Toast from 'react-native-simple-toast';

const timeZoneMapping: { [key: string]: string } = {
  IST: 'Asia/Kolkata',
  EST: 'America/New_York',
  CT: 'America/Chicago',
  MT: 'America/Denver',
  PT: 'America/Los_Angeles',
  AKT: 'America/Anchorage',
  HST: 'Pacific/Honolulu',
  HAST: 'Pacific/Honolulu',
  MST: 'America/Phoenix',
};

export const getSlotsAction = createAsyncThunk<any, any, { state: RootState }>(
  HOME_REDUCER + '/appointment/fetch/slots',
  async (
    { accessToken, providerUUID, visitType, appointmentType, appointmentDate },
    thunkApi,
  ) => {
    try {
      const response: any = await HomeService.getslots(
        accessToken,
        providerUUID,
        visitType,
        appointmentType,
        appointmentDate,
      );
      if (
        response?.code === 'OK' &&
        response?.data?.timeIntervalSet?.length === 0
      ) {
        Toast.show('The Provider is not available for the selected date!', 2);
      }

      // Convert the time slots to the correct time zone
      const bookingTimeZone = response?.data?.bookingWindowTimeZone;
      const timeZone = timeZoneMapping[bookingTimeZone] || 'UTC'; // Fallback to UTC if not found

      // Create a mapping of original slots to modified slots
      const slotMapping = {};

      const updatedTimeIntervalSet = response?.data?.timeIntervalSet?.map((slot: any) => {
        const modifiedSlot = {
          from: moment.tz(slot.from, 'HH:mm:ss', timeZone).local().format('HH:mm'),
          to: moment.tz(slot.to, 'HH:mm:ss', timeZone).local().format('HH:mm'),
        };
        
        slotMapping[JSON.stringify(slot)] = modifiedSlot;

        return modifiedSlot;
      });

      // Return the response with converted time slots and the mapping
      const modifiedResponse = {
        ...response,
        data: {
          ...response.data,
          timeIntervalSet: updatedTimeIntervalSet,
        },
        slotMapping, // Include the slot mapping in the response
      };

      console.log('modifiedResponse getSlotsAction: ' + JSON.stringify(modifiedResponse));

      return modifiedResponse;
    } catch (err) {
      console.log('Error in getSlotsAction: ' + JSON.stringify(err));
    }
  },
);
