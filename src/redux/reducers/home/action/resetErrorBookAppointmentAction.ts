// import { initialState } from "../HomeReducer";

import { initialState } from "../HomeReducer";

const resetErrorBookAppointmentDataAction= (state: any) => {
    return state.appointmentErrorData = initialState.appointmentErrorData
}

export default resetErrorBookAppointmentDataAction;
