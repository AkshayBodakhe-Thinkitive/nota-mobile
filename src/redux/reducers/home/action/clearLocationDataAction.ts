// import { initialState } from "../HomeReducer";

import { initialState } from "../HomeReducer";

const clearLocationDataAction= (state: any) => {
    return state.locationData = initialState.locationData
}

export default clearLocationDataAction;
