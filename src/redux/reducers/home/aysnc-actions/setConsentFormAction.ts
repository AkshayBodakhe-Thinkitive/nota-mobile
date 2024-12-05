
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";
export const setConsentFormAction= createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'patient/accept-terms-conditions', async ({accessToken}, thunkApi) => {
     console.log('**** setConsentFormAction ****')
     console.log('token:', accessToken);
     
    const response =  await HomeService.setConsentForm(accessToken)
    return response
})