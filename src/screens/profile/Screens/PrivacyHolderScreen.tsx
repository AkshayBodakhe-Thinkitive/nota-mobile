import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { colors } from '../../../assets/colors'
import Card from '../../../components/Card/Card'
import TextInput from '../../../components/TextInput/TextInput'
import { editDemographicsAction } from '../../../redux/reducers/profile/async-action/editDemographicsAction'
import { getProfileAction } from '../../../redux/reducers/profile/async-action/getProfileAction'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { RootState } from '../../../redux/store/storeConfig'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
const PrivacyHolderScreen = (

) => {
    const navigation = useNavigation();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const dispatch = useAppDispatch();
  const editDemoSubmit = () => {
    dispatch(editDemographicsAction())
      .then(() => {
        dispatch(
          getProfileAction({
            accessToken: loginData?.data?.accessToken,
          }),
        );
      })
      .then(() => {
        Toast.show('Demographic details update successfully', 2);
        navigation.goBack();
      });
  };
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>
      {/* <Card></Card> */}
      <Card
        width={'100%'}
        style={{marginBottom: 10, height: null, padding: 10, top: 20}}>
        <View style={{height: 40}}>
          <Text style={{color:'#0097F0',fontWeight:'normal',fontSize:16}}>Policy Holder</Text>
        </View>
        <View
           style={{height: 1, width: '100%', backgroundColor: '#00000029',bottom:10}}></View>
        <TextInput
          // value={username}
          placeholder="Enter Entity Type"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter Policy Holder Id/Certification No"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter Last Name"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
         <TextInput
          // value={username}
          placeholder="Enter First Name"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
         <TextInput
          // value={username}
          placeholder="Enter Middle Name, Suffix"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
         <TextInput
          // value={username}
          placeholder="Enter Line 1"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter Line 2"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
         <TextInput
          // value={username}
          placeholder="Enter Zip Code"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter State"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter Country"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter SSN Number"
          keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Enter Legal Sex"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Ethinicity"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Ethinicity"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Race"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />
        <TextInput
          // value={username}
          placeholder="Sexual Orientiation"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />

<TextInput
          // value={username}
          placeholder="Gender Identity"
          // keyboardType="email-address"
          // onChangeText={value => handleChange('username', value)}
          // isValid={errors.username}
          // onBlur={() => handleBlur('username')}
        />       
        </Card>
    </ScrollView>
    <View
        style={{
          height: '10%',
          width: '100%',
          // backgroundColor: 'pink',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: '80%',
            width: '90%',
            backgroundColor: '#0097F0',
            position: 'absolute',
            top: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={editDemoSubmit}>
          <Text
            style={{
              color: 'white',
              top: '30%',
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

export default PrivacyHolderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: responsiveHeight(8),
    marginBottom: responsiveHeight(3),
  },
  scrollView: {
    position: 'absolute',
    top: 20,
    height: '98%',
    width: '100%',
    paddingHorizontal: 15,
  },
});
