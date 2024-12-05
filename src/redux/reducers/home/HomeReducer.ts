import {createSlice} from '@reduxjs/toolkit';
import {HOME_REDUCER} from '../../constants/StoreConstants';
import ResetHomeReducer from './action/ResetHomeReducer';
import clearLocationDataAction from './action/clearLocationDataAction';
import clearSelectedSlotAction from './action/clearSelectedSlotAction';
import resetBookAppointmentDataAction from './action/resetBookAppoinment';
import resetSlotDataAction from './action/resetSlotData';
import {bookAppinmentWithoutSlotAction} from './aysnc-actions/bookAppinmentWithoutSlotAction';
import {bookAppointmentAction} from './aysnc-actions/bookappoinmentAction';
import {getLocationAction} from './aysnc-actions/getLocationAction';
import {getPastAppointmentAction} from './aysnc-actions/getPastAppoinmentAction';
import {getProviderAction} from './aysnc-actions/getProviderAction';
import {getProviderListAction} from './aysnc-actions/getProviderListAction';
import {getSlotWithLocationAction} from './aysnc-actions/getSlotWithLocationAction';
import {getSlotsAction} from './aysnc-actions/getSlotsAction';
import {getUpcomingAppointmentAction} from './aysnc-actions/getUpcomingAppointment';
// import { getZoomTokenAction } from './aysnc-actions/getZoomTokenAction';
import resetErrorBookAppointmentDataAction from './action/resetErrorBookAppointmentAction';
import {cancelAppointmentAction} from './aysnc-actions/cancelAppointmentAction';
import {getConsultedProvidersAction} from './aysnc-actions/getConsultedProvidersAction';
import {getIntakeFormAction} from './aysnc-actions/getIntakeFormAction';
import {getConsentFormAction} from './aysnc-actions/getConsentFormAction';
import {setConsentFormAction} from './aysnc-actions/setConsentFormAction';
import {postIntakeFormAction} from './aysnc-actions/postIntakeFormAction';
import {GetProviderByUuid} from './aysnc-actions/GetProviderByUuid';
import { getInsuranceAction } from './aysnc-actions/getInsuranceAction';

export const initialState: any = {
  loading: false,
  providerData: null,
  locationData: null,
  providers: null,
  slotData: null,
  selectedSlotData: null,
  bookAppointmentData: null,
  appointmentErrorData: null,
  upcomingAppointmentData: null,
  pastAppoinmentData: null,
  cancelAppointmentData: null,
  consultedProvidersData: null,
  zoomData: null,
  intakeFormData: null,
  intakeForm: null,
  consentFormData: null,
  message: '',
  isShowMessage: false,
  providerDataUuid: null,
  insuranceData : []
};

const HomeReducer = createSlice({
  name: HOME_REDUCER,
  initialState,
  reducers: {
    getProviderList: (state, action) => {
      state.loading = initialState.loading;
      state.providerData = initialState.providerData;
    },
    getLocationList: (state, action) => {
      state.loading = initialState.loading;
      state.locationData = initialState.providerData;
    },
    getSlotsAction: (state, action) => {
      state.loading = initialState.loading;
      state.slotData = initialState.slotData;
    },
    resetSlotAction: state => {
      resetSlotDataAction(state);
    },
    resetHome: state => {
      ResetHomeReducer(state, initialState);
    },
    resetBookAppointmentAction: state => {
      resetBookAppointmentDataAction(state);
    },
    resetErrorBookAppointmentAction: state => {
      resetErrorBookAppointmentDataAction(state);
    },
    selectedSlots: (state, action) => {
      state.selectedSlotData = action.payload;
      // selectedslotAction(state);
    },
    clearSelectedSlot: state => {
      clearSelectedSlotAction(state);
    },
    clearLocation: state => {
      clearLocationDataAction(state);
    },
    clearCancelAppointmentData: state => {
      state.cancelAppointmentData = initialState.cancelAppointmentData;
    },
    setIntakeForm: (state, action) => {
      state.intakeForm = action.payload;
    },
    setIsShowMessage: (state, action) => {
      if (action.payload == false) {
        state.message = '';
      }
      state.isShowMessage = action.payload;
    },
    resetproviderDataUuid: state => {
      state.providerDataUuid = initialState.providerDataUuid;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProviderListAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProviderListAction.fulfilled, (state, action) => {
        state.providerData = action.payload;
        state.loading = false;
      })
      .addCase(getProviderListAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getLocationAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLocationAction.fulfilled, (state, action) => {
        state.locationData = action.payload;
        state.loading = false;
      })
      .addCase(getLocationAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProviderAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProviderAction.fulfilled, (state, action) => {
        state.providers = action.payload;
        state.loading = false;
      })
      .addCase(getProviderAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSlotsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSlotsAction.fulfilled, (state, action) => {
        state.slotData = action.payload;
        state.loading = false;
      })
      .addCase(getSlotsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // state.isAPICall = true;
      })
      .addCase(getSlotWithLocationAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSlotWithLocationAction.fulfilled, (state, action) => {
        state.slotData = action.payload;
        state.loading = false;
      })
      .addCase(getSlotWithLocationAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.slotData = null
      }) //bookAppointmentAction
      .addCase(bookAppointmentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookAppointmentAction.fulfilled, (state, action) => {
        state.bookAppointmentData = action.payload;
        state.loading = false;
      })
      .addCase(bookAppointmentAction.rejected, (state, action) => {
        state.loading = false;
        state.appointmentErrorData = action.error;
        state.error = true;
      })
      .addCase(bookAppinmentWithoutSlotAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookAppinmentWithoutSlotAction.fulfilled, (state, action) => {
        state.bookAppointmentData = action.payload;
        state.loading = false;
      })
      .addCase(bookAppinmentWithoutSlotAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUpcomingAppointmentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUpcomingAppointmentAction.fulfilled, (state, action) => {
        state.upcomingAppointmentData = action.payload;
        state.loading = false;
      })
      .addCase(getUpcomingAppointmentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // state.isAPICall = true;
      })
      .addCase(getPastAppointmentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPastAppointmentAction.fulfilled, (state, action) => {
        state.pastAppoinmentData = action.payload;
        state.loading = false;
      })
      .addCase(getPastAppointmentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // state.isAPICall = true;
      })
      .addCase(cancelAppointmentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelAppointmentAction.fulfilled, (state, action) => {
        state.cancelAppointmentData = action.payload;

        state.loading = false;
      })
      .addCase(cancelAppointmentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getConsultedProvidersAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getConsultedProvidersAction.fulfilled, (state, action) => {
        state.consultedProvidersData = action.payload;
        state.loading = false;
      })
      .addCase(getConsultedProvidersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getIntakeFormAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getIntakeFormAction.fulfilled, (state, action) => {
        state.intakeFormData = action.payload;
        state.loading = false;
      })
      .addCase(getIntakeFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getConsentFormAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getConsentFormAction.fulfilled, (state, action) => {
        state.consentFormData = action.payload;
        state.loading = false;
      })
      .addCase(getConsentFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(setConsentFormAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setConsentFormAction.fulfilled, (state, action) => {
        state.consentFormData = null;
        state.loading = false;
      })
      .addCase(setConsentFormAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(postIntakeFormAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postIntakeFormAction.fulfilled, (state, action) => {
        state.message = 'Patient intake form filled successfully';
        state.isShowMessage = true;
        state.loading = false;
      })
      .addCase(postIntakeFormAction.rejected, (state, action) => {
        state.loading = false;
        state.message = 'Unable to fill patient intake form!';
        state.isShowMessage = true;
        state.error = true;
      })
      .addCase(GetProviderByUuid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetProviderByUuid.fulfilled, (state, action) => {
        state.loading = false;
        state.providerDataUuid = action?.payload;
      })
      .addCase(GetProviderByUuid?.rejected, (state, action) => {
        state.providerDataUuid = null;
        state.loading = false;
        state.error = true;
      })

      .addCase(getInsuranceAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getInsuranceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceData = action?.payload;
      })
      .addCase(getInsuranceAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  getProviderList,
  resetHome,
  resetSlotAction,
  selectedSlots,
  resetBookAppointmentAction,
  clearSelectedSlot,
  clearLocation,
  resetErrorBookAppointmentAction,
  clearCancelAppointmentData,
  setIntakeForm,
  setIsShowMessage,
  resetproviderDataUuid,
} = HomeReducer.actions;
export default HomeReducer.reducer;
//getPastAppointmentAction
