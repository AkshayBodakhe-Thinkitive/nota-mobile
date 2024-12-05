import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";
export const getConsentFormAction= createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'patient/default-consent-form', async ({accessToken}, thunkApi) => {
    const response =  await HomeService.getConsentForm(accessToken)
    return response
})