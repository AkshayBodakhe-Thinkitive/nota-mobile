// import React from 'react';
// import { ScrollView, Text, View } from 'react-native';
// // import {InstantConsultStyles as styles} from '../styles/InstantConsultStyles';
// import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import Header from '../../../components/Header/Header';
// import HeaderBg from '../../../components/HeaderBg/HeaderBg';
// import { Ionicons } from '../../../components/Icons/Ionicons';
// import TextInput from '../../../components/TextInput/TextInput';
// // import { ImagePath } from '../../../constants/ImagePaths';
// import { ImagePath } from '../../../constants/ImagePathConstant';
// // import ProviderListComponent from '../../home/components/ProviderListComponent/ProviderListComponent';
// import ProviderListComponent from '../../schedulingManagement /components/ProviderListComponent/ProviderListComponent';
// // import ProviersConsulted from '../../home/components/ProvidersConsulted/ProviersConsulted';
// import ProviersConsulted from '../components/ProvidersConsulted/ProviersConsulted';
// // import { healthissuedata, providerdata } from '../../home/constants/StringConstants';
// import { healthissuedata, specilistData } from '../../schedulingManagement /constants/StringConstants';
// import { InstantConsultStyles as styles } from '../../schedulingManagement /style/InstantConsultStyles';

// const InstantConsultationScreen = () => {
//   return (
//     <View style={styles.container}>
//       <HeaderBg style={{shadowOpacity: 0}}>
//         <Header title="Consult a Doctor" />
//         <View style={{paddingHorizontal: 10}}>
//           <Text style={styles.headText}>Search Health Problem/Symptoms</Text>
//           <TextInput
//             style={styles.textInputStyles}
//             placeholder="Eg. Cold, Fever"
//             leftIcon={
//               <Ionicons
//                 name={'search'}
//                 color={'#00000066'}
//                 style={{fontSize: responsiveFontSize(3)}}
//               />
//             }
//           />
//         </View>
//       </HeaderBg>
//       <View style={styles.pageContainer}>
//         <ScrollView>
//           <ProviersConsulted
//             drImage={ImagePath.profileImage}
//             drName={'Dr. Jimmy Joh'}
//             drSpeciality={'Specialist Cardiologist'}
//             drDate={'10-06-2021'}
//           />
//           <ProviderListComponent title='Choose Top Specialities' providerData={specilistData} />
//           <ProviderListComponent title='Health Issues' providerData={healthissuedata} />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default InstantConsultationScreen;
