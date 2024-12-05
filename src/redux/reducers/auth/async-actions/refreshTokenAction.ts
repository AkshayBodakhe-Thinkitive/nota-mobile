import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { AuthService } from '../services/AuthService';

export const refreshTokenAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  AUTH_REDUCER + '/refresh-token',
  async ({dispatch,accessToken, refreshToken}, thunkApi) => {
    const response = await AuthService.refreshtoken(dispatch,accessToken, refreshToken);

    return response;
  },
);
