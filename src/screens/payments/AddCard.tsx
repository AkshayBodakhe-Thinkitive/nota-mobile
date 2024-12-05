import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {WebView} from 'react-native-webview';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {useNavigation} from '@react-navigation/native';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import { colors } from '../../assets/colors';

const AddCard = () => {
  const patientUuid = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const token = useAppSelector((state: RootState) => state.auth.loginData?.data?.accessToken);

  let modifyToken = token?.replace(/\./g, "*");

  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'15%'}>
        <TopNavigationView
          onTap={onPress}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
          isNotificationShow
        />
      </HeaderBg>
      <View style={{flex:1,top:'-1%'}}>
        <WebView
          source={{
            uri: `https://dev.navalaglobal.com/auth/cards/${patientUuid}/eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSld`,
          }}
          style={styles.webview}
        />
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.white
  },
  webview: {
    flex: 1,
  },
});
