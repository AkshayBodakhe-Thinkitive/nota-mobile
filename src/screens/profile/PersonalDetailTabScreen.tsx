import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { colors } from '../../assets/colors';
import CustomText from '../../components/Text/CustomText';
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/storeConfig';

const PersonalDetailTabScreen = () => {
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  
  const Capitalize2 = (str: string) => {
    if (!str) return ''; 
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };
  const today = new Date(profileData?.data?.birthDate);
  const month = today.toLocaleString('default', { month: 'long' });
  const day1 = today.getDate();
  const year1 = today.getFullYear();
  const formattedDate =`${day1} ${month.slice(0,3)} ${year1}`;
  const personalDetails = [
    {
      title: 'Contact Number',
      desc: profileData?.data?.contactNumber === null
      ? ''
      : profileData?.data?.contactNumber,
    },
    {
      title: 'Email Id',
      desc: profileData?.data?.email === null
      ? ''
      :profileData?.data?.email,
    },
    {
      title: 'Gender',
      desc: profileData?.data?.gender === null
      ? ''
      : Capitalize2(profileData?.data?.gender),
    },
    {
      title: 'Date Of Birth',
      desc:  profileData?.data?.birthDate === null ? '' : moment(profileData?.data?.birthDate).format('MM/DD/YYYY'),
    },
    {
      title: 'Marital Status',
      desc:  profileData?.data?.maritalStatus === null
      ? ''
      : Capitalize2(profileData?.data?.maritalStatus),
    },
    {
      title: 'Location',
      desc:  profileData?.data?.address === null  || profileData?.data?.address === undefined ? '' :
      (
        (profileData?.data?.address?.line1 == null ? '' : profileData?.data?.address?.line1) +
        ' ' +
        (profileData?.data?.address?.line2 == null ? '' : profileData?.data?.address?.line2) +
        ' ' +
        (profileData?.data?.address?.city == null ? '' : profileData?.data?.address?.city) +
        ' ' +
        (profileData?.data?.address?.state == null ? '' : profileData?.data?.address?.state) +
        ' ' +
        (profileData?.data?.address?.country == null ? '' : profileData?.data?.address?.country) +
        ' ' +
        (profileData?.data?.address?.zipcode == null ? '' : profileData?.data?.address?.zipcode)),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={personalDetails}
        contentContainerStyle={{padding: '2%'}}
        renderItem={({item}) => {
          return (
            <View style={{borderBottomWidth: 1, borderColor: '#00000029',marginHorizontal:10}}>
              <CustomText
                style={{marginVertical: 12}}
                color={colors.navala_grey}
                fontSize={18}>
                {item.title}
              </CustomText>
              <CustomText style={{marginBottom: 10}} fontSize={18}>
                {item.desc}
              </CustomText>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PersonalDetailTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
});
