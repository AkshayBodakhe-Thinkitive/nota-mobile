import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';
import Button from '../../components/ButtonComponent/ButtonComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomDateTextField from '../../components/CustomDateField';
import DropdownComponent from '../../components/Dropdown/DropDown';
import Header from '../../components/Header/Header';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import Loader from '../../components/Loader/Loader';
import Row from '../../components/Row/Row';
import CustomText from '../../components/Text/CustomText';
import TextInput from '../../components/TextInput/TextInput';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {hideProfileMessage} from '../../redux/reducers/profile/ProfileReducer';
import {editProfileAction} from '../../redux/reducers/profile/async-action/editProfileAction';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import PhoneWithCountryCode from '../../components/phonewithcountrycode/PhoneWithCountryCode';

const EditProfileScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );
  const [selectedImage, setSelectedImage] = useState('');
  const [profileImageBase64, setProfileImageBase64] = useState('');
  const [isEditProfilePhotoMenuVisible, setIsEditProfilePhotoMenuVisible] =
    useState(false);
  const isShowMessage = useAppSelector(
    (state: RootState) => state.profile.isShowMessage,
  );
  const toastMessage = useAppSelector(
    (state: RootState) => state.profile.message,
  );
  const isLoading = useAppSelector((state: RootState) => state.profile.loading);
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [dateError, setDateError] = useState('');

  const Capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const Capitalize2 = (str: string) => {
    if (!str) return '';
    return (
      str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };

  const today = new Date(profileData?.data?.birthDate);
  const month = today.toLocaleString('default', {month: 'long'});
  const day1 = today.getDate();
  const year1 = today.getFullYear();
  const formattedDate = `${day1} ${month.slice(0, 3)} ${year1}`;
  const [firstName, setFirstName] = useState(
    Capitalize(profileData?.data?.legalFirstName),
  );
  const [lastName, setLastName] = useState(
    Capitalize(profileData?.data?.legalLastName),
  );
  const [email, setEmail] = useState(
    profileData?.data?.email === null ? null : profileData?.data?.email,
  );
  const [gender, setGender] = useState(
    profileData?.data?.gender === null
      ? null
      : Capitalize2(profileData?.data?.gender),
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    profileData?.data?.birthDate === null
      ? null
      : moment(profileData?.data?.birthDate).format('MM/DD/YYYY'),
  );

  const [contact, seContact] = useState(
    profileData?.data?.contactNumber === null
      ? ''
      : profileData?.data?.contactNumber,
  );

  const [countryCode, setCountryCode] = useState('');

  const handlePhoneChange = (
    newCountryCode: string,
    newPhoneNumber: string,
  ) => {
    setCountryCode(newCountryCode);
    seContact(newPhoneNumber);
  };

  //Address
  const [line1, setLine1] = useState(profileData?.data?.address?.line1 ?? '');
  const [line2, setLine2] = useState(profileData?.data?.address?.line2 ?? '');
  const [city, setCity] = useState(profileData?.data?.address?.city ?? '');
  const [country, setCountry] = useState(
    profileData?.data?.address?.country ?? '',
  );
  const [state, setState] = useState(profileData?.data?.address?.state ?? '');
  const [zipcode, setZipcode] = useState(
    profileData?.data?.address?.zipcode ?? '',
  );
  const [street, setStreet] = useState(
    profileData?.data?.address?.street ?? '',
  );

  const [genderError, setGenderError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [dobError, setDobError] = useState(false);

  const handleGenderSelect = (selectedGender: any) => {
    console.log('selectedGender', selectedGender);
    setGender(selectedGender);
  };
  const genderType = [
    {label: 'Female', value: 'Female'},
    {label: 'Male', value: 'Male'},
    {label: 'Other', value: 'Other'},
    {label: 'Transgender', value: 'Transgender'},
  ];

  const marritalStatus = [
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
    {label: 'Divorced', value: 'Divorced'},
    {label: 'Widowed', value: 'Widowed'},
  ];
  const [selectedGenderType, setGenderType] = useState(
    profileData?.data?.maritalStatus === null
      ? null
      : Capitalize2(profileData?.data?.maritalStatus),
  );
  const handleValueChangeForGenderTypeDropDown = value => {
    setMaritalStatusError(false)
    setGenderType(value);
    console.log('Selected value selectedGenderType :', value);
  };
  useEffect(() => {
    requestCameraPermission();
    console.log('Change:', isShowMessage, 'messgae:', toastMessage);
    if (isShowMessage) {
      Alert.alert(toastMessage, '', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(hideProfileMessage());
            if (toastMessage.includes('successfully')) {
              goBack();
            }
          },
        },
      ]);
    }
  }, [isShowMessage]);

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.CAMERA);
        console.log('android result **  ' + result);
        requestCameraPermission();
      } else {
        check(PERMISSIONS.IOS.CAMERA)
          .then(result => {
            console.log('Result:', result);
            switch (result) {
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                break;
              case RESULTS.DENIED:
                Alert.alert(
                  'Permission denied!',
                  'Provide camera permission from settings.',
                  [{text: 'OK', onPress: () => {}}],
                );
                break;
              case RESULTS.BLOCKED:
                console.log('The permission is denied');
                Alert.alert(
                  'Permission denied!',
                  'Provide camera permission from settings.',
                  [{text: 'OK', onPress: () => {}}],
                );
                break;
              default:
                requestCameraPermission();
            }
          })
          .catch(error => {
            console.log('Unable to check camera permission:', error);
          });
      }
    } catch (error) {
      console.log('Error checking camera permission: ', error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      console.log('Requesting camera permission');
      let result;
      if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.CAMERA);
      } else {
        result = await request(PERMISSIONS.ANDROID.CAMERA);
      }
    } catch (error) {
      console.log('Error requesting camera permission: ', error);
    }
  };
  const openCamera = () => {
    checkCameraPermission();
    console.log('Opening camera');
    const options: any = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
    };

    launchCamera(options, response => {
      toggleEditProfilePhotoMenu();
      console.log(' Opening camera launchCamera ');

      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode || response.errorMessage) {
        Alert.alert(
          'Warning',
          'Camera unavailable, Check for camera permission in settings',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        );
        console.log(
          'camera error: ',
          response.errorMessage,
          ' :Code: ',
          response.errorCode,
        );
      } else {
        console.log('User permission camera');

        if (response.assets?.[0].base64) {
          setProfileImageBase64(response.assets?.[0].base64);
        }

        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('Selected Image: ', imageUri);
        setSelectedImage(imageUri);
      }
    });
  };

  const openImagePicker = () => {
    console.log('Opening photos');
    const options: any = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
    };

    launchImageLibrary(options, response => {
      toggleEditProfilePhotoMenu();
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode || response.errorMessage) {
        console.log(
          'Image picker error: ',
          response.errorMessage,
          ' :Code: ',
          response.errorCode,
        );
      } else {
        if (response.assets?.[0].base64) {
          setProfileImageBase64(response.assets?.[0].base64);
        }

        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('Selected Image: ', imageUri);
        setSelectedImage(imageUri);
      }
    });
  };

  const toggleEditProfilePhotoMenu = () => {
    setIsEditProfilePhotoMenuVisible(!isEditProfilePhotoMenuVisible);
  };

  const menuView = () => {
    const MenuButton = ({BtnTitle, onTap}: any) => {
      return (
        <TouchableOpacity
          style={{
            marginVertical: 8,
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={onTap}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {BtnTitle}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        visible={isEditProfilePhotoMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleEditProfilePhotoMenu}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 8}}>
            <MenuButton
              BtnTitle="Open Camera"
              onTap={() => {
                openCamera();
              }}
            />
            <MenuButton
              BtnTitle="Open Photos"
              onTap={() => {
                openImagePicker();
              }}
            />
            {/* <MenuButton BtnTitle='Remove Photo' onTap={()=>{
                toggleEditProfilePhotoMenu()
                setSelectedImage('');
                setProfileImageBase64('')
            }}/> */}
            <MenuButton
              BtnTitle="Cancel"
              onTap={() => {
                toggleEditProfilePhotoMenu();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };



  const handleSubmit = () => {
    console.log('dateOfBirth', dateOfBirth);
  
    const date = moment(dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T00:00:00Z';
    console.log('date dateOfBirth', date);
  
    let hasErrors = false;
  
    if (firstNameError != '' || lastNameError != '') {
      Alert.alert('Alert!', 'Please Enter all required fields!', [
        { text: 'OK', onPress: () => console.log('Ok Pressed') },
      ]);
      return;
    }
  
    console.log(dateOfBirth);
    if (dateError != '') {
      console.log("dateError",dateError)
      Alert.alert('Alert!', 'DOB is Requied!', [
        { text: 'OK', onPress: () => console.log('Ok Pressed') },
      ]);
      return;
    }
  
    // Reset error states
    setGenderError(false);
    setMaritalStatusError(false);
    setDobError(false);
  
    // Validate gender
    if (gender === null) {
      setGenderError(true);
      hasErrors = true;
    }
  
    // Validate marital status
    if (selectedGenderType === null) {
      setMaritalStatusError(true);
      hasErrors = true;
    }
  
    // Validate date of birth
    if (dateOfBirth === null) {
      setDobError(true);
      hasErrors = true;
    }
  
    // Check if there are any errors
    if (hasErrors) {
      return;
    }
  
    const data = {
      uuid: profileData?.data?.uuid,
      provider: { uuid: null },
      location: { uuid: null },
      registrationDate: profileData?.data?.registrationDate,
      legalLastName: lastName,
      legalFirstName: firstName,
      firstNameUsed: profileData?.data?.firstNameUsed,
      middleName: profileData?.data?.middleName,
      birthDate: date,
      gender: gender ? gender.toUpperCase() : gender,
      maritalStatus: selectedGenderType ? selectedGenderType.toUpperCase() : null,
      ssn: profileData?.data?.ssn,
      language: profileData?.data?.language,
      ethnicity: profileData?.data?.ethnicity,
      race: profileData?.data?.race,
      motherName: profileData?.data?.motherName,
      address: {
        line1: line1,
        line2: line2,
        city: city,
        state: state,
        street: street,
        country: country,
        zipcode: zipcode,
      },
      contactNumber: contact,
      countryCode : countryCode,
      email: email,
      fax: profileData?.data?.fax,
      emergContactLastName: lastName,
      emergContactFirstName: firstName,
      emergContactRelation: 'OTHER',
      emergContactNumber: contact,
      emergContactEmail: email,
      emailConsent: profileData?.data?.emailConsent,
      callConsent: profileData?.data?.callConsent,
      messageConsent: profileData?.data?.messageConsent,
      formConsent: profileData?.data?.formConsent,
      note: profileData?.data?.note,
      preferredPharmacy: profileData?.data?.preferredPharmacy,
      preferredLab: profileData?.data?.preferredLab,
      preferredRadiology: profileData?.data?.preferredRadiology,
      avatar: profileData?.data?.avatar,
      newAvatar: selectedImage == null || selectedImage == '' ? null : profileImageBase64,
    };
  
    console.log('Profile payload:', data);
  
    if (loginData?.data?.accessToken) {
      dispatch(
        editProfileAction({
          accessToken: loginData?.data?.accessToken,
          data: data,
        }),
      );
    }
  };
  

  const goBack = () => navigation.pop();

  const [loading, setLoading] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null as any}
      keyboardVerticalOffset={Platform.OS === 'ios' ? responsiveHeight(1) : 0}>
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '24%' : '23%'}>
        <Header title="Edit Profile" onPress={goBack} leftIcon={<></>}></Header>
        <View style={{alignSelf: 'center'}}>
          {loading && !isLoading && (
            <View style={styles.imageContainer}>
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loadingIndicator}
              />
            </View>
          )}
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                toggleEditProfilePhotoMenu();
              }}>
              <Image
                source={
                  selectedImage == null || selectedImage == ''
                    ? profileData?.data?.avatar === null
                      ? ImagePath1.personImg
                      : {
                          uri: profileData?.data?.avatar,
                        }
                    : {
                        uri: selectedImage,
                      }
                }
                //{ImagePath.profileImage}
                resizeMode="cover"
                style={styles.image1}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
            </TouchableOpacity>
          </View>
          {menuView()}
        </View>
      </HeaderBg>
      <View style={styles.patDetailsContainer}>
        <CustomText
          fontSize={responsiveFontSize(2)}
          fontFamily={fontType.Roboto_Medium}>
          {Capitalize(profileData?.data?.legalFirstName) +
            ' ' +
            Capitalize(profileData?.data?.legalLastName)}
        </CustomText>
      </View>
      <ScrollView style={{padding: '2%'}}>
        <View style={{paddingHorizontal: 4, paddingTop: 4}}>
          <TextInput
            placeholder="First Name"
            label="First Name"
            value={firstName}
            onChangeText={txt => {
              setFirstName(txt);
              if (txt == '') {
                setFirstNameError('First name is required');
              } else {
                setFirstNameError('');
              }
            }}
            onBlur={() => {
              if (firstName == '') {
                setFirstNameError('First name is required');
              } else {
                setFirstNameError('');
              }
            }}
          />

          {firstNameError && <Text style={styles.error}>{firstNameError}</Text>}
          <TextInput
            placeholder="Last Name"
            label="Last Name"
            value={lastName}
            onChangeText={txt => {
              setLastName(txt);
              if (txt == '') {
                setLastNameError('Last name is required');
              } else {
                setLastNameError('');
              }
            }}
            onBlur={() => {
              if (lastName == '') {
                setLastNameError('Last name is required');
              } else {
                setLastNameError('');
              }
            }}
          />
          {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}
          {/* <TextInput
            placeholder="Contact"
            label="Contact"
            value={contact}
            editable={false}
            onChangeText={seContact}
          /> */}
            <PhoneWithCountryCode
              countryCode={countryCode}
              number={contact} 
              onChange={handlePhoneChange}
              editable={false}
            />
          <TextInput
            placeholder="Email"
            label="Email"
            value={email}
            // editable={email === null ? true :false}
            onChangeText={setEmail}
          />
          <DropdownComponent
            label="Gender"
            data={genderType}
            placeholder="Select Gender"
            selectedValue={gender}
            onValueChange={(value: any) => {
              setGenderError(false)
              handleGenderSelect(value)}
            }
            isValid={genderError}
            errorText={genderError === true ? 'Please Select Gender' : ''}
            required
          />
          <CustomDateTextField
            title={'Date of birth'}
            date={dateOfBirth}
            required
            onChange={dateStr => {
              console.log('dateStr CustomDateTextField', dateStr);
              setDobError(false)
              setDateOfBirth(dateStr);
            }}
            canSelectFutureDate={false}
            onChangeError={message => {
              setDateError(message);
            }}></CustomDateTextField>
               {dobError && <Text style={styles.error}>{'Please Enter DOB'}</Text>}
          <DropdownComponent
            data={marritalStatus}
            label="Marital Status"
            placeholder="Marital Status"
            selectedValue={selectedGenderType}
            onValueChange={handleValueChangeForGenderTypeDropDown}
            isValid={maritalStatusError}
            errorText={maritalStatusError === true ? "Plese select marital status" : ''}
            required
          />
          <TextInput
            label="Address Line 1"
            placeholder="Line1"
            value={line1}
            onChangeText={setLine1}
          />
          <TextInput
            label="Address Line 2"
            placeholder="Line2"
            value={line2}
            onChangeText={setLine2}
          />
          <TextInput
            label="City"
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            label="State"
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            label="Country"
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />
          <TextInput
            label="Zip Code"
            placeholder="Zip Code"
            value={zipcode}
            onChangeText={setZipcode}
            keyboardType="number-pad"
          />
        </View>
      </ScrollView>
      <Button
        title="Save"
        buttonStyle={{marginHorizontal: '3%'}}
        onPress={handleSubmit}
      />
      {isLoading && <Loader />}
    </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(12);
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    paddingBottom: 18,
    backgroundColor: colors.white,
  },
  error: {
    // color: 'red',
    // marginLeft: 5,
    marginTop: -5,
    marginBottom: 5,
    color:  '#D92D20',
    fontFamily: fontType.Roboto_Regular,
    fontSize: responsiveFontSize(1.3),
    // position: 'absolute',
    // bottom: -16,
  },

  patDetailsContainer: {
    zIndex: -1,
    alignItems: 'center',
    paddingTop: responsiveHeight(7.5),
    paddingBottom: 4,
  },
  editPhotoPencilContainer: {
    borderWidth: 1,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    position: 'absolute',
    right: '4%',
    bottom: '2%',
  },
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(12),
  },
  image1: {
    width: 100,
    height: 100,
    borderRadius: borderRadiusPixel,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadiusPixel,
    borderWidth: 1, 
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    position: 'absolute',
    alignSelf: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});
