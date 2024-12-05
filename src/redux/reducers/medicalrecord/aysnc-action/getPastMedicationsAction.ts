import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";

export const getPastMedicationsAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/medications/patient/past', async ({patientUUID, pageNumber}, thunkApi) => {
    const accessToken = thunkApi.getState().auth?.loginData?.data?.accessToken;
    const response =  await medicalRecordService.getPastMedications(accessToken, patientUUID, pageNumber)
    return response
})