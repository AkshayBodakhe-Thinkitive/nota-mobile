import {get, post, put} from '../../../../config/AxiosConfig';
// /user/profile/details
export class ProfileService {
  static async getProfile(accessToken: string) {
    const id = 'public';
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // const  ro = get
      const response = await get('/user/profile/details', {headers});
      return response;
    } catch (error: any) {
      throw error.response.status;
    }
  }
  static async editProfile(accessToken: string, data: any) {
    const id = 'public';

    try {
      // console.log(' inside edit profile api call *******   ');
      // console.log(' Authorization:', accessToken);
      // console.log('Edit data', data);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      //https://dev.api.navalaglobal.com/api/master/patient
      const response = await put('/patient', data, {headers});
      console.log(
        '************ response editProfile *****  ' + JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      // console.log(' ********* error  *********  ' + JSON.stringify(error));

      throw new Error(error.response.data.message);
    }
  }

  static async editDemographics(accessToken: string, data: any) {
    const id = 'public';

    try {
      console.log(' inside editDemographics api call *******   ');
      console.log(' Authorization:', accessToken);
      console.log('Edit data editDemographics', data);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await put('/patient', data, {headers});
      console.log(
        '************ response editDemographics *****  ' +
          JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error  *********  ' + error.response.data.message);

      throw new Error(error.response.data.message);
    }
  }
  static async getLanguages(accessToken: string) {
    const id = 'public';
    try {
      console.log(' inside get language api call *******   ');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await get('/get/languages', {headers});
      console.log(
        '************ response get languages *****  ' +
          JSON.stringify(response),
      );
      return response;
    } catch (error: any) {
      console.log(' ********* error get languages  *********  ' + error);

      throw new Error(error.response.data.message);
    }
  }
}
