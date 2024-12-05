import {createAsyncThunk} from '@reduxjs/toolkit';
import {PROFILE_REDUCER} from '../../../constants/StoreConstants';
import {RootState} from '../../../store/storeConfig';
import {ProfileService} from '../service/ProfileService';

export const editDemographicsAction = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(PROFILE_REDUCER + '/editdemo', async (_, thunkApi) => {
  const token = thunkApi.getState().auth?.loginData?.data?.accessToken;
  let editDemoData = thunkApi.getState().profile?.demographicsData;
  const uuidForMedicalRecords =
    thunkApi.getState().medicalrecord.uuidForMedicalRecords;

  if (uuidForMedicalRecords) {
    editDemoData = thunkApi.getState().profile.familyMemberData;
    editDemoData = {
      ...editDemoData,
      roleType: 'PATIENT',
      firstName: editDemoData?.legalFirstName,
      lastName: editDemoData?.legalLastName,
      location: {
        uuid: null,
      },
      Provider: {
        uuid: null,
      },
    };
  }

  const response = ProfileService.editDemographics(token, editDemoData);
  return response;
});
