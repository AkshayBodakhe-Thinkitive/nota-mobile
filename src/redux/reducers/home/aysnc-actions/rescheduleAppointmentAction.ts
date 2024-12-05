import {createAsyncThunk} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {HomeService} from '../service/HomeService';

export const rescheduleAppointmentProviderAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + '/rescheduleAppointmentAction',
  async ({accessToken, payload, appointmentId}, thunkApi) => {
    const response = await HomeService.rescheduleAppointmentProvider(
      accessToken,
      payload,
      appointmentId,
    );
    return response;
  },
);
