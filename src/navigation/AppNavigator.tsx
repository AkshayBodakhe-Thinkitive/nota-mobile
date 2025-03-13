import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DrawerNavigationSc from '../screens/DrawerNavigationSc';
import {useAppSelector} from '../redux/store/hooks';
import {RootState} from '../redux/store/storeConfig';
import UpcomingAppointments from '../screens/appointment/UpcomingAppointments';
import AppointmentCard from '../screens/appointment/components/AppointmentCard/AppointmentCard';
import BookAppointmentScreen from '../screens/appointment/screens/BookAppointmentScreen';
import BookandPay from '../screens/appointment/screens/BookandPay';
import PaymentScreen from '../screens/appointment/screens/PaymentScreen';
import ProvidersListScreen from '../screens/appointment/screens/ProvidersListScreen';
import EnvironmentSetupSc from '../screens/authentication/screens/EnvironmentSetupSc';
import ForgotPassword from '../screens/authentication/screens/ForgotPassword';
import SetNewPassword from '../screens/authentication/screens/SetNewPassword';
import {SignIn} from '../screens/authentication/screens/SignInSc';
import SignUpSc from '../screens/authentication/screens/SignUpSc';
import SplashScreen from '../screens/authentication/screens/SplashScreen';
import VerifyOPTSc from '../screens/authentication/screens/VerifyOPTSc';
import VerifyOtp from '../screens/authentication/screens/VerifyOtp';
import AssessmentSc from '../screens/checkInWaititngRoom/AssessmentSc';
import AllergySc from '../screens/medicalRecord/screens/AllergySc';
import DemographicScreen from '../screens/medicalRecord/screens/DemographicScreen';
import {MedicalRecordsMenu} from '../screens/medicalRecord/screens/MedicalRecordsMenu';
import MedicalReportScreen from '../screens/medicalRecord/screens/MedicalReportScreen';
import MedicationSc from '../screens/medicalRecord/screens/MedicationSc';
import ProblemSc from '../screens/medicalRecord/screens/ProblemSc';
import VaccineSc from '../screens/medicalRecord/screens/VaccineSc';
import VisitHistorySc from '../screens/medicalRecord/screens/VisitHistorySc';
import VitalsSc from '../screens/medicalRecord/screens/VitalsSc';
import AddMemberScreen from '../screens/member/screen/AddMemberScreen';
import MemberListScreen from '../screens/member/screen/memberListScreen';
import Mybills from '../screens/payments/Mybills';
import NotificationSc from '../screens/notification/NotificationSc';
import EditDemographicsScreen from '../screens/profile/EditDemographicsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import {HealthPlanSc} from '../screens/profile/HealthPlanSc';
import InsuranceDetailTabScreen from '../screens/profile/InsuranceDetailTabScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PrivacyHolderScreen from '../screens/profile/Screens/PrivacyHolderScreen';
import BookAppointmentSc from '../screens/schedulingManagement/BookAppointmentSc';
import CurrentInsuranceSc from '../screens/schedulingManagement/CurrentInsuranceSc';
import EprescriptionSc from '../screens/schedulingManagement/EprescriptionSc';
import InstanceVideoConsultSc from '../screens/schedulingManagement/InstanceVideoConsultSc';
import LabTestSc from '../screens/schedulingManagement/LabTestSc';
import {CallScreen} from '../screens/zoomvideo/screens/CallScreen';
import ReadyToJoin from '../screens/zoomvideo/screens/ReadyToJoin';
import TopProvidersSc from '../screens/Home/TopProvidersSc';
import MessagesSc from '../screens/Message/MessagesSc';
import ChatSc from '../screens/Message/ChatSc';
import VisitHistoryDetailsSc from '../screens/medicalRecord/screens/VisitHistoryDetailsSc';
import ConsultedProvidersSc from '../screens/Home/ConsultedProvidersSc';
import IntakeForm from '../screens/schedulingManagement/IntakeFormSc';
import IntakeFormScreen from '../screens/schedulingManagement/IntakeFormSc';
import IntakeFormListSc from '../screens/schedulingManagement/IntakeFormListSc';
import Loader from '../components/Loader/Loader';
import VisitHistoryDetails from '../screens/medicalRecord/screens/VisitHistory';
import AddInsurance from '../screens/schedulingManagement/AddInsurance';
import InsuranceDatailScreen from '../screens/schedulingManagement/InsuranceDatailScreen';
import AddCard from '../screens/payments/AddCard';
import RescheduleAppointment from '../screens/appointment/screens/RescheduleAppointment';
import VitalHistoryScreen from '../screens/medicalRecord/screens/VitalHistoryScreen';
import SettingSc from '../screens/profile/SettingSc';
import DocumentsScreen from '../screens/documents/DocumentsScreen';
import DocumentUploadScreen from '../screens/documents/DocumentUploadScreen';
import AddVitalsScreen from '../screens/medicalRecord/screens/AddVitalsScreen';
import AddMedication from '../screens/medicalRecord/screens/AddMedicationScreen';
import AddAllergy from '../screens/medicalRecord/screens/AddAllergyScreen';
import AddVaccine from '../screens/medicalRecord/screens/AddVaccine';
import AddDiagnosis from '../screens/medicalRecord/screens/AddDiagnosis';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
  Signup: undefined;
  ForgotPasswordSc: undefined;
  VerifyOPT: undefined;
  LogOutPopup: undefined;
  HomeSc: undefined;
  NotificationSc: undefined;
  Mybills: undefined;
  AppointmentSc: undefined;
  InstanceVideoConsultSc: undefined;
  ForgotPassword: undefined;
  SetNewPassword: undefined;
  SettingSc: undefined;
  SignUpSc: undefined;
  ProvidersListScreen: undefined;
  UpcomingAppointments: undefined;
  AppointmentCard: undefined;
};

export const Stack = createNativeStackNavigator();
const AppNavigator = (): JSX.Element => {
  const [isAppReady, setIsAppReady] = useState(false);
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);
  const homeLoading = useAppSelector((state: RootState) => state.home.loading);
  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 1000);
  }, []);

  if (!isAppReady) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={!loggedIn ? 'SignIn' : 'DrawerNavigationSc'}>

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{unmountOnBlur: true, headerShown: false}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ProfileScreen"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="SignUpSc"
            component={SignUpSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerTitle: 'Forgot Password'}}/>
          <Stack.Screen name="VerifyOPTSc" component={VerifyOPTSc} options={{headerTitle: 'Verify OTP'}}/>
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{headerTitle: 'Verify OTP'}}/>
          <Stack.Screen name="SetNewPassword" component={SetNewPassword}   options={{headerTitle: 'Set new password'}}/>
          <Stack.Screen
            name="DrawerNavigationSc"
            component={DrawerNavigationSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Mybills"
            component={Mybills}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Message"
            component={MessagesSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Chat'}
            component={ChatSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppointmentCard"
            component={AppointmentCard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProvidersListScreen"
            component={ProvidersListScreen}
            options={{headerShown: false}}
            unmountOnBlur={true}
          />
          <Stack.Screen
            name="BookAppointmentSc"
            component={BookAppointmentSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AssessmentSc"
            component={AssessmentSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HealthPlanSc"
            component={HealthPlanSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationSc"
            component={NotificationSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InstanceVideoConsultSc"
            component={InstanceVideoConsultSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CurrentInsuranceSc"
            component={CurrentInsuranceSc}
            options={{headerShown: false}}
          />
          <Stack.Screen name="eprescriptionSc" component={EprescriptionSc} />
          <Stack.Screen name="LabTestSc" component={LabTestSc} />
          <Stack.Screen
            name="SettingSc"
            component={SettingSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DemographicScreen"
            component={DemographicScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VitalsSc"
            component={VitalsSc}
            options={{headerShown: false}}
          />
             <Stack.Screen
            name="AddVitals"
            component={AddVitalsScreen}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="VitalHistoryScreen"
            component={VitalHistoryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProblemSc"
            component={ProblemSc}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="AddDiagnosis"
            component={AddDiagnosis}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AllergySc"
            component={AllergySc}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="AddAllergy"
            component={AddAllergy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MedicationSc"
            component={MedicationSc}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="AddMedication"
            component={AddMedication}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MedicalReportScreen"
            component={MedicalReportScreen}
            options={{headerShown: false}}    
          />
            <Stack.Screen
            name="DocumentsScreen"
            component={DocumentsScreen}
            options={{headerShown: false}}   
          />
          <Stack.Screen
            name="VaccineSc"
            component={VaccineSc}
            options={{headerShown: false}}
          />
              <Stack.Screen
            name="AddVaccine"
            component={AddVaccine}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VisitHistorySc"
            component={VisitHistorySc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VisitHistoryDetailsSc"
            component={VisitHistoryDetailsSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'bookappointment'}
            component={BookAppointmentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'payment'}
            component={PaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'bookandpay'}
            component={BookandPay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'UpcomingAppointments'}
            component={UpcomingAppointments}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EnvironmentSetup"
            component={EnvironmentSetupSc}
          />
          <Stack.Screen
            name={'InsuranceDetailTabScreen'}
            component={InsuranceDetailTabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'AddInsurance'}
            component={AddInsurance}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'InsDetails'}
            component={InsuranceDatailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'EditDemographicsScreen'}
            component={EditDemographicsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'PrivacyHolderScreen'}
            component={PrivacyHolderScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'MemberListScreen'}
            component={MemberListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'MedicalRecordsMenu'}
            component={MedicalRecordsMenu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'AddMemberScreen'}
            component={AddMemberScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ReadyToJoin'}
            component={ReadyToJoin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'CallScreen'}
            component={CallScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'TopProvidersScreen'}
            component={TopProvidersSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ConsultedProvidersScreen'}
            component={ConsultedProvidersSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'IntakeFormScreen'}
            component={IntakeFormScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'IntakeFormListScreen'}
            component={IntakeFormListSc}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VisitHistoryDetails"
            component={VisitHistoryDetails}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="addcard"
            component={AddCard}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name={'rescheduleappointment'}
            component={RescheduleAppointment}
            options={{headerShown: false,animation:'slide_from_bottom'}}  
          />

            <Stack.Screen
            name={'DocumentUploadScreen'}
            component={DocumentUploadScreen}
            options={{headerShown: false,animation:'slide_from_bottom'}}  
          />
        </Stack.Navigator>
        {/* EditDemographicsScreen */}
      </NavigationContainer>
      {homeLoading && <Loader />}
    </>
  );
};

export default AppNavigator;
