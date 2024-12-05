import { ILoginFormValue } from './ILoginFormValue';
import { ISignupFormValue } from './ISignupFormValue';
import { IToken } from './IToken';

export interface IAuth {
  loginFormValue: ILoginFormValue;
  signupFormValue: ISignupFormValue;
  token: IToken;
  refData: IToken;
  // loading: boolean;
  organicUser: boolean;
  role: string;
  baseUrl: string;
  rasabaseUrl: string;
  authbaseUrl: string;
  selectedEnv: string;
  authClientId: string;
  authClientSecret: string;
  connectionState: boolean | null;
  isError : string,
  isFromDeepLink : boolean,
  canclePrompt: any,
  payerPayeeModal: boolean,
  profileApiCall: boolean,
  tempToken: string,
}
