import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";
export const getVisitHistoryDetailsAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/encounter/getVisitHistoryDetailsAction/', async ({accessToken, encounterUuid}, thunkApi) => {
    const response =  await medicalRecordService.getVisitHistoryDetails(accessToken,encounterUuid)
    // console.log('response getVisitHistoryDetailsAction'+ JSON.stringify(response))
    return response
})