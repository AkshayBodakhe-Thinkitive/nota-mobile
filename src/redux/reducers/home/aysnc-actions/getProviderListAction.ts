import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOME_REDUCER } from '../../../constants/StoreConstants';
import { RootState } from '../../../store/storeConfig';
import { HomeService } from '../service/HomeService';

export const getProviderListAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>(
  HOME_REDUCER + '/provider-group/all',
  async ({accessToken, page,size,searchString,status}, thunkApi) => {
    // console.log('searchString',searchString,'page',page,'size',size);
   
    const response = await HomeService.getproviderList(accessToken,page,size,searchString);
    return response;
  },
);
