// {
//     "visitType": "VIRTUAL",
//     "appointmentType": "FOLLOW_UP",
//     "appointmentDate": "2024-04-05",
//     "providerUUID": "2094f2a0-8dc4-4264-ab59-f3f0a46da8ef",
//     "startTime": "13:25:00",
//     "endTime": "13:45:00",
//     "visitReason": "Viral flue ahe baba",
//     "bookByPatient": true,
//     "providerGroupId": "3229b439-0454-40ab-a912-d2abca409141"
// }
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOME_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { HomeService } from '../service/HomeService';
//https://dev.api.navalaglobal.com/api/master/appointment/book
export const bookAppointmentAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + '/appointment/book',
  async (
    {
      accessToken,
      providerUUID,
      visitType,
      appointmentType,
      appointmentDate,
      startTime,
      endTime,
      visitReason,
      bookByPatient,
      providerGroupId,
      patientUserUuid,
      locationUUID
    },
    thunkApi,
  ) => {
 
    const response = await HomeService.bookAppointment(
      accessToken,
      providerUUID,
      visitType,
      appointmentType,
      appointmentDate,
      startTime,
      endTime,
      visitReason,
      bookByPatient,
      providerGroupId,
      patientUserUuid,
      locationUUID
    );
  return response;
  },
);
