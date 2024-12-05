export interface MemberReducerState {
    isLoading: boolean,
    allMembers: any,
    isEditMember: boolean,
    memberPayload: MemberProp,
    isShowMessage: boolean,
    message: string,
    membersData: AllMembersProp
}

export interface AllMembersProp {
    code: string,
    message: string,
    data: AllMembersDataProp
}
    
export interface AllMembersDataProp {
    content: any,
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}
    
export interface MemberDetailsProps {
    id: number,
    uuid: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    gender: string,
    birthDate: string,
    familyMemberRelation: string,
    familyMemberId: string,


export interface MemberProp {
    uuid: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    roleType: string,
    gender: string,
    birthDate: string,
    familyMemberRelation: string,
    familyMemberId: string,
    convertedDate: string,
    emergContactRelation: string,
    emergContactNumber: string,
    emergContactEmail: string,
}