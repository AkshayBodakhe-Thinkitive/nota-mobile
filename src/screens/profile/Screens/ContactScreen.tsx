import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {colors} from '../../../assets/colors';
import Card from '../../../components/Card/Card';
import TextInput from '../../../components/TextInput/TextInput';
import {updateFieldValue} from '../../../redux/reducers/profile/ProfileReducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import PhoneWithCountryCode from '../../../components/phonewithcountrycode/PhoneWithCountryCode';

const ContactScreen = () => {
  const demographicsDataToEdit = useAppSelector(
    (state: RootState) => state?.profile?.demographicsData?.address,
  );

  const demographicsDataToEdit2 = useAppSelector(
    (state: RootState) => state?.profile?.demographicsData,
  );

  console.log(demographicsDataToEdit2)

  const dispatch = useAppDispatch();

  const handleInputChange = (key: any, value: any) => {
    dispatch(updateFieldValue({key, value}));
  };

  const [countryCode, setCountryCode] = useState(
    demographicsDataToEdit?.countryCode,
  );

  const handlePhoneChange = (
    newCountryCode: string,
    newPhoneNumber: string,
  ) => {
    handleInputChange('countryCode', newCountryCode);
    handleInputChange('homeNumber', newPhoneNumber);
    setCountryCode(newCountryCode);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : (null as any)}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(22) : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.pageContainer}>
          <Card
            width={'100%'}
            style={{marginBottom: 10, height: null, padding: 10, top: 20}}>
            <View style={{height: 40}}>
              <Text
                style={{color: '#0097F0', fontWeight: 'normal', fontSize: 16}}>
                Contact
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#00000029',
                bottom: 10,
              }}></View>
            <TextInput
              value={demographicsDataToEdit?.line1}
              label="Address Line 1"
              placeholder="Enter Line 1"
              onChangeText={value => handleInputChange('line1', value)}
            />
            <TextInput
              value={demographicsDataToEdit?.line2}
              label="Address Line 2"
              placeholder="Enter Line 2"
              onChangeText={value => handleInputChange('line2', value)}
            />
            <TextInput
              value={demographicsDataToEdit?.zipcode}
              label="Zip Code"
              placeholder="Enter Zip Code"
              onChangeText={value => handleInputChange('zipcode', value)}
            />
            <TextInput
              value={demographicsDataToEdit?.state}
              label="State"
              onChangeText={value => handleInputChange('state', value)}
              placeholder="Enter State"
            />
            <TextInput
              value={demographicsDataToEdit?.country}
              label="Country"
              placeholder="Enter Country"
              onChangeText={value => handleInputChange('country', value)}
            />
            {/* <TextInput
              value={demographicsDataToEdit2?.homeNumber}
              placeholder="Enter Home Number"
              label="Home Number"
              // editable={false}
              onChangeText={value => handleInputChange('homeNumber', value)}
            /> */}
            <PhoneWithCountryCode
              label="Home Number"
              placeholder="Enter Home Number"
              countryCode={countryCode}
              number={demographicsDataToEdit2?.homeNumber}
              onChange={handlePhoneChange}
            />
            {/* <TextInput
              value={demographicsDataToEdit2?.contactNumber}
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              onChangeText={value => handleInputChange('contactNumber', value)}
              editable={false}
            /> */}
            <PhoneWithCountryCode
              label="Mobile Number"
              countryCode={demographicsDataToEdit2?.countryCode}
              number={demographicsDataToEdit2?.contactNumber}
              onChange={() => {}}
              editable={false}
            />
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    padding: '3%',
    marginBottom: responsiveHeight(5),
  },
});
