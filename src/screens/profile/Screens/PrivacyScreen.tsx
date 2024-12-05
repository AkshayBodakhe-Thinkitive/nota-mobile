import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import DemographicsCard from '../../medicalRecord/components/demographicsCard/DemographicsCard';
// import RadioButton from '../components/RedioButtonDem';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {colors} from '../../../assets/colors';
import {updateFieldValue} from '../../../redux/reducers/profile/ProfileReducer';
import {editDemographicsAction} from '../../../redux/reducers/profile/async-action/editDemographicsAction';
import {getProfileAction} from '../../../redux/reducers/profile/async-action/getProfileAction';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
// import RadioButton from '../../medicalRecord/components/RedioButtonDem';
import RadioButton from './PrivacyRadioBtn';
import Button from '../../../components/ButtonComponent/ButtonComponent';
const PrivacyScreen = () => {
  const demographicsDataToEdit = useAppSelector(
    (state: RootState) => state?.profile?.demographicsData,
  );
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const navigation = useNavigation();
  const [selectedValues, setSelectedValues] = useState<any>({});
  // const handleValueChange = (key: any, value: any) => {
  //   setSelectedValues((prevState: any) => ({...prevState, [key]: value}));
  // };
  const handleValueChange = (key: any, value: any) => {
    let keyData = 'callConsent';
    switch (key) {
      case 'Consent to Call':
        keyData = 'callConsent';
        break;
      case 'Consent to Message':
        keyData = 'messageConsent';
        break;
      case 'Consent to Email':
        keyData = 'emailConsent';
        break;
      default:
        break;
    }
    dispatch(updateFieldValue({key: keyData, value: value}));
  };

  const PrivacyContentRow = (props: any) => {
    return (
      <View key={props.index} style={styles.row}>
        <Text style={styles.label}>{props.title} : </Text>
        <RadioButton
          label="Yes"
          disabled={false}
          selected={props.isSelected}
          onSelect={(value: any) => {
            handleValueChange(props.title, true);
          }}
        />
        <RadioButton
          label="No"
          disabled={false}
          selected={!props.isSelected}
          onSelect={(value: any) => {
            handleValueChange(props.title, false);
          }}
        />
      </View>
    );
  };

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
        <DemographicsCard bordered title={'Privacy'}>
          <PrivacyContentRow
            title={'Consent to Call'}
            index={1}
            isSelected={demographicsDataToEdit.callConsent}
          />
          <PrivacyContentRow
            title={'Consent to Message'}
            index={2}
            isSelected={demographicsDataToEdit.messageConsent}
          />
          <PrivacyContentRow
            title={'Consent to Email'}
            index={3}
            isSelected={demographicsDataToEdit.emailConsent}
          />
        </DemographicsCard>
      </ScrollView>
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          paddingHorizontal: 15,
          width: '100%',
        }}>
        <Button title="Save" onPress={editDemoSubmit}/>
      </View>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingBottom: responsiveHeight(18),
    marginBottom: responsiveHeight(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  label: {
    marginLeft: '3%',
    width: '40%',
    color: '#1A1A1A80',
    fontSize: responsiveFontSize(1.6),
  },
  scrollView: {
    position: 'absolute',
    top: 20,
    height: '90%',
    width: '100%',
    paddingHorizontal: 15,
    // bottom:0
  },
});
