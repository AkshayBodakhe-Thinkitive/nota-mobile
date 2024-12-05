import {createAsyncThunk} from '@reduxjs/toolkit';
import {MEMBER_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {memberService} from '../service/memberService';
import {familyMemberDataById} from '../../profile/ProfileReducer';

export const getFamilyMemberByUuid = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(MEMBER_REDUCER + '/getMember', async (_, thunkApi) => {
  const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
  const uuidForMedicalRecords =
    thunkApi.getState().medicalrecord.uuidForMedicalRecords;

  //  console.log("memberPayload =>",memberPayload, memberId)
  const response = await memberService.getFamilyMemberByUuid(
    token,
    uuidForMedicalRecords,
  );
  thunkApi.dispatch(familyMemberDataById(response?.data));
  return response;
});
