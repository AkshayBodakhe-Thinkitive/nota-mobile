import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";

export const getProblemsAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/problems/patient', async ({accessToken, patientUUID,page,size}, thunkApi) => {
    const response =  await medicalRecordService.getProblems(accessToken,patientUUID,page,size)
    // console.log('response getProblemsAction'+ JSON.stringify(response))
    return response
})