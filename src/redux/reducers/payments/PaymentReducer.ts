import {createSlice} from '@reduxjs/toolkit';
import {PAYMENT_REDUCER} from '../../constants/StoreConstants';
import {getCardsAction} from './async-actions/getCardsAction';
import { getPaymentHistoryAction } from './async-actions/getPayHistoryAction';

export const initialState: any = {
  loading: false,
  cardsData: [],
  paymentsHistoryData: null,
};
 const PaymentsReducer = createSlice({
  name: PAYMENT_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCardsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCardsAction.fulfilled, (state, action) => {
        state.cardsData = action.payload;
        state.loading = false;
      })
      .addCase(getCardsAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPaymentHistoryAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPaymentHistoryAction.fulfilled, (state, action) => {
        state.paymentsHistoryData = action.payload;
        state.loading = false;
      })
      .addCase(getPaymentHistoryAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default PaymentsReducer.reducer
