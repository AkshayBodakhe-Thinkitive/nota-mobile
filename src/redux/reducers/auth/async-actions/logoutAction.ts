import {createAsyncThunk} from '@reduxjs/toolkit';
import {AUTH_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {resetHome} from '../../home/HomeReducer';
import {resetMedicalRecordReducer} from '../../medicalrecord/medicalRecordReducer';
import {resetProfile} from '../../profile/ProfileReducer';
import {logoutPopup, resetAuth} from '../AuthReducer';
import {AuthService} from '../services/AuthService';

export const logoutAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/logout',
  async ({accessToken, refreshToken}, thunkApi) => {
    try {
      const response = await AuthService.logOut(accessToken, refreshToken);
      // const response =  AuthService.logOut(accessToken, refreshToken);
      if (response?.code == 'OK') {
         thunkApi.dispatch(resetAuth());
        thunkApi.dispatch(resetHome());
        thunkApi.dispatch(resetMedicalRecordReducer());
        thunkApi.dispatch(resetProfile());
        thunkApi.dispatch(logoutPopup(false));
      }

      return response;
    } catch (error) {
      const err = JSON.stringify(error);

      if (err == '401') {
        const response = await AuthService.refreshtoken(
          thunkApi.dispatch,
          accessToken,
          refreshToken,
        );
  
        thunkApi.dispatch(
          logoutAction({
            accessToken: response?.data?.accessToken,
            refreshToken: response?.data?.refreshToken,
          }),
        );

      }
    }
  },
);
