import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {fontType} from '../../assets/fontType';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import {FlatList} from 'react-native';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import Loader from '../../components/Loader/Loader';
import {getConsultedProvidersAction} from '../../redux/reducers/home/aysnc-actions/getConsultedProvidersAction';
import ConsultedProviderCard from './ConsultedProviderCard';
import { RefreshControl } from 'react-native';

const ConsultedProvidersSc = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const consultedProvidersData = useAppSelector(
    (state: RootState) => state.home.consultedProvidersData,
  );
  const providerData = useAppSelector(
    (state: RootState) => state.home.providerDataUuid?.data,
  );
  const [selectedProvider, setSelectedProvider] = useState(null);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const isLoading = useAppSelector((state: RootState) => state.home.loading);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
        fetchConsultedProviders()
    }
  }, [loginData?.data?.accessToken]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchConsultedProviders()
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  const fetchConsultedProviders = () => {
    console.log('getConsultedProviders API called');
    let data = {
      accessToken: loginData?.data?.accessToken,
      patientId: profileData?.data?.uuid,
      page: 0,
    };
    setPageNumber(1);
    dispatch(getConsultedProvidersAction(data));
  }

  const fetchPagedProviders = () => {
    console.log('fetchPagedProviders:');
    if (!consultedProvidersData?.data?.last) {
      if (pageNumber < consultedProvidersData?.data?.totalPages) {
        let pageCnt = pageNumber + 1;
        setPageNumber(pageCnt);
        console.log('Page Number updated:', pageNumber);
        let data = {
          accessToken: loginData?.data?.accessToken,
          patientId: profileData?.data?.uuid,
          page: pageCnt,
        };
        dispatch(getConsultedProvidersAction(data));
      }
    }
  };

  const goBack = () => {
    navigation.pop();
  };

  const consultedProviderLenght = consultedProvidersData?.data?.content.length;

  const selectedProviderData = (data: any) => {
    setSelectedProvider(data);
  };

  useEffect(() => {
    
    if (providerData) {
      navigation.navigate('bookappointment', {providerData, selectedProvider});
    }
  }, [providerData]);

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '16%'}>
        <TopNavigationView
          title="Consulted Providers"
          onTap={goBack}
          onTapNotification={() => {}}
          source1={ImagePath1.backImage}
          source2={null}
          isbuttonshow={true}
          isSource2ResizeToContain={true}
        />
      </HeaderBg>

      {consultedProvidersData?.data?.content?.length > 0 ? (
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={fetchPagedProviders}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={[{paddingHorizontal: 16}]}
          data={consultedProvidersData?.data?.content}
          renderItem={({item, index}) => {
            return (
              <ConsultedProviderCard
                name={`${item?.firstName} ${item?.lastName}`}
                providerImage={item?.avatar}
                specialities={item?.specialities}
                visitDate={item?.visitDate}
                data={
                    consultedProvidersData?.data?.content?.[
                      consultedProviderLenght - 1
                    ]
                  }
                selectedData={selectedProviderData}
                accessToken={loginData?.data?.accessToken}
              />
            );
          }}    
        />
      ) : (
        <View style={{height: 100, width: '100%'}}>
          <Text
            style={{
              top: 50,
              alignSelf: 'center',
              fontFamily: fontType.Roboto,
              fontWeight: '500',
              color: 'black',
            }}>
            No Providers
          </Text>
        </View>
      )}
      {isLoading && <Loader />}
    </View>
  );
};

export default ConsultedProvidersSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },

  safeArea: {height: '100%', width: '90%', alignSelf: 'center'},
});
