// import { initialState } from "../HomeReducer";

import { initialState } from "../HomeReducer";

const resetSlotDataAction= (state: any) => {
    return state.slotData = initialState.slotData
}

export default resetSlotDataAction;
