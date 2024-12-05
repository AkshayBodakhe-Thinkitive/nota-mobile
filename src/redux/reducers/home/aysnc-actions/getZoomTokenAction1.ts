// // fetchAppointmentToken


// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { HOME_REDUCER } from "../../../constants/StoreConstants";
// import { RootState } from "../../../store/storeConfig";
// import { HomeService } from "../service/HomeService";
// //https://dev.api.navalaglobal.com/api/master/location?page=0&size=20&searchString=&status=

// export const getZoomTokenAction = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'appointment/zoom', async ({appointmentUuid,accessToken}, thunkApi) => {
//      console.log(appointmentUuid,accessToken)
//      console.log('**** getZoomTokenAction ****')
//     const response =  await HomeService.fetchAppointmentToken(appointmentUuid,accessToken)
//     console.log('response getZoomTokenAction'+ JSON.stringify(response))
//     return response
// })