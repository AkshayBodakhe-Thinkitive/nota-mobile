// import React, {useEffect, useState} from 'react';
// import {Image, StyleSheet, View} from 'react-native';
// import {
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
// import CustomText from '../../../../components/Text/CustomText';
// // import {ImagePath} from '../../../../constants/ImagePaths';
// import {ImagePath} from '../../../../constants/ImagePathConstant';
// // import {FontType} from '../../../../constants/FontType';
// // import {colors} from '../../../../constants/Colors';
// import {useNavigation} from '@react-navigation/native';
// import {colors} from '../../../../assets/colors';
// import {fontType} from '../../../../assets/fontType';
// import Button from '../../../../components/ButtonComponent/ButtonComponent';
// import StarRating from '../../../../components/StarRating/StarRating';
// import {EncouterService} from '../../services/generateToken';
// import {ZoomService} from '../../../../redux/reducers/zoom/service/ZoomService';
// import {useAppDispatch, useAppSelector} from '../../../../redux/store/hooks';
// import {RootState} from '../../../../redux/store/storeConfig';
// import {submitRatingAction} from '../../../../redux/reducers/zoom/async-action/ratingProviderAction';
// import TextInput from '../../../../components/TextInput/TextInput';
// import Loader from '../../../../components/Loader/Loader';

// interface Props {
//   providerId?: any;
//   providerName?: string;
//   show: boolean;
//   uuid?: string;
//   setShow?: (value: boolean) => void;
// }

// const RatingModal = ({providerId, providerName, show,uuid, setShow}: Props) => {
//   const [rating, setRating] = useState(0);

//   console.log(rating);
//   const dispatch = useAppDispatch();
//   const loading = useAppSelector((state: RootState) => state.zoom.loading);
//   const loginData = useAppSelector((state: RootState) => state.auth.loginData);
// const [show1,setShow1] = useState(Boolean);
//   const [isSubmit, setIsSumbmit] = useState(false);

//   const navigation = useNavigation<any>();

//   const submitRatingFun = async () => {
// ZoomService.submitRatingAction(accessToken,providerUuid: string,rating:any,uuid: string,review: string)
// dispatch(
//   submitRatingAction({
//     accessToken:  loginData?.data?.accessToken,
//     providerUuid: providerId,
//     rating: rating,
//     uuid: uuid,
//     review: '',
//   }),
// ).then(res => {
//       setIsSumbmit(true);
//     });

// EncouterService.submitRating(providerId, rating).then(res => {
//   setIsSumbmit(true);
// });
//   };
//   useEffect(() => {
//     setShow1(show)
// }, []);
//   useEffect(() => {
//     if (isSubmit === true) {
//       setTimeout(() => {
//         navigation.navigate('Home');
//       }, 5000);
//     }
//   }, [isSubmit]);

//   return (
//     <ModalPopup show={show1} setShow={setShow1}>
{
  /* <ModalPopup
    show={show}
  setShow={setShow}
    > */
}
{
  /* {!isSubmit ? (
      <View>
        <View style={{alignItems: 'center', height: responsiveHeight(14)}}>
          <CustomText style={styles.thk}>Thank you for using</CustomText>
          <Image
            source={ImagePath.navalaLogoWithNameImage}
            style={styles.logoImageStyles}
          />
        </View>
        <CustomText style={styles.appended}>
          This appointment has been ended. We would appreciate your feedback!
        </CustomText>
        <View
          style={{
            alignItems: 'center',
            marginVertical: responsiveHeight(2.5),
          }}> */
}
{
  /* <CustomText
            style={{
              fontSize: responsiveFontSize(2),
              marginBottom: responsiveHeight(2),
            }}>
            Overall Provider Rating
          </CustomText>
          <StarRating size={responsiveFontSize(4.5)} value={rating} setValue={setRating} />
        </View> */
}
{
  /* <TextInput
            placeholder="Review..."
            // onChangeText={value => handleChange('password', value)}
            // onBlur={() => handleBlur('password')}
            // value={password}
            // isValid={errors.password}
            // secureTextEntry
          /> */
}
{
  /* <View style={{justifyContent: 'center', width: '100%', marginTop: 5}}>
          <Button title="Submit" onPress={submitRatingFun} />
        </View>
        {loading && <Loader />}
      </View>
    ) : (
      <View style={styles.doneContainer}>
        <Image source={ImagePath.donegif} style={styles.doneImageStyle} />
        <CustomText style={styles.thkText}>
          Thank You for your visit with Dr. {providerName}
        </CustomText>
      </View>
    )}
  </ModalPopup>
  );
}; */
}

{
  /* export default RatingModal; */
}

{
  /* const styles = StyleSheet.create({
  logoImageStyles: {
    resizeMode: 'cover',
    height: '60%',
    width: '50%',
    borderRadius: 8,
  },
  thk: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    marginBottom: responsiveHeight(1.5),
    marginTop: '2%',
    fontFamily: fontType.Roboto_Medium,
  },
  appended: {
    color: colors.grey70,
    textAlign: 'center',
    marginVertical: 5,
    fontSize: responsiveFontSize(2),
  },
  doneContainer: {
    // borderWidth : 1,
    height: responsiveHeight(28),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneImageStyle: {
    height: '75%',
    width: '60%',
    // borderWidth: 1,
  },
  thkText: {
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
}); */
}
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CustomText from '../../../../components/Text/CustomText';
import {Image} from 'react-native';
// import {ImagePath} from '../../../../constants/ImagePaths';
import {ImagePath1} from '../../../../Constants1/ImagePathConstant1';
// import {FontType} from '../../../../constants/FontType';
import {fontType} from '../../../../assets/fontType';
// import {colors} from '../../../../constants/Colors';
import {colors} from '../../../../assets/colors';
import StarRating from '../../../../components/StarRating/StarRating';
import Button from '../../../../components/ButtonComponent/ButtonComponent';
import {EncouterService} from '../../services/generateToken';
import {useNavigation} from '@react-navigation/native';
import {BottomNavConstants} from '../../../../Constants1/NavConstants';
import {useAppDispatch, useAppSelector} from '../../../../redux/store/hooks';
import {RootState} from '../../../../redux/store/storeConfig';
import {submitRatingAction} from '../../../../redux/reducers/zoom/async-action/ratingProviderAction';
import TextInput from '../../../../components/TextInput/TextInput';

interface Props {
  providerId?: any;
  providerName?: string;
  uuid?: string;
  show?: boolean;
  setShow?: (value: boolean) => void;
}

const RatingModal = ({
  providerId,
  providerName,
  show,
  uuid,
  setShow,
}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.zoom.loading);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const [rating, setRating] = useState(0);

  const [isSubmit, setIsSumbmit] = useState(false);
const [review,setReview] = useState('')
  const navigation = useNavigation<any>();

  const submitRatingFun = async () => {
    dispatch(
      submitRatingAction({
        accessToken: loginData?.data?.accessToken,
        providerUuid: providerId,
        rating: rating,
        uuid: uuid,
        review: 'test',
      }),
    ).then(res => {
      setIsSumbmit(true);
    });
  };

  useEffect(() => {
    if (isSubmit === true) {
      setTimeout(() => {
        navigation.navigate(BottomNavConstants.HOME);
      }, 2000);
    }
  }, [isSubmit]);
  const handleChange = (fieldName: string, value: string) => {
    if (fieldName === 'review') {
      setReview(value);
    }
  };
  return (
    <ModalPopup show={show}>
      {!isSubmit ? (
        <View>
          <View style={{alignItems: 'center', height: responsiveHeight(14)}}>
            <CustomText style={styles.thk}>Thank you for using</CustomText>
            <Image
              source={ImagePath1.navalaLogoWithNameImage}
              style={styles.logoImageStyles}
            />
          </View>
          <CustomText style={styles.appended}>
            This appointment has been ended. We would appreciate your feedback!
          </CustomText>
          <View
            style={{
              alignItems: 'center',
              marginVertical: responsiveHeight(2.5),
            }}>
            <CustomText
              style={{
                fontSize: responsiveFontSize(2),
                marginBottom: responsiveHeight(2),
              }}>
              Overall Provider Rating
            </CustomText>
            <StarRating
              size={responsiveFontSize(4.5)}
              value={rating}
              setValue={setRating}
            />
          </View>
          {/* <TextInput
            placeholder="Review..."
            onChangeText={value => handleChange('review', value)}
            // onBlur={() => handleBlur('password')}
            value={review}
            // isValid={errors.password}
            // secureTextEntry
          /> */}
          <View style={{justifyContent: 'center', width: '100%', marginTop: 5}}>
            <Button title="Submit" onPress={submitRatingFun} />
          </View>
        </View>
      ) : (
        <View style={styles.doneContainer}>
          <Image source={ImagePath1.donegif} style={styles.doneImageStyle} />
          <CustomText style={styles.thkText}>
            Thank You for your visit with Dr. {providerName}
          </CustomText>
        </View>
      )}
    </ModalPopup>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  logoImageStyles: {
    resizeMode: 'cover',
    height: '60%',
    width: '50%',
    borderRadius: 8,
  },
  thk: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    marginBottom: responsiveHeight(1.5),
    marginTop: '2%',
    fontFamily: fontType.Roboto_Medium,
  },
  appended: {
    color: colors.grey70,
    textAlign: 'center',
    marginVertical: 5,
    fontSize: responsiveFontSize(2),
  },
  doneContainer: {
    // borderWidth : 1,
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doneImageStyle: {
    height: '75%',
    width: '60%',
    // borderWidth: 1,
  },
  thkText: {
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
});
