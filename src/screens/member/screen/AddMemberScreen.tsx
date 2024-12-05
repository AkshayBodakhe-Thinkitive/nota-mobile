import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../assets/colors';
import {fontType} from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import Card from '../../../components/Card/Card';
import CustomDateTextField from '../../../components/CustomDateField';
import DropdownComponent from '../../../components/Dropdown/DropDown';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import Loader from '../../../components/Loader/Loader';
import Row from '../../../components/Row/Row';
import TextInput from '../../../components/TextInput/TextInput';
import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {MemberInputs1} from '../../../Constants1/inputfieldConstants1';
import {AppState} from '../../../redux/interfaces/AppState';
import {addMemberAction} from '../../../redux/reducers/member/async-action/addMemberAction';
import {
  hideMemberMessage,
  setIsEditMember,
  setMemberInputs,
} from '../../../redux/reducers/member/memberReducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';
import RadioButton from '../../medicalRecord/components/RedioButtonDem';
import {editMemberAction} from '../../../redux/reducers/member/async-action/editMemberAction';
import {MemberScreenStyle} from '../styles/memberScreenStyle';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const AddMemberScreen = () => {
  const navigation = useNavigation<any>();
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const isEditMember = useAppSelector(
    (state: RootState) => state.member.isEditMember,
  );
  const Dispatch = useAppDispatch();
  const memberDetails = useAppSelector(
    (state: RootState) => state.member.memberPayload,
  );
  const isShowMessage = useAppSelector(
    (state: AppState) => state.member.isShowMessage,
  );
  const toastMessage = useAppSelector(
    (state: AppState) => state.member.message,
  );
  const isLoading = useAppSelector((state: AppState) => state.member.isLoading);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const familyMemberRelData = [
    {label: 'Spouse', value: 'SPOUSE'},
    {label: 'Parent', value: 'PARENT'},
    {label: 'Child', value: 'CHILD'},
    {label: 'Sibling', value: 'SIBLING'},
    {label: 'Other', value: 'OTHER'},
  ];

  useEffect(() => {
    console.log('Change:', isShowMessage, 'messgae:', toastMessage);
    if (isShowMessage) {
      Alert.alert(toastMessage, '', [
        {
          text: 'OK',
          onPress: () => {
            Dispatch(hideMemberMessage());
            if (toastMessage.includes('successfully')) {
              goBack();
            }
          },
        },
      ]);
    }
  }, [isShowMessage]);

  const goBack = () => {
    Dispatch(setIsEditMember(false));
    navigation.pop();
  };

  const handleBlur = (fieldName: string) => {
    console.log('Handle blur for:', fieldName);
    if (fieldName == MemberInputs1.fName) {
      if (!memberDetails.firstName) {
        setErrors({...errors, firstName: 'First name is required'});
      } else {
        setErrors({...errors, firstName: ''});
      }
    } else if (fieldName == MemberInputs1.lName) {
      if (!memberDetails.lastName) {
        setErrors({...errors, lastName: 'Last Name is required'});
      } else {
        setErrors({...errors, lastName: ''});
      }
    } else if (fieldName == MemberInputs1.phone) {
      if (memberDetails.phone != '' && memberDetails.phone.length != 10) {
        setErrors({...errors, phone: 'Enter valid number'});
      } else {
        setErrors({...errors, phone: ''});
      }
    } else if (fieldName == MemberInputs1.email) {
      if (memberDetails.email != '' && !isValidEmail(memberDetails.email)) {
        setErrors({...errors, email: 'Invalid Email'});
      } else {
        setErrors({...errors, email: ''});
      }
    } else if (fieldName == MemberInputs1.gender) {
      if (!memberDetails.gender) {
        setErrors({...errors, gender: 'Gender is required'});
      } else {
        setErrors({...errors, gender: ''});
      }
    } else if (fieldName == MemberInputs1.familyMemberRelation) {
      if (!memberDetails.familyMemberRelation) {
        setErrors({
          ...errors,
          familyMemberRelation: 'Family member relation is required',
        });
      } else {
        setErrors({...errors, familyMemberRelation: ''});
      }
    } else if (fieldName == MemberInputs1.emergContactRelation) {
      if (!memberDetails.emergContactRelation) {
        setErrors({
          ...errors,
          emergContactRelation: 'Emergency contact relation is required',
        });
      } else {
        setErrors({...errors, emergContactRelation: ''});
      }
    } else if (fieldName == MemberInputs1.emergContactNumber) {
      if (
        memberDetails.emergContactNumber != '' &&
        memberDetails.emergContactNumber.length != 10
      ) {
        setErrors({
          ...errors,
          emergContactNumber: 'Enter valid emergency contact number',
        });
      } else {
        setErrors({...errors, emergContactNumber: ''});
      }
    } else if (fieldName == MemberInputs1.emergContactEmail) {
      if (!memberDetails.emergContactRelation) {
        setErrors({
          ...errors,
          emergContactEmail: 'Emergency contact email is required',
        });
      } else {
        setErrors({...errors, emergContactEmail: ''});
      }
    }
  };

  const isValidAllFields = () => {
    if (memberDetails.email != '' && !isValidEmail(memberDetails.email)) {
      setErrors({...errors, email: 'Valid email is required'});
      return {value: 'Valid email is required', isError: true};
    }
    if (!memberDetails.firstName) {
      setErrors({...errors, firstName: 'First name is required'});
      return {value: 'First name is required', isError: true};
    }
    if (!memberDetails.lastName) {
      setErrors({...errors, lastName: 'Last name is required'});
      return {value: 'Last name is required', isError: true};
    }
    if (memberDetails.phone != '' && memberDetails.phone.length != 10) {
      setErrors({...errors, phone: 'Valid phone number is required'});
      return {value: 'Valid phone number is required', isError: true};
    }
    if (!memberDetails.familyMemberRelation) {
      setErrors({
        ...errors,
        familyMemberRelation: 'Family member relation is required',
      });
      return {value: 'Family member relation is required', isError: true};
    }
    if (!memberDetails.gender) {
      setErrors({...errors, gender: 'Gender is required'});
      return {value: 'Gender is required', isError: true};
    }
    if (!memberDetails.birthDate) {
      setErrors({...errors, birthDate: 'Birth date is required'});
      return {value: 'Birth date is required', isError: true};
    }
    if (isEditMember) {
      if (!memberDetails.emergContactRelation) {
        setErrors({
          ...errors,
          emergContactRelation: 'Emergency contact relation is required',
        });
        return {value: 'Emergency contact relation is required', isError: true};
      }
      if (
        memberDetails.emergContactNumber == '' ||
        memberDetails.emergContactNumber.length != 10
      ) {
        setErrors({
          ...errors,
          emergContactNumber: 'Valid emergency contact number is required',
        });
        return {
          value: 'Valid emergency contact number is required',
          isError: true,
        };
      }
      if (
        memberDetails.emergContactEmail == '' ||
        !isValidEmail(memberDetails.emergContactEmail)
      ) {
        setErrors({
          ...errors,
          emergContactEmail: 'Valid emergency contact email is required',
        });
        return {
          value: 'Valid emergency contact email is required',
          isError: true,
        };
      }
    }
    return {value: '', isError: false};
  };

  const handleSubmitAction = () => {
    const result = isValidAllFields();
    if (result.isError) {
      return;
    } else {
      if (isEditMember) {
        Dispatch(editMemberAction(profileData?.data?.uuid));
      } else {
        Dispatch(addMemberAction(profileData?.data?.uuid));
      }
    }
  };

  const validateTextInput = (inputValue: string) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?0-9]/;
    if (regex.test(inputValue)) {
      return {
        value: 'Input should not contain special characters or numbers',
        isError: true,
      };
    } else {
      return {value: inputValue, isError: false};
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (fieldName: string, value: string) => {
    const result = validateTextInput(value);
    if (fieldName === MemberInputs1.fName) {
      if (result.isError) {
        setErrors({...errors, firstName: result.value});
      } else {
        Dispatch(setMemberInputs({key: fieldName, value: value}));
        if (errors.firstName) {
          setErrors({...errors, firstName: ''});
        }
      }
      return;
    } else if (fieldName === MemberInputs1.lName) {
      if (result.isError) {
        setErrors({...errors, lastName: result.value});
      } else {
        Dispatch(setMemberInputs({key: fieldName, value: value}));
        if (errors.lastName) {
          setErrors({...errors, lastName: ''});
        }
      }
      return;
    } else if (fieldName === MemberInputs1.email) {
      if (isValidEmail(value) || value == '') {
        if (errors.email) {
          setErrors({...errors, email: ''});
        }
      } else {
        setErrors({...errors, email: 'Enter valid email'});
      }
    } else if (fieldName === MemberInputs1.phone) {
      if (value.length == 10 || value == '') {
        if (errors.phone) {
          setErrors({...errors, phone: ''});
        }
      } else {
        setErrors({...errors, phone: 'Enter valid phone number'});
      }
    } else if (fieldName === MemberInputs1.gender) {
      if (errors.gender) {
        setErrors({...errors, gender: ''});
      }
    } else if (fieldName === MemberInputs1.familyMemberRelation) {
      if (errors.familyMemberRelation) {
        setErrors({...errors, familyMemberRelation: ''});
      }
    } else if (fieldName === MemberInputs1.birthDate) {
      if (errors.birthDate) {
        setErrors({...errors, birthDate: ''});
      }
    } else if (fieldName === MemberInputs1.emergContactRelation) {
      if (errors.emergContactRelation) {
        setErrors({...errors, emergContactRelation: ''});
      }
    } else if (fieldName === MemberInputs1.emergContactNumber) {
      if (value.length == 10 || value == '') {
        if (errors.emergContactNumber) {
          setErrors({...errors, emergContactNumber: ''});
        }
      } else {
        setErrors({
          ...errors,
          emergContactNumber: 'Enter valid emergency contact number',
        });
      }
    } else if (fieldName === MemberInputs1.emergContactEmail) {
      if (isValidEmail(value) || value == '') {
        if (errors.emergContactEmail) {
          setErrors({...errors, emergContactEmail: ''});
        }
      } else {
        setErrors({
          ...errors,
          emergContactEmail: 'Enter valid emergency contact email',
        });
      }
    }

    Dispatch(setMemberInputs({key: fieldName, value: value}));
  };

  return (
    <View style={{flex: 1}}>
      <View style={MemberScreenStyle.container}>
        <HeaderBg
          height={Platform.OS === 'android' ? responsiveHeight(10) : '16%'}>
          <TopNavigationView
            title={isEditMember ? 'Edit Member' : 'Add Member'}
            onTap={goBack}
            onTapNotification={() => {}}
            source1={ImagePath1.backImage}
            source2={ImagePath1.notificationImage}
            isbuttonshow={true}
          />
        </HeaderBg>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.inputsContainer}>
          <ScrollView style={styles.scrollView}>
            <Card
              width={'99%'}
              style={{
                marginBottom: 25,
                height: null,
                padding: 10,
                top: 20,
                alignSelf: 'center',
              }}>
              <View style={{height: 40}}>
                <Text
                  style={{
                    color: '#0097F0',
                    fontWeight: 'normal',
                    fontSize: 16,
                  }}>
                  Member Details
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
                value={memberDetails.email}
                label={MemberInputs1.email}
                placeholder={MemberInputs1.email}
                style={{marginTop: 10}}
                onChangeText={value => handleChange(MemberInputs1.email, value)}
                isValid={errors.email}
                onBlur={() => handleBlur(MemberInputs1.email)}
              />

              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <TextInput
                value={memberDetails.firstName}
                label={MemberInputs1.fName}
                placeholder={MemberInputs1.fName}
                style={{marginTop: 15}}
                onChangeText={value => handleChange(MemberInputs1.fName, value)}
                isValid={errors.firstName}
                onBlur={() => handleBlur(MemberInputs1.fName)}
              />
              {errors.firstName && (
                <Text style={styles.error}>{errors.firstName}</Text>
              )}

              <TextInput
                value={memberDetails.lastName}
                label={MemberInputs1.lName}
                placeholder={MemberInputs1.lName}
                style={{marginTop: 10}}
                onChangeText={value => handleChange(MemberInputs1.lName, value)}
                isValid={errors.lastName}
                onBlur={() => handleBlur(MemberInputs1.lName)}
              />
              {errors.lastName && (
                <Text style={styles.error}>{errors.lastName}</Text>
              )}

              <TextInput
                value={memberDetails.phone}
                label={MemberInputs1.phone}
                placeholder={MemberInputs1.phone}
                style={{marginTop: 10}}
                onChangeText={value => handleChange(MemberInputs1.phone, value)}
                isValid={errors.phone}
                keyboardType="number-pad"
                maxLength={10}
                onBlur={() => handleBlur(MemberInputs1.phone)}
              />
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <DropdownComponent
                data={familyMemberRelData}
                label={MemberInputs1.familyMemberRelation}
                placeholder={MemberInputs1.familyMemberRelation}
                selectedValue={memberDetails.familyMemberRelation}
                onValueChange={(value: any) => {
                  handleChange(MemberInputs1.familyMemberRelation, value);
                }}
              />
              {errors.familyMemberRelation && (
                <Text style={styles.error}>{errors.familyMemberRelation}</Text>
              )}

              <Text style={{fontFamily: fontType.Roboto_Regular, fontSize: 16}}>
                {MemberInputs1.gender}
              </Text>
              <Row>
                <RadioButton
                  selected={memberDetails.gender === 'MALE'}
                  label="Male"
                  onSelect={() => handleChange(MemberInputs1.gender, 'MALE')}
                />
                <RadioButton
                  selected={memberDetails.gender === 'FEMALE'}
                  label="Female"
                  onSelect={() => handleChange(MemberInputs1.gender, 'FEMALE')}
                />
                <RadioButton
                  selected={memberDetails.gender === 'OTHER'}
                  label="Other"
                  onSelect={() => handleChange(MemberInputs1.gender, 'OTHER')}
                />
              </Row>
              {errors.gender && (
                <Text style={styles.error}>{errors.gender}</Text>
              )}

              <CustomDateTextField
                title={MemberInputs1.birthDate}
                date={memberDetails.birthDate}
                canSelectFutureDate={false}
                onChange={(dateStr, convertedDate) => {
                  console.log('Selected date: ', convertedDate);
                  handleChange(MemberInputs1.birthDate, dateStr);
                  handleChange(MemberInputs1.convertedDate, convertedDate);
                }}
                onChangeError={() => {}}
              />
              {errors.birthDate && (
                <Text style={styles.error}>{errors.birthDate}</Text>
              )}
            </Card>
            {isEditMember ? (
              <Card
                width={'99%'}
                style={{
                  marginBottom: 25,
                  height: null,
                  padding: 10,
                  top: 20,
                  alignSelf: 'center',
                }}>
                <View style={{height: 40}}>
                  <Text
                    style={{
                      color: '#0097F0',
                      fontWeight: 'normal',
                      fontSize: 16,
                    }}>
                    Emergency Contact Details
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#00000029',
                    bottom: 10,
                  }}></View>
                <DropdownComponent
                  data={familyMemberRelData}
                  label={MemberInputs1.emergContactRelation}
                  placeholder={MemberInputs1.emergContactRelation}
                  selectedValue={memberDetails.emergContactRelation}
                  onValueChange={(value: any) => {
                    handleChange(MemberInputs1.emergContactRelation, value);
                  }}
                />
                {errors.emergContactRelation && (
                  <Text style={styles.error}>
                    {errors.emergContactRelation}
                  </Text>
                )}
                <TextInput
                  value={memberDetails.emergContactNumber}
                  label={MemberInputs1.emergContactNumber}
                  placeholder={MemberInputs1.emergContactNumber}
                  keyboardType="numeric"
                  maxLength={10}
                  style={{marginTop: 10}}
                  onChangeText={value =>
                    handleChange(MemberInputs1.emergContactNumber, value)
                  }
                  isValid={errors.emergContactNumber}
                  onBlur={() => handleBlur(MemberInputs1.emergContactNumber)}
                />
                {errors.emergContactNumber && (
                  <Text style={styles.error}>{errors.emergContactNumber}</Text>
                )}
                <TextInput
                  value={memberDetails.emergContactEmail}
                  label={MemberInputs1.emergContactEmail}
                  placeholder={MemberInputs1.emergContactEmail}
                  style={{marginTop: 10}}
                  autoCapitalize={'none'}
                  onChangeText={value =>
                    handleChange(MemberInputs1.emergContactEmail, value)
                  }
                  isValid={errors.emergContactEmail}
                  onBlur={() => handleBlur(MemberInputs1.emergContactEmail)}
                />
                {errors.emergContactEmail && (
                  <Text style={styles.error}>{errors.emergContactEmail}</Text>
                )}
              </Card>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
        <SafeAreaView edges={['bottom']}>
          <Button
            title={isEditMember ? 'Save' : 'Add'}
            buttonStyle={{marginHorizontal: '3%', bottom: 10}}
            onPress={handleSubmitAction}
          />
        </SafeAreaView>
        {isLoading && <Loader />}
      </View>
    </View>
  );
};

export default AddMemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
    marginTop: -5,
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: colors.white,
    // marginBottom: responsiveHeight(3),
  },
  scrollView: {
    // position: 'absolute',
    height: '99%',
    width: '100%',
    paddingHorizontal: 15,
  },
});
