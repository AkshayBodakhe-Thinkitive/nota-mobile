import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { AppState } from "../interfaces/AppState";
import authReducer from "../reducers/auth/AuthReducer";
import homeReducer from "../reducers/home/HomeReducer";
import medicalRecordReducer from "../reducers/medicalrecord/medicalRecordReducer";
import memberReducer from "../reducers/member/memberReducer";
import ProfileReducer from "../reducers/profile/ProfileReducer";
import ZoomReducer from "../reducers/zoom/ZoomReducer";
import PaymentReducer from "../reducers/payments/PaymentReducer";

export const rootReducer : Reducer<AppState> = combineReducers({
    auth : authReducer,
    home: homeReducer,
    profile: ProfileReducer,
    medicalrecord: medicalRecordReducer,
    member: memberReducer,
    zoom: ZoomReducer,
    payments : PaymentReducer
})

