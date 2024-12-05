import {createAsyncThunk} from '@reduxjs/toolkit';
import {HomeService} from '../service/HomeService';
import {RootState} from '../../../store/storeConfig';
import {HOME_REDUCER} from '../../../constants/StoreConstants';

export const GetProviderByUuid = createAsyncThunk<any, any, {state: RootState}>(
  HOME_REDUCER + '/provider/uuid/',
  async ({id, accessToken}, thunkApi) => {
    const response = await HomeService.GetProviderGroupUuid({
      id,
      accessToken,
    });

    return response;
  },
);
