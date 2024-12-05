import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ResponseCode} from '../../../Interface/responseCode';
import {MEMBER_REDUCER} from '../../constants/StoreConstants';
import {hideMemberMessageAction} from './action/hideMemberMessageAction';
import {setEditMemberPayloadAction} from './action/setEditMemberPayload';
import {setMemberInputAction} from './action/setMemberInputAction';
import {addMemberAction} from './async-action/addMemberAction';
import {editMemberAction} from './async-action/editMemberAction';
import {getMemberAction} from './async-action/getMembersAction';
import {MemberReducerState} from './interface/memberInterfaces';
import {editFamilyMemberAction} from './async-action/editFamilyMember';

export const initialState: MemberReducerState = {
  isLoading: false,
  allMembers: null,
  isEditMember: false, //Identify Edit/Add member
  memberPayload: {
    uuid: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    roleType: 'PATIENT',
    gender: '',
    birthDate: '', //Showed on UI
    familyMemberRelation: '',
    familyMemberId: '',
    convertedDate: '', //Used to POST data [API]
    emergContactRelation: '',
    emergContactNumber: '',
    emergContactEmail: '',
  },
  isShowMessage: false,
  message: '',
  membersData: {
    code: '',
    message: '',
    data: {
      content: [],
      last: false,
      totalElements: 0,
      totalPages: 0,
      size: 0,
      first: false,
      numberOfElements: 0,
      empty: false,
    },
  },
};

const processAddMemberResponse = (state: MemberReducerState, action: any) => {
  let payload = action.payload;
  console.log('payload code', payload.code);
  switch (payload.code) {
    case ResponseCode.created || ResponseCode.ok:
      state.message = 'Member added successfully';
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
      state.message = 'Unable to add member';
      break;
  }
  state.isShowMessage = true;
};

const processGetMemberResponse = (state: MemberReducerState, action: any) => {
  let payload = action.payload;
  switch (payload.code) {
    case ResponseCode.ok:
      state.message = '';
      state.isLoading = false;
      state.membersData.code = payload.code;
      state.membersData.message = payload.message;
      state.membersData.data.last = payload.data.last;
      state.membersData.data.totalElements = payload.data.totalElements;
      state.membersData.data.totalPages = payload.data.totalPages;
      state.membersData.data.size = payload.data.size;
      state.membersData.data.numberOfElements = payload.data.numberOfElements;
      state.membersData.data.empty = payload.data.empty;

      payload.data.content.map((data: any) => {
        state.membersData.data.content = [
          ...state.membersData.data.content,
          data,
        ];
      });

      break;
    case ResponseCode.unauthorized:
      state.message = 'Unauthorized!';
      state.isShowMessage = true;
      break;
    default:
      state.message = 'Unable to get members';
      state.isShowMessage = true;
      break;
  }
};

const processEditMemberResponse = (state: MemberReducerState, action: any) => {
  let payload = action.payload;
  console.log('payload code', payload.code);
  switch (payload.code) {
    case ResponseCode.updated || ResponseCode.ok:
      state.message = 'Member edited successfully';
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
      state.message = 'Unable to edit member';
      break;
  }
  state.isShowMessage = true;
};

const memberReducer = createSlice({
  name: MEMBER_REDUCER,
  initialState,
  reducers: {
    setMemberInputs: (
      state,
      action: PayloadAction<{key: string; value: string}>,
    ) => {
      setMemberInputAction(state, action);
    },
    hideMemberMessage: state => {
      hideMemberMessageAction(state);
    },
    resetMember: state => {
      state.memberPayload = initialState.memberPayload;
    },
    setIsEditMember: (state, action) => {
      state.isEditMember = action.payload;
    },
    setMemberPayloadToEdit: (state, action) => {
      setEditMemberPayloadAction(state, action);
    },
    resetMembersData: state => {
      state.membersData = initialState.membersData;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addMemberAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addMemberAction.fulfilled, (state, action) => {
        state.isLoading = false;
        processAddMemberResponse(state, action);
      })
      .addCase(addMemberAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = 'Unable to add member';
        state.isShowMessage = true;
      })
      .addCase(getMemberAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMemberAction.fulfilled, (state, action) => {
        state.isLoading = false;
        processGetMemberResponse(state, action);
      })
      .addCase(getMemberAction.rejected, (state, action) => {
        state.isLoading = false;
        // state.message = 'Unable to get member';
        // state.isShowMessage = true;
      })
      .addCase(editMemberAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editMemberAction.fulfilled, (state, action) => {
        state.isLoading = false;
        processEditMemberResponse(state, action);
      })
      .addCase(editMemberAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = 'Unable to edit member';
        state.isShowMessage = true;
      })
      .addCase(editFamilyMemberAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editFamilyMemberAction.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(" fulfill action  ");
        
        processEditMemberResponse(state, action);
      })
      .addCase(editFamilyMemberAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = 'Unable to edit member';
        state.isShowMessage = true;
      });
  },
});

export const {
  setMemberInputs,
  hideMemberMessage,
  resetMember,
  setIsEditMember,
  setMemberPayloadToEdit,
  resetMembersData,
} = memberReducer.actions;
export default memberReducer.reducer;
