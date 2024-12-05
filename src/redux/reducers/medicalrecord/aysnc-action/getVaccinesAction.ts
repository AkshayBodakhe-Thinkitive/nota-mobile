import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEDICAL_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { medicalRecordService } from "../service/medicalRecordService";
//https://dev.api.navalaglobal.com/api/master/allergy/patient/3ca52279-64e4-46d7-8878-66c96158dc5c/allergy?page=0&size=10
export const getVaccineAction = createAsyncThunk<any, any, { state: RootState }>(MEDICAL_REDUCER + '/vaccine/patient', async ({accessToken, patientUUID,page,size}, thunkApi) => {
    const response =  await medicalRecordService.getVaccines(accessToken,patientUUID,page,size)
    console.log('response getVaccineAction'+ JSON.stringify(response))
    return response
})