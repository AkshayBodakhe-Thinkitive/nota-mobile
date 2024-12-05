import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER, ZOOM_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { ZoomService } from "../service/ZoomService";


export const submitRatingAction = createAsyncThunk<any, any, { state: RootState }>(ZOOM_REDUCER + 'appointment/rating', async ({accessToken,providerUuid,rating,uuid,review}, thunkApi) => {
  
     console.log('**** getZoomTokenAction ****')
    const response =  await ZoomService.postRatingAction(accessToken,providerUuid,rating,uuid,review)
    console.log('response submitRatingAction'+ JSON.stringify(response))
    return response
})