import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { HomeService } from "../service/HomeService";

export const getLocationAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + '/location?page=0&size=20&searchString=&status=', async ({accessToken,page,size,searchString,status, providerUUID}, thunkApi) => {

    const response =  await HomeService.getLocation(accessToken,page,size,searchString,status, providerUUID)
   return response
})