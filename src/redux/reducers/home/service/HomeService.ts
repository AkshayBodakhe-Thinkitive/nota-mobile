import { Alert } from 'react-native';
import {_delete, get, post, put} from '../../../../config/AxiosConfig';
import Toast from 'react-native-simple-toast';
//https://dev.api.navalaglobal.com/api/master/provider-group/all?page=0&size=7&searchString=&status=
export class HomeService {
  static async getproviderList(
    accessToken: string,
    page: string,
    size: string,
    searchString: string,
  ) {
    const id = 'public';
    try {
      const headers = {
        'X-TENANT-ID': id,
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      const response = await get(
        `/provider-group/all?size=${size}&searchString=${searchString}&status=`,
        {headers},
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async getLocation(
    accessToken: string,
    page: string,
    size: string,
    searchString: string,
    status: string,
    providerUUID: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get(
        `/location/all/${providerUUID}?page=0&size=20&searchString=&status=`,
        {headers},
      );
      // console.log("getLocation response",JSON.stringify(response?.data?.content))
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  static async getProvider(
    accessToken: string,
    searchBy: string,
    sourceId: string,
    providerUUID: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      //
      //

      const response = await get(
        `/provider/all/${providerUUID}?searchBy=&sourceId=`,
        {headers},
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async getslots(
    accessToken: string,
    providerUUID: string,
    visitType: string,
    appointmentType: string,
    appointmentDate: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await post(
        `/appointment/fetch/slots`,
        {providerUUID, visitType, appointmentType, appointmentDate},
        {headers},
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  static async getslotsWithLocation(
    accessToken: string,
    providerUUID: string,
    visitType: string,
    appointmentType: string,
    appointmentDate: string,
    locationUUID: string,
  ) {
    // https://dev.api.navalaglobal.com/api/master/appointment/fetch/slots
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    //  console.log(
    //   providerUUID,
    //   visitType,
    //   appointmentType,
    //   appointmentDate,
    //   locationUUID
    // );

      const response = await post(
        `/appointment/fetch/slots`,
        {
          providerUUID,
          visitType,
          appointmentType,
          appointmentDate,
          locationUUID,
        },
        {headers},
      )
    
      return response;
    } catch (error: any) {
      console.log('getslotsWithLocation error =======>',JSON.stringify(error))
      // Toast.show('The Provider is not available for the selected Location!', 2);
      throw new Error(error.response.data.message);
    }
  }

  static async bookAppointment(
    accessToken: string,
    providerUUID: string,
    visitType: string,
    appointmentType: string,
    appointmentDate: string,
    startTime: string,
    endTime: string,
    visitReason: string,
    bookByPatient: string,
    providerGroupId: string,
    patientUserUuid: string,
    locationUUID: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      //
      //

      const response = await post(
        `/appointment/book`,
        {
          providerUUID,
          visitType,
          appointmentType,
          appointmentDate,
          startTime,
          endTime,
          visitReason,
          bookByPatient,
          providerGroupId,
          locationUUID,
          patientUserUuid,
        },
        {headers},
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async bookAppointmentWithoutSlot(
    accessToken: string,
    patientId: string,
    providerGroupId: string,
    appointmentDate: string,
    appointmentType: string,
    appointmentMode: string,
    startTime: string,
    endTime: string,
    visitReason: string,
    speciality : string
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await post(
        `/appointment/patient-book`,
        {
          patientId,
          providerGroupId,
          appointmentType,
          appointmentDate,
          appointmentMode,
          startTime,
          endTime,
          visitReason,
          speciality
        },
        {headers},
      );
        // console.log("bookAppointmentWithoutSlot response ==> ",response)
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  static async getUpcomingAppointment(
    accessToken: string,
    patientUUID: string,
    appointmentState: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get(
        `appointment/patient-family-member/${patientUUID}?appointmentState=${appointmentState}`,
        {headers},
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  static async fetchAppointmentToken(
    appointmentUuid: string,
    accessToken: string,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await get(`/token/${appointmentUuid}`, {headers});
      return response;
    } catch (error: any) {
      return error?.response?.data;
    }
  }
  static async cancelAppointment(
    accessToken: string,
    appointmentId: string,
    reasonForCancellation: string,
  ) {

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      //
      //

      const response = await post(
        `/appointment/cancel`,
        {
          appointmentId,
          reasonForCancellation,
        },
        {headers},
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async getConsultedProvider(
    accessToken: string,
    patientId: string,
    page: number,
  ) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = `/provider/consulted/${patientId}?page=${
        !page ? 0 : page
      }&size=10`;
      const response: any = await get(url, {headers});

      return response;
    } catch (error: any) {
      console.log('********* Error getConsultedProvider:', error);

      return error?.response?.data;
    }
  }
  
  static async getIntakeForm(accessToken: string, appointmentUuid: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = `/patient/intake-form/${appointmentUuid}`;
      const response: any = await get(url, {headers});
      // console.log('response intake form  =>',JSON.stringify(response))
      return response;
    } catch (error: any) {
      return error?.response?.data;
    }
  }

  static async getConsentForm(accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = '/patient/default-consent-form';
      const response: any = await get(url, {headers});
      return response;
    } catch (error: any) {
      return error?.response?.data;
    }
  }

  static async setConsentForm(accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = '/patient/accept-terms-conditions';
      const response = await put(url, {}, {headers});
      console.log(
        '************ response  setConsentForm *****  ' +
          JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(
        ' ********* error setConsentForm  *********  ' + JSON.stringify(error),
      );

      throw new Error(error.response.data.message);
    }
  }

  static async GetProviderGroupUuid({id, accessToken}: any) {
    try {

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = `/provider-group/${id}`;
      const response = await get(url, {headers});
      // console.log(' reaspoonse  ***   ', response);

      return response;
    } catch (error: any) {
      console.log(' ********* error GetProviderGroupUuid  *********  ' + error);
      throw new Error(error.response.data.message);
    }
  }

  static async postIntakeForm(accessToken: string, data: any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      console.log('Posting Intake form JSON:', data);
      let url = '/patient/intake-form';
      const response = await post(url, data, {headers});
      console.log(
        '************ response postIntakeForm *****  ' +
          JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error postIntakeForm  *********  ' + error);
      throw new Error(error.response.data.message);
    }
  }

  static async getInsurance(accessToken: string, patientUuid: any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await get(
        `/insurance/patient/${patientUuid}/insurance`,
        {headers},
      );
      // console.log('response get insurance =>',JSON.stringify(response))
      return response?.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async addInsurance(accessToken: string, payload: any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      console.log('payload add insurance==>',payload)
      const response: any = await post('/insurance', payload, { headers });
      console.log('response add insurance =>', JSON.stringify(response));
      if (response && response.code === 'CREATED') {
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response?.message || 'Something went wrong.');
      }
      return response?.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async updateInsurance(accessToken: string, patientUuid: string, insuranceUuid: string, payload: any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await put(`/insurance/patient/${patientUuid}/insurance/${insuranceUuid}`, payload, { headers });
      // console.log('response update insurance =>', JSON.stringify(response));
      if (response && response.code === 'OK') {
        Alert.alert('Success', response?.message);
      } else {
        Alert.alert('Error', response?.message || 'Something went wrong.');
      }
      return response?.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async deleteInsurance(accessToken: string, insuranceId: any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await _delete(
        `/insurance/${insuranceId}`,
        {headers},
      );
    //  console.log('response delete insurance =>',JSON.stringify(response))
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }


  static async rescheduleAppointmentProvider(accessToken: string, payload: any,appointmentId:any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await put(
        `/appointment/reschedule/${appointmentId}`,payload,
        {headers},
      );
     console.log('response rescheduleAppointmentProvider insurance =>',JSON.stringify(response))
      return response;
    } catch (error: any) {
      console.log('error on service =>', error);
      throw new Error(error.response.data.message);
    }
  }

  static async rescheduleAppointmentClinic(accessToken: string, payload: any,appointmentId:any) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await put(
        `/appointment/patient-reschedule/${appointmentId}`,payload,
        {headers},
      );
     console.log('response rescheduleAppointment clinic insurance =>',JSON.stringify(response))
      return response;
    } catch (error: any) {
      console.log('error on service =>', error);
      throw new Error(error.response.data.message);
    }
  }
}
