import { createSlice } from '@reduxjs/toolkit';
import {ZOOM_REDUCER } from '../../constants/StoreConstants';
import { getZoomTokenAction } from './async-action/getZoomTokenAction';
import { getPermissionToJoinVideoCall } from './async-action/getPermissionToJoinVideoCall';
import clearZoomTokenDataAction from './action/clearZoomTokenDataAction';
import { submitRatingAction } from './async-action/ratingProviderAction';
import { getTopRatedProviderAction } from './async-action/getTopRatedProviderAction';

export const initialState: any = {
  zoomData: null,
  ratingData: null,
  loading: false,
  topRatedProviderData: null,
};

const ZoomReducer = createSlice({
  name: ZOOM_REDUCER,
  initialState,
  reducers: {
    clearZoomTokenData: state => {
      clearZoomTokenDataAction(state);
    },
    setIsLoader: (state, action) => {
        state.loading = action.payload
      },
  },
  extraReducers: builder => {
    builder
      .addCase(getZoomTokenAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getZoomTokenAction.fulfilled, (state, action) => {
        state.zoomData = action.payload;
        console.log('getZoomTokenAction.fulfilled');
        state.loading = false;
      })
      .addCase(getZoomTokenAction.rejected, (state, action) => {
        console.log('getZoomTokenAction.rejected');
        
        state.loading = false;
        state.error = true;
      })
      .addCase(getPermissionToJoinVideoCall.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPermissionToJoinVideoCall.fulfilled, (state, action) => {
        //Check
        let payload = action.payload
        if (action.payload == null) {
            state.loading = false;
        }
      })
      .addCase(getPermissionToJoinVideoCall.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(submitRatingAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(submitRatingAction.fulfilled, (state, action) => {
        state.ratingData = action.payload
        state.loading = false
      })
      .addCase(submitRatingAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }) .addCase(getTopRatedProviderAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTopRatedProviderAction.fulfilled, (state, action) => {
        state.topRatedProviderData = action.payload
        state.loading = false
      })
      .addCase(getTopRatedProviderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
    clearZoomTokenData,
    setIsLoader
} = ZoomReducer.actions;
export default ZoomReducer.reducer;
//getPastAppointmentAction
