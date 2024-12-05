import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {AuthService} from '../services/AuthService';

export const signInAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/login',
  async ({username, password}, thunkApi) => {
    try {
      const response = await AuthService.login(username, password);
      return response;
    } catch (e) {
      return e;
    }
  },
);
