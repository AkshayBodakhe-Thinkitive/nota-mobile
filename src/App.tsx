import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {ZoomVideoSdkProvider} from '@zoom/react-native-videosdk';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import {store} from './redux/store/storeConfig';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './screens/NoInternetScreen';

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


  return (
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
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
