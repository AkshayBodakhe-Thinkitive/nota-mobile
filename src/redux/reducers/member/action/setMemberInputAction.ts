import { PayloadAction } from "@reduxjs/toolkit"
import { MemberInputs1 } from "../../../../Constants1/inputfieldConstants1"
import { MemberReducerState } from "../interface/memberInterfaces"

export const setMemberInputAction = (state: MemberReducerState, action: PayloadAction<{key: string, value: string}>) => {
    let data = action.payload.value
    switch(action.payload.key) {
        case MemberInputs1.email:
            state.memberPayload.email = data
            break
        case MemberInputs1.fName:
            state.memberPayload.firstName = data
            break
        case MemberInputs1.lName:
            state.memberPayload.lastName = data
            break
        case MemberInputs1.phone:
            state.memberPayload.phone = data
            break
        case MemberInputs1.roleType:
            state.memberPayload.roleType = data
            break
        case MemberInputs1.gender:
            state.memberPayload.gender = data
            break
        case MemberInputs1.familyMemberRelation:
            state.memberPayload.familyMemberRelation = data
            break
        case MemberInputs1.birthDate:
            state.memberPayload.birthDate = data
            break
        case MemberInputs1.convertedDate:
            state.memberPayload.convertedDate = data
            break
        case MemberInputs1.emergContactRelation:
            state.memberPayload.emergContactRelation = data
            break
        case MemberInputs1.emergContactNumber:
            state.memberPayload.emergContactNumber = data
            break
        case MemberInputs1.emergContactEmail:
            state.memberPayload.emergContactEmail = data
            break
        default:
            break
    }
}