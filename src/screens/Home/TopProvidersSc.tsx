import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {fontType} from '../../assets/fontType';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import {FlatList} from 'react-native';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {getTopRatedProviderAction} from '../../redux/reducers/zoom/async-action/getTopRatedProviderAction';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';
import {RefreshControl} from 'react-native';
import {GetProviderByUuid} from '../../redux/reducers/home/aysnc-actions/GetProviderByUuid';
import {resetproviderDataUuid} from '../../redux/reducers/home/HomeReducer';
import StarRating from '../../components/StarRating/StarRating';
import { validateStringForNull } from '../../common/Helper';

function TopProvidersSc(routes: any) {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const topRatedProviders = useAppSelector(
    (state: RootState) => state.zoom.topRatedProviderData,
  );
  const [selectedProvider, setSelectedProvider] = useState(null);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const isLoading = useAppSelector((state: RootState) => state.zoom.loading);
  const homeLoading = useAppSelector((state: RootState) => state.home.loading);

  const loading = isLoading || homeLoading;
  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  const providerData = useAppSelector(
    (state: RootState) => state.home.providerDataUuid?.data,
  );

  useEffect(() => {
    if (providerData !== null) {
      dispatch(resetproviderDataUuid());
    }
  }, [isFocused]);

  useEffect(() => {
    if (providerData && selectedProvider) {
      navigation.navigate('bookappointment', {providerData, selectedProvider});
    }
  }, [providerData,selectedProvider]);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      fetchTopRatedProviders();
    }
  }, [loginData?.data?.accessToken]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTopRatedProviders();
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  const fetchTopRatedProviders = () => {
    console.log('getTopRatedProvider API call');
    let data = {
      accessToken: loginData?.data?.accessToken,
      page: 0,
    };
    setPageNumber(1);
    dispatch(getTopRatedProviderAction(data));
  };

  const fetchPagedProviders = () => {
    console.log('fetchPagedProviders:');
    if (!topRatedProviders?.data?.last) {
      if (pageNumber < topRatedProviders?.data?.totalPages) {
        let pageCnt = pageNumber + 1;
        setPageNumber(pageCnt);
        console.log('Page Number updated:', pageNumber);
        let data = {
          accessToken: loginData?.data?.accessToken,
          page: pageCnt,
        };
        dispatch(getTopRatedProviderAction(data));
      }
    }
  };


  const getFormatedDate = (date: any) => {
    if (date == '' || date == null || date == undefined) {
      return '-';
    } else {
      return `${moment(date).format('MM/DD/YYYY')}`;
    }
  };

  const getSpecialityStr = (specialityArray: any) => {
    if (specialityArray == undefined || specialityArray == null) {
      return '-';
    } else {
      if (specialityArray?.length == 1) {
        return validateStringForNull(specialityArray?.[0]?.name);
      } else if (specialityArray?.length > 1) {
        return 'Multispecialist';
      } else {
        return '-';
      }
    }
  };

  const ProviderCard = (item: any) => {
    let data = item?.item;
    return (
      <View style={[styles.providerCardContainer, styles.shadow]}>
        <Image
          source={
            data?.provider?.avatar === null
              ? ImagePath1.profileDefault
              : {
                  uri: data?.provider?.avatar,
                }
          }
          style={styles.providerImgStyle}
        />
        <View style={{width: '70%'}}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#1A1A1A',
                fontFamily: fontType.Roboto_Medium,
                fontSize: 16,
              }}>
              {data?.provider?.firstName} {data?.provider?.lastName}
            </Text>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() => {
                setSelectedProvider(data?.provider);
                dispatch(
                  GetProviderByUuid({
                    id: data?.provider?.providerGroup,
                    accessToken: loginData?.data?.accessToken,
                  }),
                );
              }}>
              <Text style={{padding: 5, color: '#FFFFFF'}}>Book</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{flexDirection: 'row', paddingBottom: 8}}>
              <StarRating value={data?.averageRating} disabled/>
            </View>
            <Text
              style={{
                color: colors.navala_grey,
                fontSize: 10,
                fontFamily: fontType.Roboto_Regular,
              }}>
              {getSpecialityStr(data?.provider?.specialities)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '16%'}>
        <TopNavigationView
          title="Top Providers"
          onTap={goBack}
          onTapNotification={() => {}}
          source1={ImagePath1.backImage}
          source2={null}
          isbuttonshow={true}
          isSource2ResizeToContain={true}
        />
      </HeaderBg>
      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: 0,
          flex: 1,
        }}>
        {topRatedProviders?.data?.empty === false ? (
          <FlatList
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={fetchPagedProviders}
            data={topRatedProviders?.data?.content}
            renderItem={({item, index}) => {
              return <ProviderCard item={item} />;
            }}
          />
        ) : (
          <View style={{height: 100, width: '100%'}}>
            <Text
              style={{
                top: 50,
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                // fontWeight: 20,
                color: 'black',
              }}>
              No Providers
            </Text>
          </View>
        )}
      </View>
      {loading && <Loader />}
    </View>
  );
}

export default TopProvidersSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  providerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },
  bookBtn: {
    backgroundColor: colors.app_color1,
    height: 30,
    width: '30%',
    borderRadius: 5,
    marginVertical: 3,
    alignItems: 'center',
  },
  providerImgStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 8,
  },
  star: {
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },
  safeArea: {height: '100%', width: '90%', alignSelf: 'center'},
});
