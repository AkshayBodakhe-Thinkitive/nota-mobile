import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";

export const getVisitHistoryAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/encounter/visit-history/', async ({accessToken, patientUUID}, thunkApi) => {
    const response =  await medicalRecordService.getVisitHistory(accessToken,patientUUID)
    return response
})