import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";
export const postIntakeFormAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'patient/accept/intake-form', async ({accessToken, formData}, thunkApi) => {
    const response =  await HomeService.postIntakeForm(accessToken, formData)
    return response
})