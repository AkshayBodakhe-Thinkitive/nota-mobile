import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {AuthService} from '../services/AuthService';

export const verifyOTPAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/forgot-password-otp/verify/',
  async ({otp, email}, thunkApi) => {
    const response = AuthService.verifyOPT(otp, email);
    return response;
  },
);
//forgot-password-otp/verify/kalyani.mhase@thinkitive.com?otp=135532
//forgot-password-otp/verify/kalyani.mhase@thinkitive.com?otp=802188
