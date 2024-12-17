import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getStore} from '../redux/store/storeConfig';

// export let BASE_URL = 'https://dev.api.navalaglobal.com/api/master';
//https://dev-api-thinkemr.telapractice.com/api/master
// https://dev.api.navalaglobal.com

const envData = getStore().getState().auth.selectedEnvironment;

const BASE_URLData = () => {
  let BASE_URL = 'https://dev.api.navalaglobal.com/api/master';
  switch (envData) {
    case 'PROD':
      BASE_URL = 'https://api.navalaglobal.com/api/master';
      break;
    case 'DEV':
      BASE_URL = 'https://dev.api.navalaglobal.com/api/master';
      break;
    case 'QA':
      BASE_URL = 'https://qa.api.navalaglobal.com/api/master';
      break;
    default:
      BASE_URL = 'https://dev.api.navalaglobal.com/api/master';
      break;
  }
  return BASE_URL;
};

export {BASE_URLData};

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URLData(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 16000,
});

const get = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.get(url, config).then(({data}) => {
    return data;
  });
  const post2 = <D, R>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<R> =>
    instance.post(url, data, config).then((res: any) => {
      return res?.data;
    });

const post = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> =>
  instance
    .post(url, data, config)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('error ==>', error);
      // return error;
      throw new Error(error);
    });

const put = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> =>
  instance.put(url, data, config).then(({data}) => {
    return data;
  });

const _delete = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.delete(url, config).then(({data}) => data);

const patch = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> => instance.patch(url, data, config).then(({data}) => data);

export {_delete, get, instance, patch, post, put,post2};
