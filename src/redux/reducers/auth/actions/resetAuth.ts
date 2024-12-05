import { initialState } from '../AuthReducer';

const ResentAuth = (state: any) => {
  state.loading = initialState.loading;
  state.isSignUp = initialState.isSignUp;
  state.signUpData = initialState.signUpData;
  state.error = initialState.error;
  state.isAPICall = initialState.isAPICall;
  state.loggedIn = initialState.loggedIn;
  state.loginData = initialState.loginData;
  state.sendotpData = initialState.sendotpData;
  state.islogOut = initialState.islogOut;
  state.logOutData = initialState.logOutData;
  state.isotpSend = initialState.isotpSend;
  state.otpData = initialState.otpData;
  state.logoutPopup = initialState.logoutPopup;
  state.accessToken = initialState.accessToken;
  state.refreshToken = initialState.refreshToken;
  state.login = initialState.login;
  state.newPasswordSet = initialState.newPasswordSet;
  state.forgotError = initialState.forgotError;
  state.isOtpVerified = initialState.isOtpVerified;
  state.verifyError = initialState.verifyError;
  state.verifyOTPData = initialState.verifyOTPData;
  state.errorMessage = initialState.errorMessage;
  return state;
};

export default ResentAuth;
