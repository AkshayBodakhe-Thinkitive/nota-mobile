// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { HOME_REDUCER } from '../../../constants/StoreConstants';
// import { RootState } from '../../../store/storeConfig';
// import { HomeService } from '../service/HomeService';
// import { Alert } from 'react-native';
// import Toast from 'react-native-simple-toast';

// export const getSlotWithLocationAction = createAsyncThunk<any, any, {state: RootState}>(
//   HOME_REDUCER + '/appointment/fetch/slots/location',
//   async (
//     {accessToken,providerUUID, visitType, appointmentType, appointmentDate,locationUUID },
//     thunkApi,
//   ) => {
//     console.log('**** getSlotWithLocationAction ****');
//     const response : any = await HomeService.getslotsWithLocation(
//       accessToken,
//       providerUUID,
//       visitType,
//       appointmentType,
//       appointmentDate,
//       locationUUID
//     );
//     console.log('response getSlotWithLocationAction' + JSON.stringify(response));
//     if(response?.code === 'OK' && response?.data?.timeIntervalSet?.length === 0){
//       Toast.show('The Provider is not available for the selected date!', 2);
//     }
//     return response;
//   },
// );


import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOME_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { HomeService } from '../service/HomeService';
import { Alert } from 'react-native';
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

export const getSlotWithLocationAction = createAsyncThunk<any, any, { state: RootState }>(
  HOME_REDUCER + '/appointment/fetch/slots/location',
  async (
    { accessToken, providerUUID, visitType, appointmentType, appointmentDate, locationUUID },
    thunkApi,
  ) => {
    try {
      const response: any = await HomeService.getslotsWithLocation(
        accessToken,
        providerUUID,
        visitType,
        appointmentType,
        appointmentDate,
        locationUUID
      );
      // console.log('response getSlotWithLocationAction:', JSON.stringify(response));
      if (response?.code === 'OK' && response?.data?.timeIntervalSet?.length === 0) {
        Toast.show('The Provider is not available for the selected date!', 2);
        return response; // Early return if no slots are available
      }

      // Convert the time slots to the correct time zone
      const bookingTimeZone = response?.data?.bookingWindowTimeZone;
      const timeZone = timeZoneMapping[bookingTimeZone] || 'UTC'; // Fallback to UTC if time zone is not found

      if (!bookingTimeZone) {
        console.warn(`Time zone "${bookingTimeZone}" not found, defaulting to UTC.`);
      }

      // Create a mapping of original slots to modified slots
      const slotMapping: { [key: string]: any } = {};

      const updatedTimeIntervalSet = response?.data?.timeIntervalSet?.map((slot: any) => {
        const modifiedSlot = {
          from: moment.tz(slot.from, 'HH:mm:ss', timeZone).local().format('HH:mm'),
          to: moment.tz(slot.to, 'HH:mm:ss', timeZone).local().format('HH:mm'),
        };

        // Store original slot -> modified slot
        slotMapping[JSON.stringify(slot)] = modifiedSlot;

        return modifiedSlot;
      });

      // Return the response with converted time slots and the mapping
      const modifiedResponse = {
        ...response,
        data: {
          ...response?.data,
          timeIntervalSet: updatedTimeIntervalSet,
        },
        slotMapping, // Include the slot mapping in the response
      };

      console.log('Modified response in getSlotWithLocationAction:', modifiedResponse);

      return modifiedResponse;
    } catch (err) {
      console.error('Error in getSlotWithLocationAction:', err);
      return thunkApi.rejectWithValue(err); // Proper error handling
    }
  },
);
