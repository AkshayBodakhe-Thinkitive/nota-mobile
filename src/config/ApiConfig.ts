
import { Alert } from "react-native"
import { instance, post } from "./AxiosConfig"
import { logoutAction } from "../redux/reducers/auth/async-actions/logoutAction"

export function addTokenToAxiosInstance(
  store: any,
) {


instance.interceptors.request.use(
  async (config) => {

   

    // console.log("api config accessToken--> ",accessToken)
   
    try {
      // config.headers.Authorization = accessToken  ? `Bearer ${accessToken}` : null
    } catch (error) {

    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
)


instance.interceptors.response.use(
  (response) => {
    // console.log("axios response", response)
    return response;
  },
  (error) => {
    const accessToken =  store.getState().auth?.loginData?.data?.accessToken
    const refreshToken =  store.getState().auth?.loginData?.data?.refreshToken
    console.log("axios error", JSON.stringify(error))
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
         store.dispatch(logoutAction({accessToken,refreshToken}));
        // Alert.alert('Alert!','Session expired!',[{
        //   text: 'OK',
        //   onPress: () => {
        //     store.dispatch(logoutAction({accessToken,refreshToken}));
        //   },
        // }])
        // store.dispatch(resetReducer());
        // store.dispatch(resetAvailabilityReducer());
        // navigateToLogin()
      }
    }
    return Promise.reject(error);
  }
);
}