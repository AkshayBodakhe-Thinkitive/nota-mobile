import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";

export const getAllergiesAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/allergy/patient', async ({accessToken, patientUUID,page,size}, thunkApi) => {
    const response =  await medicalRecordService.getAllergies(accessToken,patientUUID,page,size)
    return response
})