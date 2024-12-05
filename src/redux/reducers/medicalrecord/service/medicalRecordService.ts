import { get } from '../../../../config/AxiosConfig';
export class medicalRecordService {
  static async getVitals(accessToken: string, patientUUID: string) {
    const id = 'public';
    console.log("patientUUID  ",patientUUID);
    
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get(`/vital/patient/${patientUUID}/vital?page=0&size=1000`, {
        headers,
      });

      console.log(" response  ",response);
      
  
      return response;
    } catch (error: any) {
      throw error.response.status;
    }
  }

  static async getAllergies(
    accessToken: string,
    patientUUID: string,
    page: string,
    size: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get(
        `/allergy/patient/${patientUUID}/allergy?page=${page}&size=${size}`,
        {headers},
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error  *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }

  static async getVaccines(
    accessToken: string,
    patientUUID: string,
    page: string,
    size: string,
  ) {
    const id = 'public';
    try {
      console.log('*** inside get getVaccines api call *******   ');
      console.log(' Authorization:', accessToken);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      const response = await get(
        `/vaccine/patient/${patientUUID}/vaccine?page=${page}&size=${size}`,
        {headers},
      );
      console.log(response);
      console.log(
        '************ response  getVaccines *****  ' + JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error  *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }

  static async getProblems(
    accessToken: string,
    patientUUID: string,
    page: string,
    size: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      console.log("getProblems patientUUID ===>",`/problems/patient/${patientUUID}/problem?page=${page}&size=${size}`)
      const response = await get(
        `/problems/patient/${patientUUID}/problem?page=${page}&size=${size}`,
        {headers},
      );
      console.log(response);
      console.log(
        '************ response  getProblems *****  ' + JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' *********getProblems error  *********  ' +  JSON.stringify(error));

      throw new Error(error.response.data.message);
    }
  }

  static async getVisitHistory(
    accessToken: string,
    patientUUID: string,
  ) {
    try {
      console.log('*** inside get getVisitHistory api call *******   ');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get(
        `/encounter/visit-history/${patientUUID}`,
        {headers},
      );
      console.log(
        '************ response  getVisitHistory *****  ' +
          JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error getVisitHistory  *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }

  static async getPastMedications(
    accessToken: string,
    patientUUID: string,
    page: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      const response = await get(
        `/medications/patient/past/${patientUUID}?page=${page}&size=10`,
        {headers},
      );
      console.log(
        '************ response  getPastMedicationsAction *****  ' + JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error getPastMedicationsAction *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }

  static async getCurrentMedications(
    accessToken: string,
    patientUUID: string,
    page: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      const response = await get(
        `/medications/patient/current/${patientUUID}?page=${page}&size=10`,
        {headers},
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error getCurrentMedications *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }

  static async getVisitHistoryDetails(
    accessToken: string,
    encounterUuid: string,
  ) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await get(
        `/encounter/details/${encounterUuid}`,
        {headers},
      );
      return response;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  }
}
