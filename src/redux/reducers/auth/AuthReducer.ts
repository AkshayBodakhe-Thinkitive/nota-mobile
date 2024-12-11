import {createSlice} from '@reduxjs/toolkit';
import {AUTH_REDUCER} from '../../constants/StoreConstants';
import LogOutPopup from './actions/LogOutPopup';
import clearOtpdata from './actions/clearSendOtp';
import clearVerifyOtp from './actions/clearVerifyOtp';
import ResentAuth from './actions/resetAuth';
import {logoutAction} from './async-actions/logoutAction';
import {refreshTokenAction} from './async-actions/refreshTokenAction';
import {resetPasswordAction} from './async-actions/resetPassword';
import {sendOTPAction} from './async-actions/sendOTPAction';
import {signInAction} from './async-actions/signInAction';
import {signUpAction} from './async-actions/signUpAction';
import {verifyOTPAction} from './async-actions/verifyOTPAction';

export const initialState: any = {
  selectedEnvironment: 'PROD',
  baseUrl: 'https://api.navalaglobal.com/api/master',
  loading: false,
  isSignUp: false,
  signUpData: null,
  error: false,
  isAPICall: false,
  loggedIn: false,
  login: '',
  loginData: null,
  sendotpData: null,
  islogOut: false,
  logOutData: null,
  isotpSend: false,
  newPasswordSet: false,
  otpData: null,
  verifyOTPData: null,
  isOtpVerified: false,
  logoutPopup: false,
  accessToken: null,
  refreshToken: null,
  forgotError: false,
  verifyError: false,
  errorMessage: '',
};

const AuthReducer = createSlice({
  name: AUTH_REDUCER,
  initialState,
  reducers: {
    EnvSetup: (state, action) => {
      state.selectedEnvironment = action.payload;
    },
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
    signIn: (state, action) => {
      state.isSignUp = true;
      state.signUpData = initialState.signUpData;
    },
    login: (state, action) => {
      state.loggedIn = true;
    },
    logout: state => {
      state.loggedIn = false;
      state.loginData = initialState.loginData;
    },
    sendotp: (state, action) => {
      state.isotpSend = false;
      state.otpData = initialState.otpData;
    },
    verifyOtp: (state, action) => {
      state.isOtpVerified = false;
      state.verifyOTPData = initialState.verifyOTPData;
    },
    resetAuth: state => {
      ResentAuth(state);
    },
    logoutPopup: (state, action) => {
      LogOutPopup(state, action);
    },
    clearSendOtpData: (state, action) => {
      clearOtpdata(state, action);
    },
    clearVerifyOtpData: (state, action) => {
      clearVerifyOtp(state, action);
    },
    resetTokens: (state, action) => {
      let accessToken = action.payload.accessToken;
      let refreshToken = action.payload.refreshToken;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    refreshToken: () => {},
    resetErrorMessage: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpAction.pending, (state, action) => {
        state.isSignUp = true;
        state.loading = true;
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.signUpData = action.payload;
        state.isSignUp = true;
        state.loading = false;
        state.isAPICall = true;
        state.errorMessage = '';
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.isSignUpsign = false;
        state.errorMessage =
          action?.error?.message == null
            ? 'Unable to create new patient! Please try again'
            : action?.error?.message;

        // state.isAPICall = true;
      })
      .addCase(signInAction.pending, (state, action) => {
        state.loading = true;
        state.isAPICall = true;
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        if (action?.payload?.code === "UNAUTHORIZED") {
          console.log('error-----')
          state.loading = false;
          state.loginData = null;
          state.loggedIn = false;
        } else {
          state.loginData = action.payload;
          state.loggedIn = true;
          state.loading = false;
          state.isAPICall = true;
          state.login = 'success';
          state.errorMessage = '';
          state.accessToken = action.payload?.accessToken;
          state.refreshToken = action.payload?.refreshToken;
        }
      })
      .addCase(signInAction.rejected, (state, action) => {
        console.log(' login rejected  ');
        state.loading = false;
        state.error = true;
        state.loggedIn = false;
        state.isAPICall = true;
        state.login = 'fail';
        state.errorMessage =
          action?.error?.message == null
            ? 'Unable to sign in! Please try again.'
            : action?.error?.message;
      })
      .addCase(sendOTPAction.pending, (state, action) => {
        state.loading = true;
        state.isotpSend = false;
      })
      .addCase(sendOTPAction.fulfilled, (state, action) => {
        state.sendotpData = action.payload;
        state.loading = false;
        state.isotpSend = true;
      })
      .addCase(sendOTPAction.rejected, (state, action) => {
        state.loading = false;
        state.forgotError = true;
        state.isotpSend = false;
      })
      .addCase(verifyOTPAction.rejected, (state, action) => {
        // state.isOtpVerified = false;
        state.verifyError = true;
      })
      .addCase(verifyOTPAction.fulfilled, (state, action) => {
        state.isOtpVerified = true;
        state.verifyOTPData = action.payload;
        state.loading = false;
      })
      .addCase(verifyOTPAction.pending, (state, action) => {
        // state.isOtpVerified = false;
        state.loading = true;
        // state.verifyError = true
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.newPasswordSet = false;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.newPasswordSet = true;
        state.loading = false;
      })
      .addCase(resetPasswordAction.pending, (state, action) => {
        state.newPasswordSet = false;
        state.loading = true;
      })
      .addCase(logoutAction.pending, (state, action) => {
        // state.loading = true;\
        state.loggedIn = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.loginData = initialState.loginData;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = true;
        state.loggedIn = true;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      });
  },
});

export const {
  EnvSetup,
  logout,
  resetAuth,
  logoutPopup,
  clearSendOtpData,
  sendotp,
  login,
  refreshToken,
  resetTokens,
  clearVerifyOtpData,
  verifyOtp,
  resetErrorMessage,
  setBaseUrl,
} = AuthReducer.actions;
export default AuthReducer.reducer;
