import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {AntIcons} from '../../components/Icons/AntIcons';
import Card from '../../components/Card/Card';
import ModalPopup from '../../components/ModalPopup/ModalPopup';
import CustomText from '../../components/Text/CustomText';
import Row from '../../components/Row/Row';
import SmallButton from '../../components/SmallButton/SmallButton';
import {colors} from '../../assets/colors';
import {fontType} from '../../assets/fontType';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {logoutAction} from '../../redux/reducers/auth/async-actions/logoutAction';
import {RootState} from '../../redux/store/storeConfig';
import {useNavigation} from '@react-navigation/native';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import {AuthService} from '../../redux/reducers/auth/services/AuthService';

const SettingSc = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [loading,setLoading] = useState(false)

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    setIsDelete(false);
    setShowLogoutModal(true);
  };

  const handleDeleteAccount = () => {
    setIsDelete(true);
    setShowLogoutModal(true);
  };

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const handlelogout = () => {
    dispatch(
      logoutAction({
        accessToken: loginData?.data?.accessToken,
        refreshToken: loginData?.data?.refreshToken,
      }),
    );
  };

  const logoutFun = () => {
    setShowLogoutModal(false);
    handlelogout();
  };

  const deleteFun = async () => {
    setLoading(true)
     await AuthService.deleteAccount(
      loginData?.data?.accessToken,
      profileData?.data?.uuid,
    );
    handlelogout()
    setLoading(false)
    setShowLogoutModal(false);
  };

  const navigation = useNavigation<any>();

  const goBack = () => {
    navigation.pop();
  };

  const loginData = useAppSelector((state: RootState) => state.auth.loginData);

 

  return (
    <View style={styles.container}>
      <HeaderBg
        height={
          Platform.OS === 'android'
            ? responsiveHeight(15)
            : responsiveHeight(15)
        }>
        <TopNavigationView
          title={'Settings'}
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.pageContainer}>
        <Card style={styles.cardStyles}>
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <MaterialIcons
              name="logout"
              size={21}
              color="#1A1A1A66"
              style={{marginRight: '2%'}}
            />
            <Text style={styles.optionText}>Logout</Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              size={21}
              color="#1A1A1A66"
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, {borderBottomWidth: 0}]}
            onPress={handleDeleteAccount}>
            <AntIcons
              name="deleteuser"
              size={21}
              color="#FF2300"
              style={{marginRight: '2%'}}
            />
            <Text style={[styles.optionText, {color: '#FF2300'}]}>
              Delete Account
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              size={21}
              color="#FF2300"
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        </Card>
      </View>
      <ModalPopup
        show={showLogoutModal}
        setShow={() => setShowLogoutModal(!showLogoutModal)}>
        <View style={{alignItems: 'center'}}>
          <MaterialIcons
            name="logout"
            color={isDelete ? '#D92D20' : 'black'}
            size={responsiveFontSize(10)}
          />
          <CustomText
            fontSize={responsiveFontSize(2)}
            style={{
              textAlign: 'center',
              marginBottom: responsiveHeight(2),
              marginTop: '5%',
              color: isDelete ? '#D92D20' : 'black',
            }}>
            {isDelete
              ? 'Are you sure you want to delete your account?'
              : 'Are you sure you want to logout?'}
          </CustomText>
        </View>
        <Row style={{justifyContent: 'space-between'}}>
          <SmallButton
            outlined
            title="Cancel"
            containerStyle={{
              width: '46%',
              height: responsiveHeight(5),
              justifyContent: 'center',
              borderWidth: 0.5,
            }}
            onPress={() => setShowLogoutModal(false)}
          />
          <SmallButton
            outlined
            title={isDelete ? 'Delete' : 'Logout'}
            containerStyle={{
              width: '46%',
              height: responsiveHeight(5),
              borderColor: '#FF2300',
              justifyContent: 'center',
              borderWidth: 0.5,
            }}
            textStyle={{color: '#FF2300'}}
            onPress={isDelete ? deleteFun : logoutFun}
          />
        </Row>
      </ModalPopup>
    </View>
  );
};

export default SettingSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    padding: '3%',
  },
  cardStyles: {
    width: '100%',
    height: null,
  },
  option: {
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey60,
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontType.Roboto_Medium,
  },
});
