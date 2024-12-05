import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { AuthService } from "../../auth/services/AuthService";
import { medicalRecordService } from "../service/medicalRecordService";

export const getVitalAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/vital/patient', async ({accessToken, patientUUID,refreshToken}, thunkApi) => {
    try {
   const response =  await medicalRecordService.getVitals(accessToken,patientUUID)
  //  console.log('response getVitalAction'+ JSON.stringify(response))
   return response
    } catch (error) {
        const err = JSON.stringify(error);
        console.log(' error action * ' + err);
  
        if (err == '401') {
          const response = await AuthService.refreshtoken(
            accessToken,
            refreshToken,
          );
          console.log(' respponse ** ' + JSON.stringify(response));
  
    
        }
      }
})