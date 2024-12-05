// //https://dev.api.navalaglobal.com/api/master/event/subscribe/fb4862dd-e515-4181-88b8-aa6600912ceb_REQUEST

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { HOME_REDUCER } from "../../../constants/StoreConstants";
// import { useAppSelector } from "../../../store/hooks";
// import { RootState } from "../../../store/storeConfig";
// import { HomeService } from "../service/HomeService";
// //https://dev.api.navalaglobal.com/api/master/location?page=0&size=20&searchString=&status=

// export const getPermissionToJoinVideoCall1 = createAsyncThunk<any, any, { state: RootState }>(HOME_REDUCER + 'appointment/zoom/requst', async ({appointmentUuid,accessToken}, thunkApi) => {
//      console.log(appointmentUuid,accessToken)
//      console.log('**** getPermissionToJoinVideoCall ****')
//     //  const loginData = useAppSelector((state: RootState) => state.auth.loginData)
//     const response =  await HomeService.getPermissionToJoinCall(appointmentUuid,accessToken)
//     console.log('response getPermissionToJoinVideoCall'+ JSON.stringify(response))
//     return response
// })
// //