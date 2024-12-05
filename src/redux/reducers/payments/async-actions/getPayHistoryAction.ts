import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { PAYMENT_REDUCER } from "../../../constants/StoreConstants";
import { PaymentService } from "../services/PayementsService";

export const getPaymentHistoryAction = createAsyncThunk<any,any,{state:RootState}>(PAYMENT_REDUCER+'/payment-history',async(page,thunkApi)=>{
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const patientUuid = thunkApi.getState().profile?.profileData?.data?.uuid
    const response = await PaymentService.getPaymentHistory(accessToken,patientUuid,page)
    return response
})