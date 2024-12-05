import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";

export const addInsuranceAction = createAsyncThunk<any, any, { state: RootState }>(
  HOME_REDUCER + '/addInsurance',
  async (payload, thunkApi) => {
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const response = await HomeService.addInsurance(accessToken, payload);
    return response;
  }
);
