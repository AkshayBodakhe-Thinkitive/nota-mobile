import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {AuthService} from '../services/AuthService';

export const signUpAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/auth/patient',
  async (
    {email, firstName, lastName, phone, patientPortal, roleType, password},
    thunkApi,
  ) => {
    const response = AuthService.signUp(
      email,
      firstName,
      lastName,
      phone,
      password,
      patientPortal,
      roleType,
    );
    return response;
  },
);
