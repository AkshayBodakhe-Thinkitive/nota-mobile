//https://dev.api.navalaglobal.com/api/master/appointment/patient/90cb7ceb-2a01-4eee-806d-0cee1b176397?appointmentState=FUTURE
import {createAsyncThunk} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {HomeService} from '../service/HomeService';
export const getUpcomingAppointmentAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + 'appointment/patient/',
  async ({accessToken, patientUUID, appointmentState}, thunkApi) => {
    const response = await HomeService.getUpcomingAppointment(
      accessToken,
      patientUUID,
      appointmentState,
    );
    return response;
  },
);
