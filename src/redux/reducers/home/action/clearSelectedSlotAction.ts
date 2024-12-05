// import { initialState } from "../HomeReducer";

import { initialState } from "../HomeReducer";

const clearSelectedSlotAction= (state: any) => {
    return state.selectedSlotData = initialState.selectedSlotData
}

export default clearSelectedSlotAction;
