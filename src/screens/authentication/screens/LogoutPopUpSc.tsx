// import React, { useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import LogoutIcon from 'react-native-vector-icons/MaterialIcons';
// import { RootStackParamList } from '../../../App';
// import { colors } from '../../../assets/colors';
// import { fontType } from '../../../assets/fontType';
// import { logoutAction } from '../../../redux/reducers/auth/async-actions/logoutAction';
// import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
// import { RootState } from '../../../redux/store/storeConfig';
// type signupProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
// export default function LogOutPopup({navigation}: signupProps) {
//   onBtnPress = () => {
//     // Alert.alert('Button with adjusted color pressed')}
//   };
//     const isLoggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);
// const loginData = useAppSelector((state: RootState)=> state.auth.loginData);
// const logoutData = useAppSelector((state: RootState)=> state.auth.logoutData);
// const islogOut = useAppSelector((state: RootState)=> state.auth.islogOut);
//   useEffect(() => {
//     if(!isLoggedIn)
//     {
//       console.log('navigate SignIn LogOutPopup ')
//       navigation.navigate('SignIn');
//     }
//   },[isLoggedIn])
//   console.log('****islogOut***'+islogOut)
//   console.log('****accessToken***'+loginData?.data?.accessToken)
// const handlelogout = () => {
  
//   console.log('****refreshToken***'+loginData?.data.refreshToken)
//   dispatch(logoutAction({accessToken: loginData?.data?.accessToken,refreshToken: loginData?.data?.refreshToken}));
// }
//   const dispatch = useAppDispatch();
//   return (
//     <View style={styles.container}>
//       <View style={styles.middleView}>
//         <View style={{alignItems: 'center', padding: 20}}>
//           <LogoutIcon
//             name={'logout'}
//             size={80}
//             color={'#1A1A1A'}
//             marginTop={20}
//           />
//         </View>
//         <View>
//           <Text style={styles.textStyle}>
//             Logging out will delete all your data from this device
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignSelf: 'center',
//             width: '90%',
//           }}>
//           <TouchableOpacity style={styles.cancleBtn}>
//             <Text
//               style={{
//                 color: colors.new_blue,
//                 fontSize: 18,
//                 fontWeight: '500',
//                 fontFamily: fontType.Roboto_Medium,
//               }}>
//               Cancel
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.logoutBtn}
//             onPress={() => {
//               handlelogout()
//             }}>
//             <Text
//               style={{
//                 color: colors.red,
//                 fontWeight: '500',
//                 fontSize: 18,
//                 fontFamily: fontType.Roboto_Medium,
//               }}>
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   middleView: {
//     backgroundColor: 'white',
//     height: 350,
//     width: '90%',
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 25,
//   },
//   image: {
//     width: 80,
//     height: 80,
//   },
//   textStyle: {
//     fontSize: 20,
//     color: 'black',
//     padding: 20,
//     marginTop: 30,
//     textAlign: 'center',
//   },
//   cancleBtn: {
//     width: '42%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: colors.new_blue,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   logoutBtn: {
//     width: '42%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#FF2300',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
// });
