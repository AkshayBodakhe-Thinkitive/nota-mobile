import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../store/storeConfig';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import {HomeService} from '../service/HomeService';
export const getIntakeFormAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + 'home/intake-form',
  async ({accessToken, appointmentUuid}, thunkApi) => {
    const response = await HomeService.getIntakeForm(
      accessToken,
      appointmentUuid,
    );
    return response;
  },
);
