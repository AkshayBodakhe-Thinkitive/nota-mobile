import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getStore, store} from '../redux/store/storeConfig';

const BASE_URL_DEV = 'https://dev.api.navalaglobal.com/api/master';
const BASE_URL_QA = 'https://qa.api.navalaglobal.com/api/master';
const BASE_URL_PROD ='https://api.navalaglobal.com/api/master';


const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 16000,
});


export const envChangerFunction = (type: string) => {
  // console.log('Env======>',type)
  instance.defaults.baseURL = type;
  // switch (type) {
  //   case 'DEV':
  //     instance.defaults.baseURL = BASE_URL_DEV;
  //     break;
  //   case 'QA':
  //     instance.defaults.baseURL = BASE_URL_QA;
  //     break
  //   case 'PROD':
  //     instance.defaults.baseURL = BASE_URL_PROD;
  // }
};

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
      // console.log('error ==>', error);
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
