// import { initialState } from "../HomeReducer";

import { initialState } from "../ZoomReducer";

const clearZoomTokenDataAction= (state: any) => {
    return state.zoomData = initialState.zoomData
}

export default clearZoomTokenDataAction;