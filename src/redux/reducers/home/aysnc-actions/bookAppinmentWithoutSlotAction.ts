import {createAsyncThunk} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {HomeService} from '../service/HomeService';
export const bookAppinmentWithoutSlotAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + '/appointment/patient-book',
  async (
    {
      accessToken,
      patientId,
      providerGroupId,
      appointmentDate,
      appointmentType,
      appointmentMode,
      startTime,
      endTime,
      visitReason,
      speciality
    },
    thunkApi,
  ) => {
    const response = await HomeService.bookAppointmentWithoutSlot(
      accessToken,
      patientId,
      providerGroupId,
      appointmentDate,
      appointmentType,
      appointmentMode,
      startTime,
      endTime,
      visitReason,
      speciality
    );
    return response;
  },
);
