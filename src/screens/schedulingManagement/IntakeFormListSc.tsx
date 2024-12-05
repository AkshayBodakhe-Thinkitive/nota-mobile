import React, {useEffect, useState} from 'react';
import {View, FlatList, Platform, StyleSheet, Text, Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {getIntakeFormAction} from '../../redux/reducers/home/aysnc-actions/getIntakeFormAction';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {colors} from '../../assets/colors';
import IntakeFormListCard from './components/intakeFormListCard';
import {fontType} from '../../assets/fontType';
import Loader from '../../components/Loader/Loader';
import {setIntakeForm} from '../../redux/reducers/home/HomeReducer';

const IntakeFormListSc = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {params} = route;

  const intakeFormData = useAppSelector(
    (state: RootState) => state.home.intakeFormData,
  );
  const isLoading = useAppSelector((state: RootState) => state.home.loading);
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const alertMessage = useAppSelector((state: RootState) => state.home.message);

  const [providerName, setProviderName] = useState('');
  const [providerGroupName, setProviderGroupName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (params?.data?.appointmentUuid) {
      dispatch(
        getIntakeFormAction({
          accessToken: loginData?.data?.accessToken,
          appointmentUuid: params?.data?.appointmentUuid,
        }),
      );
    }
  }, [params?.data?.appointmentUuid]);

  useEffect(() => {
    if (alertMessage === 'Patient intake form filled successfully') {
      dispatch(
        getIntakeFormAction({
          accessToken: loginData?.data?.accessToken,
          appointmentUuid: params?.data?.appointmentUuid,
        }),
      );
    }
  }, [alertMessage]);

  useEffect(() => {
    // Update state variables from fetched data
    if (intakeFormData?.data) {
      const {
        providerName,
        providerGroupName,
        appointmentDate,
        startTime,
        endTime,
        patientName,
        content,
      } = intakeFormData.data.content;

      setProviderName(providerName);
      setProviderGroupName(providerGroupName);
      setAppointmentDate(appointmentDate);
      setStartTime(startTime);
      setEndTime(endTime);
      setPatientName(patientName);
      setContent(content);
    }
  }, [intakeFormData]);

  let formDataValues: any = [];
  const goBack = () => {
    navigation.pop();
  };
  const onTapNotification = () => {
    // setNotification(true);

    navigation.navigate('NotificationSc');
  };

  const mapIntakeFormDataToShow = () => {
    let content = intakeFormData?.data?.content;
    if (content) {
      let convertedData: [String] = content?.map((item: any) => {
        let obj = {
          label: item.label,
          isRequired: false,
          type: '',
          value: '',
          values: [
            {
              label: '',
              value: '',
            },
          ],
        };

        switch (item?.type) {
          case 'textfield':
            break;
          case 'textarea':
            break;
          case 'Password':
            break;
          case 'selectBoxes':
            break;
          case 'radio':
            break;
          case 'checkbox':
            break;
          case 'select':
            break;
          case 'number':
            break;
          case 'button':
            break;
          default:
            break;
        }

        return `${item?.drugCatalog?.medicine}, `;
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '16%'}>
        <TopNavigationView
          title="Intake forms"
          onTap={goBack}
          onTapNotification={onTapNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.intakeFormContainer}>
        {intakeFormData?.data?.empty === false ? (
          <FlatList
            data={intakeFormData?.data?.content}
            renderItem={({item}) => {
              return (
                <IntakeFormListCard
                  data={item}
                  onTap={() => {
                    if (item?.intakeFormStatus != 'COMPLETED') {
                      let parsedJSON = item?.content;
                      dispatch(setIntakeForm(parsedJSON));
                      navigation.navigate('IntakeFormScreen', {
                        formId: item?.id,
                      });
                    } else {
                      Alert.alert('', 'Intake form already submitted', [
                        {
                          text: 'Ok',
                          style: 'cancel',
                        },
                      ]);
                    }
                  }}
                />
              );
            }}
          />
        ) : (
          <View style={{height: 100, width: '100%'}}>
            <Text
              style={{
                top: 50,
                alignSelf: 'center',
                fontFamily: fontType.Roboto,
                // fontWeight: 20,
                color: 'black',
              }}>
              No Intake form found
            </Text>
          </View>
        )}
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default IntakeFormListSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  intakeFormContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
