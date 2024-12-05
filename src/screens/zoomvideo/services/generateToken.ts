import { get, post } from '../../../config/AxiosConfig';

// af81f42d-efc3-4051-b122-1a444995d4d5
//https://dev.api.navalaglobal.com/api/master/token/b7ba4efa-dc02-4904-8e27-1616788f46f7
export class EncouterService {
 
  
  static async submitRating(providerId: string,rating:any) {
    try {
      const response: any = await post(
        `/providers/rating/${providerId}`,{currentRating:rating}
      );
      return response;
    } catch (error:any) {
      // console.error('submit rating error:', error?.response?.data);
      return error?.response?.data
    }
  }
}
