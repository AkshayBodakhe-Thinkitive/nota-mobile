import {createAsyncThunk} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {HomeService} from '../service/HomeService';

export const rescheduleAppointmentClinicAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + '/rescheduleAppointmentClinicAction',
  async ({accessToken, payload, appointmentId}, thunkApi) => {
    const response = await HomeService.rescheduleAppointmentClinic(
      accessToken,
      payload,
      appointmentId,
    );
    return response;
  },
);
