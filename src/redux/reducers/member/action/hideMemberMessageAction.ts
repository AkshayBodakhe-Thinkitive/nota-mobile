import { MemberReducerState } from "../interface/memberInterfaces"

export const hideMemberMessageAction = (state: MemberReducerState) => {
    state.isShowMessage = false
    state.message = ''
}