import { initialState } from "../HomeReducer";

const ResetHomeReducer = (state:any,initialState:any) => {
    state.consultedProvidersData = initialState.consultedProvidersData,
    state.loading = initialState.loading,
    state.providerData= initialState.providerData,
    state.locationData= initialState.locationData,
    state.providers= initialState.providers,
    state.slotData= initialState.slotData,
    state.selectedSlotData= initialState.selectedSlotData,
    state.bookAppointmentData= initialState.bookAppointmentData,
    state.appointmentErrorData= initialState.appointmentErrorData,
    state.upcomingAppointmentData= initialState.upcomingAppointmentData,
    state.pastAppoinmentData= initialState.pastAppoinmentData,
    state.cancelAppointmentData= initialState.consultedProvidersData,
    state.consultedProvidersData= initialState.consultedProvidersData,
    state.zoomData= initialState.zoomData,
    state.intakeFormData= initialState.intakeFormData,
    state.intakeForm= initialState.intakeForm,
    state.consentFormData= initialState.consentFormData
    state.message= initialState.message
    state.isShowMessage = initialState.isShowMessage
    state.providerDataUuid= initialState.providerDataUuid;
    return initialState
}

export default ResetHomeReducer;