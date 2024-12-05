import { useNavigation } from '@react-navigation/core';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { fontType } from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import { getMemberAction } from '../../../redux/reducers/member/async-action/getMembersAction';
import {
  resetMember,
  resetMembersData,
  setIsEditMember,
  setMemberPayloadToEdit,
} from '../../../redux/reducers/member/memberReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/storeConfig';
import MemberListItem from '../components/memberListItem';
import { MemberScreenStyle as styles } from '../styles/memberScreenStyle';
import { setUUIDForMedicalRecords } from '../../../redux/reducers/medicalrecord/medicalRecordReducer';
import Button from '../../../components/ButtonComponent/ButtonComponent';

const MemberListScreen = () => {
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const membersData = useAppSelector(
    (state: RootState) => state.member.membersData,
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.member.isLoading,
  );
  const isEditMember = useAppSelector(
    (state: RootState) => state.member.isEditMember,
  );

  const Dispatch = useAppDispatch();
  const route = useRoute<any>();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<any>();

  const [listTopMargin, setlistTopMargin] = useState(5);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isEditMember) {
      return;
    }
    let data = {
      page: 0,
      searchString: searchText,
    };
    setPageNumber(1);
    Dispatch(resetMembersData());
    Dispatch(getMemberAction(data));
  }, [isFocused]);

  const onSearch = (txt: string) => {
    setSearchText(txt);
  };
  useEffect(() => {
    if (searchText == '') {
      return;
    }
    let data = {
      page: 0,
      searchString: searchText,
    };
    setPageNumber(1);
    Dispatch(resetMembersData());
    Dispatch(getMemberAction(data));
  }, [searchText]);
  const onTapEditMember = (member: any) => {
    Dispatch(setIsEditMember(true));
    Dispatch(setMemberPayloadToEdit(member));
    console.log('Edit Member: ', member);
    navigation.navigate('AddMemberScreen', {isBack: true});
  };

  useEffect;
  const goBack = () => {
    navigation.pop();
  };

  const onTapNotification = () => {
    navigation.navigate('NotificationSc');
  };

  const onTapDetails = (item: any) => {
    Dispatch(setUUIDForMedicalRecords(item.uuid))
    navigation.navigate('MedicalRecordsMenu', {isBack: true});
  };

  const onTapAddMemberButton = () => {
    Dispatch(setIsEditMember(false));
    Dispatch(resetMember());
    navigation.navigate('AddMemberScreen');
  };

  const fetchPagedMembers = () => {
    if (!membersData?.data?.last) {
      if (pageNumber < membersData?.data?.totalPages) {
        let page = pageNumber + 1;
        setPageNumber(page);
        console.log('Page Number updated:', pageNumber);
        let data = {
          page: pageNumber,
          searchString: searchText,
        };
        Dispatch(getMemberAction(data));
      }
    }
  };

  // console.log("membersData===>",JSON.stringify(membersData))

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '16%'}>
        <TopNavigationView
          title="Members"
          onTap={goBack}
          onTapNotification={onTapAddMemberButton}
          source1={ImagePath1.backImage}
          source2={ImagePath1.plusImg}
          isbuttonshow={true}
          isSource2ResizeToContain={true}
        />
      </HeaderBg>
      <View
        style={{
          marginTop: Platform.OS == 'ios' ? listTopMargin + 5 : listTopMargin,
          paddingHorizontal: 10,
          marginBottom: 0,
          flex: 1,
        }}>
          <View style={{width:'100%',alignItems:'flex-end'}}>
              <Button outlined buttonStyle={{width:'40%'}} title='+ Add member' onPress={onTapAddMemberButton}/>
          </View>
        {membersData?.data?.empty === false ? (
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={fetchPagedMembers}
            data={membersData?.data?.content}
            renderItem={({item, index}) => {
              return (
                <MemberListItem
                  image={item?.image}
                  name={`${item?.legalFirstName + ' ' + item?.legalLastName}`}
                  address={`${item?.address === null ? '' : item?.address}`}
                  relation={item?.familyMemberRelation}
                  gender={item?.gender}
                  email={item?.email}
                  contactNumber={item?.email}
                  onPressDetails={() => onTapDetails(item)}
                  onPressEdit={() => onTapEditMember(item)}
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
                // fontWeight: 20,
                color: 'black',
              }}>
              No members for the patient
            </Text>
          </View>
        )}
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default MemberListScreen;
