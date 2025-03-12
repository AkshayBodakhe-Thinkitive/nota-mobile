import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {ZoomVideoSdkProvider} from '@zoom/react-native-videosdk';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './redux/store/storeConfig';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state:any) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state:any) => {
      setIsConnected(state.isConnected);
    });
  };

  if (!isConnected) {
    return <NoInternetScreen onRetry={handleRetry} />;
  }

  const pubKey = "pk_test_51QgjuSFyq8hFB20LVDlrM3ZI2RRjIhhv2dERfqTLuOoq3zbYyIfh1Q62duPDimIJeSEMRTdjmRcQkPXg3n3tCC5k00rJI7vX87"
  //const pubKey = "pk_live_51QX0cgFDolZMURpEaCg6tKBKxpGgc41LycSaqv1wXEUGrfh7vdLZ1rTX8WSDkf0UZ1RBDuvZBWGuMbpkY7BEe6mY003e2OjWQF"
  return (
    <StripeProvider publishableKey= {pubKey} setReturnUrlSchemeOnAndroid={true}>
      <Provider store={store}>
        <View style={styles.container}>
          <ZoomVideoSdkProvider
            config={{
              appGroupId: 'group.navala.screenShare',
              domain: 'zoom.us',
              enableLog: true,
            }}>
            <AppNavigator />
          </ZoomVideoSdkProvider>
        </View>
      </Provider>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
