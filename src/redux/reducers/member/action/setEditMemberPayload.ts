import { PayloadAction } from "@reduxjs/toolkit"
import moment from "moment"
import { MemberReducerState } from "../interface/memberInterfaces"

export const setEditMemberPayloadAction = (state: MemberReducerState, action: PayloadAction<any>) => {
    let data = action.payload
    state.memberPayload.uuid = data?.uuid == null ? '' : data?.uuid
    state.memberPayload.email = data?.email == null ? '' : data?.email
    state.memberPayload.firstName = data?.legalFirstName == null ? '' : data?.legalFirstName
    state.memberPayload.lastName = data?.legalLastName == null ? '' : data?.legalLastName
    state.memberPayload.phone = data?.contactNumber == null ? '' : data?.contactNumber
    state.memberPayload.roleType = 'PATIENT'
    state.memberPayload.gender = data?.gender == null ? '' : data?.gender
    state.memberPayload.familyMemberRelation = data?.familyMemberRelation == null ? '' : data?.familyMemberRelation
    //Converting date to show on UI
    let dateToShow = moment(data.birthDate).format('MM/DD/yyyy') 
    state.memberPayload.birthDate = data?.birthDate == null ? '' : dateToShow // Show on UI
    state.memberPayload.convertedDate = data?.birthDate == null ? '' : data?.birthDate //Date to POST
    state.memberPayload.emergContactNumber = data?.emergContactNumber == null ? '' : data.emergContactNumber
    state.memberPayload.emergContactRelation = data?.emergContactRelation == null ? '' : data.emergContactRelation
    state.memberPayload.emergContactEmail = data?.emergContactEmail == null ? '' : data.emergContactEmail
}