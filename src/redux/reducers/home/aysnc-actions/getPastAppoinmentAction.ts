import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { HomeService } from "../service/HomeService";

export const getPastAppointmentAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'appointment/patient/past', async ({accessToken,patientUUID,appointmentState}, thunkApi) => {
    const response =  await HomeService.getUpcomingAppointment(accessToken,patientUUID,appointmentState)
 return response
})