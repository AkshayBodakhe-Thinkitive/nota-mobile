import {get, post, put} from '../../../../config/AxiosConfig';

export class memberService {
  static async getMembers(
    accessToken: string,
    memberId: string,
    page: number,
    searchString: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let urlStr = `/family-member/${memberId}?page=${
        !page ? 0 : page
      }&size=10&searchString=${!searchString ? '' : searchString}`;
      const response = await get(urlStr, {headers});

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async addMember(
    accessToken: string,
    emailId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roleType: string,
    gender: string,
    birthDate: string,
    familyMemberRelation: string,
    familyMemberId: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const email = emailId === '' ? null : emailId;
      const phone = phoneNumber === '' ? null : phoneNumber;
      let emergContactRelation = 'SIBLING';
      let emergContactNumber = '8765432323';
      let emergContactEmail = 'test@mailinator.com';
      const response = await post(
        `/family-member`,
        {
          email,
          firstName,
          lastName,
          phone,
          roleType,
          gender,
          birthDate,
          familyMemberRelation,
          familyMemberId,
          emergContactRelation,
          emergContactNumber,
          emergContactEmail,
        },
        {headers},
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async editFamilyMember(accessToken: string, data: object) {
    try {
      console.log(' update family member ', data);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await put('/family-member', data, {headers});
      console.log('editMember response =>', response);
      return response;
    } catch (error: any) {
      console.log('editMember error =>', JSON.stringify(error));
      throw new Error(error.response.data.message);
    }
  }

  static async editMember(
    accessToken: string,
    uuid: string,
    emailId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roleType: string,
    gender: string,
    birthDate: string,
    familyMemberRelation: string,
    familyMemberId: string,
    emergContactRelation: string,
    emergContactNumber: string,
    emergContactEmail: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const email = emailId === '' ? null : emailId;
      const phone =
        phoneNumber === '' || phoneNumber == null ? null : phoneNumber;

      const response = await put(
        '/family-member',
        {
          uuid,
          email,
          firstName,
          lastName,
          phone,
          roleType,
          gender,
          birthDate,
          familyMemberRelation,
          emergContactRelation,
          emergContactNumber,
          emergContactEmail,
          familyMemberId,
        },
        {headers},
      );
      //  console.log('editMember response =>',response)
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async getFamilyMemberByUuid(accessToken: string, uuidForMedicalRecords: string) {
    try {
      const response: any = await get(`/patient/${uuidForMedicalRecords}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Get family member response =>', response);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}
