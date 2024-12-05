import {createAsyncThunk} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { HomeService } from '../service/HomeService';
import { Alert } from 'react-native';

export const deleteInsuranceAction =  createAsyncThunk<any, any, { state: RootState }>(
  HOME_REDUCER + '/deleteInsurance',
  async ({insuranceId}, thunkApi) => {
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const response = await HomeService.deleteInsurance(accessToken, insuranceId);
    // console.log('del action response =>',JSON.stringify(response))
    if (response.code === "OK") {
        Alert.alert('Success', 'Insurance deleted successfully');
      } else {
        Alert.alert('Error', response.message || 'Something went wrong');
      }
    return response;
  },
);
