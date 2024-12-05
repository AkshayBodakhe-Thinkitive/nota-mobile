
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { HomeService } from "../service/HomeService";
export const getConsultedProvidersAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'home/recentlyConsulted', async ({accessToken: accessToken, patientId: patientId, page: page}, thunkApi) => {
    const response =  await HomeService.getConsultedProvider(accessToken, patientId, page)
    return response
})