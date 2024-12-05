import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../store/storeConfig';
import {PAYMENT_REDUCER} from '../../../constants/StoreConstants';
import {PaymentService} from '../services/PayementsService';

export const makePaymentAction = createAsyncThunk<any, any, {state: RootState}>(
  PAYMENT_REDUCER + '/payment-history',
  async ({appointmentUuid, card, amount, paymentStatus}, thunkApi) => {
    const accessToken = thunkApi.getState().auth.loginData?.data?.accessToken;
    const response = await PaymentService.makePayement(
      accessToken,
      appointmentUuid,
      card,
      amount,
      paymentStatus,
    );
    return response;
  },
);
