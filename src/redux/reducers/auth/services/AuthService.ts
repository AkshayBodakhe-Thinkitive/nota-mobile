import {Alert} from 'react-native';
import {ResponseCode} from '../../../../Interface/responseCode';
import {post, post2, put} from '../../../../config/AxiosConfig';
import {resetHome} from '../../home/HomeReducer';
import {resetMedicalRecordReducer} from '../../medicalrecord/medicalRecordReducer';
import {resetProfile} from '../../profile/ProfileReducer';
import {logoutPopup, resetAuth, resetTokens} from '../AuthReducer';
import {store} from '../../../store/storeConfig';
export class AuthService {
  static async signUp(signUpPayload: any) {
    // console.log("signUpPayload---->",signUpPayload)
    try {
      const response = await post2(`/auth/patient`, signUpPayload);
      console.log("response signUp==>",JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.log("error===>",JSON.stringify(error))
      throw new Error(error.response.data.message);
    }
  }

  // static async login(username: string, password: string) {
  //   const baseUrl = store.getState().auth.baseUrl
  //   try {
  //     const response = await post(`${baseUrl}/login`, {username, password, "portalName": "PATIENT"});
  //     console.log(" response from login ==>",response);
  //     return response;
  //   } catch (error: any) {
  //     console.log('error login==>',error)
  //     // return error.response.data.message
  //     Alert.alert('Alert!',error?.message)
  //     throw new Error(error);
  //   }
  // }

  static async login(username: string, password: string) {
    const baseUrl = store.getState().auth.baseUrl;
    const url = `${baseUrl}/login`;
    const body = JSON.stringify({username, password, portalName: 'PATIENT'});

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Alert!', errorData?.message || 'Something went wrong');
        return errorData;
        // throw new Error(errorData?.message || 'Something went wrong');
      }

      const responseData = await response.json();
      // console.log('response from login ==>', responseData);
      return responseData;
    } catch (error: any) {
      console.log('error login==>', error);
      // Alert.alert('Alert!', error.message || 'Network error');
      throw new Error(error.message || 'Network error');
    }
  }

  static async sendOPT(email: string) {
    try {
      const response = await post(`/forgot-password`, {email});
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async verifyOPT(otp: string, email: string) {
    try {
      const response = await post(
        `/forgot-password-otp/verify/${email}?otp=${otp}`,
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
  static async resetPassword(email: string, newPassword: string) {
    try {
      console.log('call resetPassword');
      const response = await post(`/reset-password`, {email, newPassword});
      console.log('response  resetPassword =>', response);
      return response;
    } catch (error: any) {
      console.log('error ===>', JSON.stringify(error));
      throw new Error(error.response.data.message);
    }
  }
  static async logOut(accessToken: string, refreshToken: string) {
    try {
      const response = await post(
        `/logout`,
        {refreshToken},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response;
    } catch (error: any) {
      throw error.response.status;
    }
  }

  static async deleteAccount(accessToken: string, patientId: string) {
    console.log('deleteaccount called', accessToken, patientId);
    try {
      const response = await put(
        `/patient/access/${patientId}?active=false`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('delete ac res =>', response);
      return response;
    } catch (error: any) {
      console.log('delete ac error =>', error);
      throw error.response.status;
    }
  }

  static async refreshtoken(
    dispatch: any,
    accessToken: string,
    refreshToken: string,
  ) {
    try {
      const response: any = await post(
        `/refresh-token`,
        {refreshToken},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      switch (response?.code) {
        case ResponseCode.ok:
          let tokens = {
            accessToken: response?.data?.accessToken,
            refreshToken: response?.data?.refreshToken,
          };
          dispatch(resetTokens(tokens));
          return true;
        case ResponseCode.unauthorized:
          return false;
        case ResponseCode.badRequest:
          return false;
        default:
          return false;
      }
    } catch (error: any) {
      dispatch(resetAuth());
      dispatch(resetHome());
      dispatch(resetMedicalRecordReducer());
      dispatch(resetProfile());
      dispatch(logoutPopup(false));
      // return error.response?.status;
      return false;
    }
  }
}
