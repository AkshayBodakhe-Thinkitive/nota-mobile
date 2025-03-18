/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

const Main = () => {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      );
    };

AppRegistry.registerComponent(appName, () => Main);
