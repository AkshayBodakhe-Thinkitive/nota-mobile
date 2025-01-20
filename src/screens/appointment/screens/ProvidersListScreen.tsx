import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Platform, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../../assets/colors';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import {Ionicons} from '../../../components/Icons/Ionicons';
import Loader from '../../../components/Loader/Loader';
import TextInput from '../../../components/TextInput/TextInput';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {getProviderListAction} from '../../../redux/reducers/home/aysnc-actions/getProviderListAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import ProviderListItem from '../components/ProviderListItem';
import {ProviderListstyles as styles} from '../styles/ProviderListStyles';
import {Text} from 'react-native';
import {fontType} from '../../../assets/fontType';
import {resetproviderDataUuid} from '../../../redux/reducers/home/HomeReducer';
import { useRoute } from '@react-navigation/native';

const ProvidersListScreen = ({navigation}: any) => {
  const providerData = useAppSelector((state: RootState) =>
    state.home.providerDataUuid != null
      ? state.home.providerDataUuid
      : state.home.providerData,
  );
  const flatListRef = useRef(null);
  const lodaing = useAppSelector((state: RootState) => state.home.loading);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [size, setSize] = useState(30);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [listTopMargin, setlistTopMargin] = useState(5);
  const [notification, setNotification] = useState(false);
  const providersData = JSON.stringify(providerData);

  console.log("providersData====>",providersData)

  const renderFooter = () => {
    if (lodaing) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }
    return null;
  };

  const route = useRoute<any>();

  const inputRef = useRef<any>();

  useEffect(() => {
    if (route?.params) {
      const {focusOnSearch} = route?.params;
      focusOnSearch === true && inputRef?.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (loginData?.data?.accessToken) {
      dispatch(
        getProviderListAction({
          accessToken: loginData?.data?.accessToken,
          page: page,
          size: size,
          searchString: searchText,
          status: '',
        }),
      );
    }
  }, [loginData?.data?.accessToken, searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (page === 1) {
      flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
    }
  }, [page]);

  const fetchData = async () => {
    setSize(size + 10);
    setPage(page + 1);

    dispatch(
      getProviderListAction({
        accessToken: loginData?.data?.accessToken,
        page: page,
        size: size,
        searchString: searchText,
        status: '',
      }),
    );
    // setLoading(false);
  };
  const goBack = () => {
    navigation.pop();
  };
  const onTapNotification = () => {
    navigation.navigate('NotificationSc');
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? responsiveHeight(15) : responsiveHeight(23)}>
        <TopNavigationView
          title="Clinics"
          onTap={goBack}
          onTapNotification={onTapNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
        <View style={{paddingHorizontal: responsiveWidth(4)}}>
          <TextInput
            placeholder="Search clinic name"
            ref={inputRef}
            leftIcon={
              <Ionicons
                name={'search'}
                color={colors.grey70}
                style={{fontSize: responsiveFontSize(3)}}
              />
            }
            onChangeText={handleSearch}
            onTouchStart={() => {
              if (Platform.OS == 'android') {
                setlistTopMargin(45);
              }
            }}
            onEndEditing={() => {
              if (Platform.OS == 'android') {
                setlistTopMargin(5);
              }
            }}
          />
        </View>
      </HeaderBg>
      <View
        style={{
          padding: 10,
          marginBottom: 0,
          flex: 1,
        }}>
        {providerData?.data?.empty === false ? (
          <FlatList
            data={providerData?.data?.content}
            ref={flatListRef}
            renderItem={({item, index}) => {
                
              return (
                <ProviderListItem
                  providerData={item}
                  // loading={lodaing}
                  image={item?.avatar}
                  name={item?.name}
                  address={
                    item?.physicalAddress?.city +
                    ' ' +
                    item?.physicalAddress?.country
                  }
                  contact={item?.phone}
                  portalName={item?.portalName}
                  ></ProviderListItem>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={fetchData} 
            onEndReachedThreshold={0.5}
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
              No Data Available
            </Text>
          </View>
        )}
      </View>
      {lodaing && <Loader />}
    </View>
  );
};

export default ProvidersListScreen;
