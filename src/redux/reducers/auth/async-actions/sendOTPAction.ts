import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { AuthService } from '../services/AuthService';

export const sendOTPAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/forgot-password',
  async ({email}, thunkApi) => {

    const response = await AuthService.sendOPT(email);

    return response;
  },
);
