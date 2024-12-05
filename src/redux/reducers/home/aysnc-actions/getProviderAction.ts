import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { HomeService } from "../service/HomeService";

export const getProviderAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + '/provider/all/', async ({accessToken,searchBy,sourceId,providerUUID}, thunkApi) => {
    const response =  await HomeService.getProvider(accessToken,searchBy,sourceId,providerUUID)
    // console.log('response getProviderAction'+ JSON.stringify(response))
    return response
})