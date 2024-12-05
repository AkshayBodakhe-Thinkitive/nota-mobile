import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/storeConfig";
import { PAYMENT_REDUCER } from "../../../constants/StoreConstants";
import { PaymentService } from "../services/PayementsService";

export const getCardsAction = createAsyncThunk<any,void,{state:RootState}>(PAYMENT_REDUCER+'/cards',async(_,thunkApi)=>{
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const patientUuid = thunkApi.getState().profile?.profileData?.data?.uuid
    const response = await PaymentService.getCards(accessToken,patientUuid)
    return response
})