import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";

export const updateInsuranceAction = createAsyncThunk<any, {insuranceUuid: string, payload: any }, { state: RootState }>(
  HOME_REDUCER + '/updateInsurance',
  async ({ insuranceUuid, payload }, thunkApi) => {
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const patientUuid = thunkApi.getState().profile?.profileData?.data?.uuid
    const response = await HomeService.updateInsurance(accessToken, patientUuid, insuranceUuid, payload);
    return response;
  }
);
