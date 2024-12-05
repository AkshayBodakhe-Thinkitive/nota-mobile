// import { initialState } from "../HomeReducer";

import { initialState } from "../HomeReducer";

const resetBookAppointmentDataAction= (state: any) => {
    return state.bookAppointmentData = initialState.bookAppointmentData
}

export default resetBookAppointmentDataAction;
