import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { AuthService } from '../services/AuthService';

export const resetPasswordAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  AUTH_REDUCER + '/reset-password',
  async ({email, newPassword}, thunkApi) => {
    const response = await AuthService.resetPassword(email, newPassword);
    return response;
  },
);
