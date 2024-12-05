import { MemberReducerState } from "../reducers/member/interface/memberInterfaces"


export interface AppState {
    auth : any,
    home: any,
    medicalrecord : any
    profile: any,
    member: MemberReducerState
    zoom: any,
    payments : any
}