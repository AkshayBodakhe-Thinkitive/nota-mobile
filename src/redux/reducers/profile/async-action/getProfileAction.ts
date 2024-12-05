import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { ProfileService } from '../service/ProfileService';
import { AuthService } from '../../auth/services/AuthService';
import { refreshToken } from '../../auth/AuthReducer';
import { getConsultedProvidersAction } from '../../home/aysnc-actions/getConsultedProvidersAction';

export const getProfileAction = createAsyncThunk<any, any, {state: RootState}>(
  PROFILE_REDUCER + '/user/profile/details',
  async ({accessToken}, thunkApi) => {
    const refreshToken = thunkApi.getState().auth?.loginData?.data?.refreshToken;
    try {
        const response:any = await ProfileService.getProfile(accessToken);
        const data = {
          accessToken: accessToken,
          patientId: response?.data?.uuid,
          page: 0,
        };
        await thunkApi.dispatch(getConsultedProvidersAction(data))
        return response;
    } catch (error: any) {
        const statusCode = JSON.stringify(error);
        console.log('Error action ' + statusCode);
        let _ = await checkForUnauthorizedStatusCode({thunkApi, accessToken, refreshToken, statusCode})
        const getProfileResponse = ProfileService.getProfile(accessToken);
        return getProfileResponse;
    }
  },
);

const checkForUnauthorizedStatusCode = async ({thunkApi, accessToken, refreshToken, statusCode}: any) => {
    if (statusCode == "401") {
      console.log('Calling refresh API in getProfileAction')
      const isRefreshSuccess = await AuthService.refreshtoken(thunkApi.dispatch, accessToken, refreshToken);
      return isRefreshSuccess;
    } else {
        console.log('checkForUnauthorizedStatusCode - Status Code:', statusCode)
        return false;
    }
}