import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { ProfileService } from '../service/ProfileService';

export const getLanguagesAction = createAsyncThunk<any, any, {state: RootState}>(
  PROFILE_REDUCER + '/get/languages',
  async ( _, thunkApi) => {
    console.log('Inside action => get languages')
    const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
    const response = ProfileService.getLanguages(token)
    return response;
  },
);