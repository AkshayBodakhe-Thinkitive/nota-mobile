import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER, ZOOM_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { ZoomService } from "../service/ZoomService";
export const getTopRatedProviderAction = createAsyncThunk<any, any, { state: RootState }>(ZOOM_REDUCER + 'zoom/topRated', async ({accessToken: accessToken, page: page}, thunkApi) => {
    //  const loginData = useAppSelector((state: RootState) => state.auth.loginData)
    const response =  await ZoomService.getTopRatedProvider(accessToken, page)
    return response
})