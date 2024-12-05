import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEMBER_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { memberService } from "../service/memberService";

export const addMemberAction = createAsyncThunk<any, any, {state: RootState}>(
    MEMBER_REDUCER + '/addMember',
    async (memberId ,thunkApi) => {
        console.log('Inside UUID:',memberId)
        const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
        const memberPayload = thunkApi.getState().member.memberPayload;

        
        const response = await memberService.addMember(
            token, 
            memberPayload.email, 
            memberPayload.firstName, 
            memberPayload.lastName, 
            memberPayload.phone, 
            memberPayload.roleType, 
            memberPayload.gender, 
            memberPayload.convertedDate, 
            memberPayload.familyMemberRelation, 
            memberId
        )
        return response;
    },
);