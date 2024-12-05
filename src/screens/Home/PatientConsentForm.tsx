import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Platform, FlatList, Alert, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import Loader from '../../components/Loader/Loader';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomText from '../../components/Text/CustomText';
import {fontType} from '../../assets/fontType';
import SmallButton from '../../components/SmallButton/SmallButton';
import Checkbox from '../../components/CheckBox/CheckBox';
import Row from '../../components/Row/Row';
import { setConsentFormAction } from '../../redux/reducers/home/aysnc-actions/setConsentFormAction';

function PatientConsentForm() {
  const dispatch = useAppDispatch();

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const consentFormData = useAppSelector(
    (state: RootState) => state.home.consentFormData,
  )

  const [isConsentAgree, setIsConsentAgree] = useState(false);
  
  const validateForNull = (str: string) => {
    if (str == null) {
      return '-';
    } else if (str == undefined) {
      return '-';
    } else if (str == '') {
      return '-';
    } else {
      return str;
    }
  };

  const ContentRow = ({str, index}: any) => {
    return(
      <View
       style={{paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row'}}
       >
        <Text style={{fontWeight: 'bold'}}>{index}.</Text>
        <Text style={{color: colors.navala_grey, paddingLeft: Platform.OS == 'android' ? 10 : 4}}>{validateForNull(str)}</Text>
      </View>
    )
  };

  const handleSubmit = () => {
    dispatch(setConsentFormAction({accessToken: loginData?.data?.accessToken}))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient Consent Form</Text>
        <Text
          style={[
            styles.subTitle,
            {paddingTop: Platform.OS == 'android' ? 16 : 10},
          ]}>
          Please completely review the terms and
        </Text>
        <Text style={[styles.subTitle, {paddingBottom: 8}]}>
          conditions below
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 0.5,
          marginVertical: 12,
          backgroundColor: colors.navala_grey,
        }}
      />
      <View style={styles.contentContainer}>
        <FlatList
          contentContainerStyle={[
            {paddingHorizontal: 12, paddingTop: 8, paddingBottom: 16},
          ]}
          data={consentFormData?.data?.formText}
          renderItem={({item, index}) => {
            return (
              <ContentRow str={item} index={index+1} />
            );
          }}
        />
        <TouchableOpacity style={styles.checkboxContainer} onPress={()=>{setIsConsentAgree(!isConsentAgree)}}>
        <Row>
            <FontAwesomeIcon
                name={isConsentAgree ? 'check-square' : 'square-o'}
                size={responsiveFontSize(3)}
                color={isConsentAgree ? colors.primary : colors.grey60}
            />
            <Text style={styles.checkboxTitle}>I agree to terms & conditions</Text>
        </Row>
        </TouchableOpacity>
        <SmallButton title='Submit' onPress={handleSubmit} containerStyle={{width: 120, alignSelf: 'center', marginBottom: 12}} disabled={!isConsentAgree}/>
      </View>
    </SafeAreaView>
  );
}

export default PatientConsentForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  checkboxContainer: {
    width: '100%', 
    paddingVertical: 12, 
    justifyContent: 'center',
    alignSelf:'center'
  },
  checkboxTitle: {
    color: colors.black,
    marginHorizontal: 8,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'gray',
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
    elevation: 3,
  },
  title: {
    top: Platform.OS == 'android' ? 10 : 0,
    paddingVertical: 4,
    color: colors.black,
    fontSize: responsiveFontSize(2.7),
    fontFamily: fontType.Roboto_Regular,
    fontWeight: 'bold',
  },
  subTitle: {
    color: colors.navala_grey,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fontType.Roboto_Regular,
  },
  value: {
    fontSize: responsiveFontSize(1.7),
  },
  safeArea: {height: '100%', width: '90%', alignSelf: 'center'},
});
