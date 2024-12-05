import { createAsyncThunk } from '@reduxjs/toolkit';
import { MEMBER_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { memberService } from '../service/memberService';
//https://dev.api.navalaglobal.com/api/master/allergy/patient/3ca52279-64e4-46d7-8878-66c96158dc5c/allergy?page=0&size=10
export const getMemberAction = createAsyncThunk<any, any, {state: RootState}>(
  MEMBER_REDUCER + '/family-member',
  async ({page: page, searchString: searchString}, thunkApi) => {
    const memberId = thunkApi.getState().profile.profileData?.data?.uuid;
    const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
    const response = await memberService.getMembers(token, memberId, page, searchString)
    // console.log('response getMemberAction' + JSON.stringify(response));
    return response;
  },
);
