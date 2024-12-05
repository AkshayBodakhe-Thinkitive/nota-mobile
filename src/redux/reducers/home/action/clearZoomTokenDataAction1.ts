import { initialState } from "../HomeReducer";

const clearZoomTokenDataAction= (state: any) => {
    return state.zoomData = initialState.zoomData
}

export default clearZoomTokenDataAction;