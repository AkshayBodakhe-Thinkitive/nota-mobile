import axios from 'axios';
import {get, post} from '../../config/AxiosConfig';
import {store} from '../../redux/store/storeConfig';

export const getDocuments: any = async (UUID:any) => {
  const accessToken = store.getState().auth.loginData?.data?.accessToken;
  const patientId = store.getState().profile.profileData?.data?.uuid;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await get(
      `patient-document/patient/${UUID}?page=0&size=10&sort=created%2Cdesc`,
      {headers},
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDocumentTypes: any = async () => {
  const accessToken = store.getState().auth.loginData?.data?.accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await get('document-type/get/all', {headers});
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadDocument: any = async (uploadDocPayload: any) => {
  const accessToken = store.getState().auth.loginData?.data?.accessToken;
  const baseUrl = store.getState().auth?.baseUrl;
  try {
    const response = await fetch(
      `${baseUrl}/patient-document/patient`,
      {
        body: uploadDocPayload,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );
    console.log(' rensponse from uploadDocument=>', response);
    return response;
  } catch (error) {
    console.log('uploadDocument error =>', error);
    throw error;
  }
};

export const createDocumentType: any = async (docTypeName: any) => {
  const accessToken = store.getState().auth.loginData?.data?.accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await post(
      'document-type',
      {type: docTypeName, uuid: ''},
      {headers},
    );
    return response;
  } catch (error) {
    throw error;
  }
};
