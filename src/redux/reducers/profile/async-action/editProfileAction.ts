import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { ProfileService } from '../service/ProfileService';

export const editProfileAction = createAsyncThunk<any, any, {state: RootState}>(
  PROFILE_REDUCER + '/patient',
  async ({accessToken,data}, thunkApi) => {
    const response = ProfileService.editProfile(accessToken,data);
    return response;
  },
);
