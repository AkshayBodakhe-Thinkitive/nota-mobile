import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEMBER_REDUCER } from "../../../constants/StoreConstants";
import { RootState } from "../../../store/storeConfig";
import { memberService } from "../service/memberService";

export const editMemberAction = createAsyncThunk<any, any, {state: RootState}>(
    MEMBER_REDUCER + '/editFamilyMember',
    async (memberId ,thunkApi) => {
        const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
        const memberPayload = thunkApi.getState().member.memberPayload;
        //  console.log("memberPayload =>",memberPayload, memberId)
        const response = await memberService.editMember(
            token, 
            memberPayload.uuid,
            memberPayload.email, 
            memberPayload.firstName, 
            memberPayload.lastName, 
            memberPayload.phone, 
            memberPayload.roleType, 
            memberPayload.gender, 
            memberPayload.convertedDate, 
            memberPayload.familyMemberRelation, 
            memberId,
            memberPayload.emergContactRelation,
            memberPayload.emergContactNumber,
            memberPayload.emergContactEmail
        )
        return response;
    },
)