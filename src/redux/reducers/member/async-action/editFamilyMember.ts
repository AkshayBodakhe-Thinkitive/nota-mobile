import {createAsyncThunk} from '@reduxjs/toolkit';
import {MEMBER_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {memberService} from '../service/memberService';
import {getFamilyMemberByUuid} from './getFamilyMemberByUuid';

export const editFamilyMemberAction = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(MEMBER_REDUCER + '/editMember', async (_, thunkApi) => {
  const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
  let editDemoData = thunkApi.getState().profile.familyMemberData;
  editDemoData = {
    ...editDemoData,
    roleType: 'PATIENT',
    firstName: editDemoData?.legalFirstName,
    lastName: editDemoData?.legalLastName,
  };
  //  console.log("memberPayload =>",memberPayload, memberId)
  const response = await memberService.editFamilyMember(token, editDemoData);
//   thunkApi.dispatch(getFamilyMemberByUuid());
  return response;
});
