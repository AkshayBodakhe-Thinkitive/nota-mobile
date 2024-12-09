import {createSlice} from '@reduxjs/toolkit';
import {ResponseCode} from '../../../Interface/responseCode';
import {PROFILE_REDUCER} from '../../constants/StoreConstants';
import {editDemographicsAction} from './async-action/editDemographicsAction';
import {editProfileAction} from './async-action/editProfileAction';
import {getLanguagesAction} from './async-action/getLanguagesAction';
import {getProfileAction} from './async-action/getProfileAction';
import {getStore} from '../../store/storeConfig';

export const initialState: any = {
  loading: false,
  profileData: null,
  isShowMessage: false,
  message: '',
  languages: [],
  demographicsData: {
    uuid: '',
    provider: {
      uuid: null,
    },
    location: {
      uuid: null,
    },
    registrationDate: '',
    legalLastName: '',
    legalFirstName: '',
    firstNameUsed: '',
    middleName: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    ssn: '',
    languages: '',
    ethnicity: '',
    race: '',
    motherName: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      street: '',
      country: '',
      zipcode: '',
    },
    contactNumber: '',
    email: '',
    fax: '',
    emergContactLastName: '',
    emergContactFirstName: '',
    emergContactRelation: '',
    emergContactNumber: '',
    homeNumber: '',
    emergContactEmail: '',
    emailConsent: false,
    callConsent: false,
    messageConsent: false,
    formConsent: true,
    note: '',
    preferredPharmacy: null,
    preferredLab: null,
    preferredRadiology: null,
    avatar: null,
    newAvatar: null,
    familyMemberData: null,
    familyMemberUuid: null,
  },
};
const processGetLanguageResponse = (state: any, action: any) => {
  let payload = action.payload;
  console.log('payload code', payload.code);
  switch (payload.code) {
    case ResponseCode.ok:
      state.languages = [];
      let languageData = payload?.data?.content;
      let languagesArray: {label: any; value: any}[] = [];
      console.log('language data', languageData);
      languageData.forEach((data: any) => {
        languagesArray.push({
          label: data.name,
          value: data.name.toUpperCase(),
        });
      });

      state.isShowMessage = false;
      state.languages = languagesArray;
      break;
    case ResponseCode.unauthorized:
      state.message = 'Unauthorized!';
      state.isShowMessage = true;
      break;
    case ResponseCode.badRequest:
      state.message =
        payload?.message == null || payload?.message == ''
          ? 'Something went wrong'
          : payload?.message;
      state.isShowMessage = true;
      break;
    default:
      state.message = 'Unable to get languages';
      state.isShowMessage = true;
      break;
  }
};
const processEditProfileResponse = (state: any, action: any) => {
  let payload = action.payload;
  console.log('payload code', payload.code);
  switch (payload.code) {
    case ResponseCode.updated || ResponseCode.ok:
      state.message = 'Profile edited successfully';
      break;
    case ResponseCode.unauthorized:
      state.message = 'Unauthorized!';
      break;
    case ResponseCode.badRequest:
      state.message =
        payload?.message == null || payload?.message == ''
          ? 'Something went wrong'
          : payload?.message;
      break;
    default:
      state.message = 'Unable to edit profile';
      break;
  }
  state.isShowMessage = true;
};
const ProfileReducer = createSlice({
  name: PROFILE_REDUCER,
  initialState,
  reducers: {
    resetProfile() {
      return initialState;
    },
    fillDataForDemographicsEdit: (state, action) => {
      state.demographicsData = action.payload;
    },
    updateFieldValue: (state, action) => {
      const {key, value} = action.payload;

      // console.log('profile reducer ----> ', state?.familyMemberData[key]);

      if (state.familyMemberUuid) {
        // if (state.familyMemberData.address.hasOwnProperty(key)) {
        //   state.familyMemberData.address[key] = value;
        // } else {
        //   state.familyMemberData[key] = value;
        // }
        state.familyMemberData[key] = value;
      } else {
        if (state.demographicsData.address.hasOwnProperty(key)) {
          state.demographicsData.address[key] = value;
        } else {
          state.demographicsData[key] = value;
        }
      }
    },
    hideProfileMessage: state => {
      state.isShowMessage = false;
      state.message = '';
    },
    familyMemberDataById: (state, action) => {
      state.familyMemberData = action.payload;
    },
    storeFamilyMemberUuid: (state, action) => {
      state.familyMemberUuid = action.payload;
    },
  },
  // /profileData
  extraReducers: builder => {
    builder
      .addCase(getProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.loading = false;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // state.isAPICall = true;
      })
      .addCase(editProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isEditProfileSuccess = true;
        processEditProfileResponse(state, action);
      })
      .addCase(editProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.isEditProfileSuccess = false;
        state.message = 'Unable to edit profile';
        state.isShowMessage = true;
      })
      .addCase(editDemographicsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editDemographicsAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editDemographicsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getLanguagesAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLanguagesAction.fulfilled, (state, action) => {
        processGetLanguageResponse(state, action);
        state.loading = false;
      })
      .addCase(getLanguagesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
//editProfileAction

export const {
  resetProfile,
  fillDataForDemographicsEdit,
  updateFieldValue,
  hideProfileMessage,
  familyMemberDataById,
  storeFamilyMemberUuid,
} = ProfileReducer.actions;
export default ProfileReducer.reducer;
