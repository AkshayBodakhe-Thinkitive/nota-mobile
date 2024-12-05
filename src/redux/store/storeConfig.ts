import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { persistedReducer } from './persistConfig';

export const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({serializableCheck: false}).concat(thunk),
  });

  return store;
};

const store = createStore();

const persistor = persistStore(store);
export const getStore = () => {
  return store;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

export { persistor, store };

