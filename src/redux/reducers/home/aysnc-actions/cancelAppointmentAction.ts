import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { HomeService } from "../service/HomeService";

export const cancelAppointmentAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + '/appointment/cancel', async ({accessToken,appointmentId,reasonForCancellation}, thunkApi) => {
  const response =  await HomeService.cancelAppointment(accessToken,appointmentId,reasonForCancellation,)

    return response
})