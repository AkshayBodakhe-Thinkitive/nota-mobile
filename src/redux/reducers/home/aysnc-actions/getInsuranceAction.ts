import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";


export const getInsuranceAction = createAsyncThunk<any, void, { state: RootState }>(
    HOME_REDUCER + '/getInsurance',
  async (_, thunkApi) => {
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const patientUuid = thunkApi.getState().profile?.profileData?.data?.uuid
    const response = HomeService.getInsurance(accessToken,patientUuid)
    return response;
  }
);
