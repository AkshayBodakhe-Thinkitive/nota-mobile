
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOME_REDUCER, ZOOM_REDUCER } from "../../../constants/StoreConstants";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/storeConfig";
import { ZoomService } from "../service/ZoomService";


export const getPermissionToJoinVideoCall = createAsyncThunk<any, any, { state: RootState }>(ZOOM_REDUCER + 'appointment/zoom/requst', async ({appointmentUuid,accessToken}, thunkApi) => {
    console.log(" data from UI  ",appointmentUuid);
    
    const response =  await ZoomService.getPermissionToJoinCall(appointmentUuid,accessToken)
    console.log('response getPermissionToJoinVideoCall'+ JSON.stringify(response))
    // Alert.alert('Alert',"Meeting has not been started yet!",[{
    //     text: 'Ok',
    //     onPress: () => navigation.goBack(),
    //     style: 'cancel',
    //   },])
    return response
})
//