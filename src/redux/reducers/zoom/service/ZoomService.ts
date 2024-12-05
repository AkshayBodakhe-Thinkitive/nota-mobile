// import { get, post } from '../../../config/AxiosConfig';

import { get, post } from "../../../../config/AxiosConfig";

// af81f42d-efc3-4051-b122-1a444995d4d5
//https://dev.api.navalaglobal.com/api/master/token/b7ba4efa-dc02-4904-8e27-1616788f46f7
export class ZoomService {
 //https://dev.api.navalaglobal.com/api/master/provider/rating
//  {
//     "providerUuid":"ab9127a4-2ea9-4e7e-860d-da801d1b3396",
//     "patient":{
//         "uuid":"90cb7ceb-2a01-4eee-806d-0cee1b176397"
//     },
//     "rating":4,
//     "review":"doctor kay bara nahi"
// }
  static async postRatingAction(accessToken: string,providerUuid: string,rating:any,uuid: string,review: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const body = {
        'providerUuid': providerUuid,
        'patient': {
            'uuid': uuid
        },
        'rating': rating,
        'review':review
      }
    try {
      const response: any = await post(
        `/provider/rating`,body,{headers}
      );
      console.log('postRatingAction ++++',JSON.stringify(response));
      
      return response;
    } catch (error:any) {
      // console.error('postRatingAction: error', error?.response?.data);
      return error?.response?.data
    }
  }

  static async getPermissionToJoinCall(appointmentUuid: string,accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      console.log('appointmentUuid',appointmentUuid,'accessToken',accessToken);  
      //event/subscribe/fb4862dd-e515-4181-88b8-aa6600912ceb_REQUEST
      console.log('fetching getPermissionToJoinCall appointment token:');
      const response: any = await get(
        `/event/emit/${appointmentUuid}_REQUEST`,{headers}
      );
      console.log('Response getPermissionToJoinCall: ', response)
      return response;
    } catch (error:any) {
      console.log('Error fetching getPermissionToJoinCall appointment token:', JSON.stringify(error));
      console.log('error?.response?.data',error?.response?.status);
      if (error?.response?.status==401) {
        // dispatch(refreshTokenAction(dispatch,accessToken, refreshToken));
      }
      
      
      return error?.response?.data
    }
  }
  static async fetchAppointmentToken(appointmentUuid: string,accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response: any = await get(
        `/token/${appointmentUuid}`,{headers}
      );
      return response;
    } catch (error:any) {
      console.log('Error fetching fetchAppointmentToken appointment token:',JSON.stringify(error) );
      return error?.response?.data
    }
  }
  //https://dev.api.navalaglobal.com/api/master/provider/rating
  static async getTopRatedProvider(accessToken: string, page: number,) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let url = `/provider/rating?page=${!page ? 0 : page}&size=10`
      const response: any = await get(
        `/provider/rating`,{headers}
      );
      
      return response;
    } catch (error:any) {
      return error?.response?.data
    }
  }
}
