import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {colors} from '../../assets/colors';
import SmallButton from '../../components/SmallButton/SmallButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import { postIntakeFormAction } from '../../redux/reducers/home/aysnc-actions/postIntakeFormAction';
import { setIsShowMessage } from '../../redux/reducers/home/HomeReducer';
import TextInput from '../../components/TextInput/TextInput';
import DropdownComponent from '../../components/Dropdown/DropDown';
import RadioGroup from './components/RadioGroup';

const IntakeFormScreen = ({route, navigation}:any) => {
  const dispatch = useAppDispatch();
  const {params} = route;

  const IntakeForm = useAppSelector(
    (state: RootState) => state.home.intakeForm,
  );
  const loginData = useAppSelector((state: RootState) => state.auth.loginData);
  const isShowMessage = useAppSelector(
    (state: RootState) => state.home.isShowMessage,
  );
  const alertMessage = useAppSelector((state: RootState) => state.home.message);
  const [formData, setformData] = useState([]);
  const [flag, setFlag] = useState(false);
  const {height, width} = Dimensions.get('screen');

  // console.log('IntakeForm =>',JSON.stringify(IntakeForm))

  useEffect(() => {
    mapIntakeFormDataToShow();
  }, [IntakeForm]);

  useEffect(() => {
    if (isShowMessage) {
      Alert.alert('', alertMessage, [
        {
          text: 'Ok',
          style: 'cancel',
          onPress: () => {
            dispatch(setIsShowMessage(false));
            goBack();
          },
        },
      ]);
    }
  }, [isShowMessage]);

  const goBack = () => {
    navigation.pop();
  };
  const onTapNotification = () => {
    navigation.navigate('NotificationSc');
  };

  const mapIntakeFormDataToShow = () => {

    let components = IntakeForm?.components;
    if (components) {
      let convertedData = components?.map((item: any) => {
        let values;
        if (item?.type == 'select') {
          values = item?.data?.values;
        } else {
          values = item?.values; // JSON.stringify(item?.values);
        }
        // if (values != undefined && values != null && values != '') {
        //   values = JSON.parse(values);
        // }
        let obj = {
          label: item?.label,
          placeholder : item?.placeholder,
          isRequired: item?.validate?.required
            ? item?.validate?.required
            : false,
          defaultValue: item?.type == 'button' ? 'Submit' :'',
          type: item?.type,
          values: values,
        };
        return obj;
      });
      // console.log('Mapped Form Data:', convertedData);
      setformData(convertedData);
    }
  };

  const RequiredStart = (isRequired: boolean) => {
    return isRequired ? <Text style={styles.requiredStar}>*</Text> : null;
  };

  //   let id = 0;
  //   let array = item?.values?.map((item: any, index: any) => {
  //     id = id + 1;
  //     return {
  //       value: item?.value,
  //       label: item?.label ? item?.label : 'Unknown',
  //       id: item?.value,
  //     };
  //   });
  //   return (
  //     <View
  //       style={{
  //         width: '100%',
  //         flexWrap: 'wrap',
  //         flexDirection: 'column',
  //         marginVertical: 10, 
  //         // borderWidth:1
  //       }}>
  //       <Text style={[styles.questionText, {width: '100%', marginBottom: 3}]}>
  //         {item?.label}
  //       </Text>
  //       <RadioGroup
  //         radioButtons={array}
  //         onPress={(value:any) => {
  //           let val;
  //           let set =
  //             item?.values &&
  //             item?.values.length > 0 &&
  //             item?.values.map((item: any, index: number) => {
  //               if (value == item?.value) {
  //                 val = item;
  //               }
  //             });
  //             console.log('val==>',val)
  //           onChange(val);
  //         }}
          
  //         selectedId={selectedValue?.value}
  //         containerStyle={{width: '50%', alignItems: 'flex-start'}}
  //         labelStyle={{width: '50%',}}
          
  //       />
  //     </View>
  //   );
  // };

  const CustomRadioButton = ({ onChange, item, selectedValue }:any) => {
    let array = item?.values?.map((item:any) => {
      return {
        value: item?.value,
        label: item?.label ? item?.label : 'Unknown',
        id: item?.value,
      };
    });
  
    return (
      <View style={styles.container}>
        <Text style={[styles.questionText, {width: '100%', marginBottom: 3}]}>
          {item?.label}
        </Text>
        <RadioGroup
          radioButtons={array}
          onPress={(value:any) => {
            onChange(value);
          }}
          selectedId={selectedValue}
          containerStyle={{width: '50%', alignItems: 'flex-start'}}
          labelStyle={{width: '50%',color:'black'}}
        />
      </View>
    );
  };
  
  const CustomCheckbox = ({item, onChange, selectedValue}: any) => {

    return (
      <View style={{marginVertical: 15}}>
        <Text style={{fontWeight: 'bold', marginLeft: 4, marginBottom: 9,color:'black'}}>
          {item?.label}
        </Text>
        {item?.values &&
          item?.values.length > 0 &&
          item?.values?.map((item2: any, index: number) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{marginVertical: 4}}
                  onPress={() => {
                    let newSelectedValues: any[] = [];
                    if (selectedValue) {
                      newSelectedValues = [...selectedValue];
                    }
                    if (selectedValue && selectedValue.includes(item2)) {
                      const index = newSelectedValues?.indexOf(item2);
                      newSelectedValues?.splice(index, 1);
                    } else {
                      newSelectedValues?.push(item2);
                    }
                    onChange(newSelectedValues);
                    // setSelectedValues(!selectedValues);
                  }}
                  >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Check
                     color={ selectedValue?.includes(item2) ? colors.primary : colors.black}
                      name={
                        selectedValue?.includes(item2)
                          ? 'checkbox-outline'
                          : 'checkbox-blank-outline'
                      }
                      size={24}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', marginLeft: 4,color:'black'}}>
                  {item2?.label}
                </Text>
              </View>
            );
          })}
      </View>
    );
  };

  const SingleCheckbox = ({item, onChange, selectedValue}: any) => {
    return (
      <View style={{marginVertical: 15,flexDirection:'row',alignItems:'center'}}>
         <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            onChange(!selectedValue);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Check
              name={selectedValue ? 'checkbox-outline' : 'checkbox-blank-outline'}
              color={selectedValue ? colors.primary : colors.black}
              size={24}
            />
          </View>
          <Text style={{fontWeight: 'bold', marginLeft: 4,color:'black'}}>
            {item?.value?.label}
          </Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', marginLeft: 4,marginRight:5,color:'black',width:'90%'}}>
          {item?.label}
        </Text>
       
      </View>
    );
  };
  

  const renderItem = ({item, index}: any) => {
    let type = item?.type;

    switch (type) {
      case 'textfield':
        return (
          <View style={[styles.questionContainer,{marginHorizontal:5}]}>
            <Text style={styles.questionText}>
              {item?.label}
              {RequiredStart(item?.isRequired)}
            </Text>
            <TextInput
              value={item?.defaultValue}
              style={{width:'100%'}}
              placeholder={item?.placeholder}
              onChangeText={(text: string) => {
                let data: any = formData;
                let specificItem: any = data[index];
                specificItem.defaultValue = text;
                data[index] = specificItem;
                setformData(data);
                setFlag(!flag);
              }}
            />
          </View>
        );
      case 'textarea':
        return (
          <View style={[styles.questionContainer,{marginHorizontal:5}]}>
            <Text style={styles.questionText}>
              {item?.label}
              {RequiredStart(item?.isRequired)}
            </Text>
            <TextInput
              value={item?.defaultValue}
              onChangeText={(text: string) => {
                let data: any = formData;
                let specificItem: any = data[index];
                specificItem.defaultValue = text;
                data[index] = specificItem;
                setformData(data);
                setFlag(!flag);
                console.log('specificItem  ** ', specificItem);
              }}
            />
          </View>
        );
      case 'password':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {item?.label}
              {RequiredStart(item?.isRequired)}
            </Text>
            <TextInput
              value={item?.defaultValue}
              secureTextEntry={true}
              onChangeText={(text: string) => {
                let data: any = formData;
                let specificItem: any = data[index];
                specificItem.defaultValue = text;
                data[index] = specificItem;
                setformData(data);
                setFlag(!flag);
              }}
            />
          </View>
        );
      case 'number':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {item?.label}
              {RequiredStart(item?.isRequired)}
            </Text>
            <TextInput
              value={item?.defaultValue}
              keyboardType="numeric"
              onChangeText={(text: string) => {
                let data: any = formData;
                let specificItem: any = data[index];
                specificItem.defaultValue = text;
                data[index] = specificItem;
                setformData(data);
                setFlag(!flag);
              }}
            />
          </View>
        );
      case 'select':
        return (
          <View >
            <Text style={styles.questionText}>{item?.label}</Text>
            <DropdownComponent
            style={{marginHorizontal:4}}
            data={item?.values}
            placeholder={item?.placeholder}
            onValueChange={(value:any) =>{
              let data: any = formData;
              let specificItem: any = data[index];
              specificItem.defaultValue = value;
              data[index] = specificItem;
              setformData(data);
              setFlag(!flag);
            }}
            />
          </View>
        );
      case 'radio':
        return (
          <CustomRadioButton
            selectedValue={item?.defaultValue}
            
            item={item}
            onChange={(value: any) => {
              let data: any = formData;
              let specificItem: any = data[index];
              specificItem.defaultValue = value;
              data[index] = specificItem;
              setformData(data);
              setFlag(!flag);
            }}
          />
        );
      case 'selectboxes':
        return (
          <CustomCheckbox
            item={item}
            onChange={(value: any) => {
              let data: any = formData;
              let specificItem: any = data[index];
              specificItem.defaultValue = value;
              data[index] = specificItem;
              setformData(data);
              setFlag(!flag);
            }}
            selectedValue={item?.defaultValue != '' ? item?.defaultValue : []}
          />
        );
      case 'checkbox':
        return (
          <SingleCheckbox
          item={item}
          
          onChange={(value: any) => {
            let data: any = formData;
            let specificItem: any = data[index];
            specificItem.defaultValue = value;
            data[index] = specificItem;
            setformData(data);
            setFlag(!flag);
          }}
          selectedValue={item?.defaultValue || false}
        />
        )
      case 'button':
        return <View />;
      default:
        return <View />;
    }
  };

  const isValidToSubmit = () => {
    let notFilledRequiredItems = formData?.filter((item: any) => {
      if (item.isRequired == true && item.value == '') {
        return true;
      } else {
        return false;
      }
    });
    console.log('notFilledRequiredItems:', notFilledRequiredItems);
    if (
      notFilledRequiredItems != undefined &&
      notFilledRequiredItems != null &&
      notFilledRequiredItems?.length > 0
    ) {
      Alert.alert('Warning', 'Fill all the required fields', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      return false;
    } else {
      return true;
    }
  };

  const createFormJson = () => {
    // let contentData = JSON.stringify(formData);
    let contentData = formData;
    let content = {components : [...contentData]}
    let formId = params?.formId;
    let json = {
      id: formId,
      content: content,
    };

    return json;
  };

  const onSubmit = () => {
    let result = isValidToSubmit();
    if (result === true) {
      console.log('Ready to submit');
      let formJson = createFormJson();
      console.log('Form JSON:', formJson?.content);
      dispatch(
        postIntakeFormAction({
          accessToken: loginData?.data?.accessToken,
          formData: formJson,
        }),
      );
    }
  };

  // console.log(' formData **  ', formData);

  return (
    <View style={styles.container}>
      <HeaderBg
        height={
          Platform.OS === 'android'
            ? responsiveHeight(10)
            : responsiveHeight(16)
        }>
        <TopNavigationView
          title="Intake form"
          onTap={goBack}
          onTapNotification={onTapNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.15 : 0}
        style={[styles.intakeFormContainer, {flex: 1}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={formData}
          renderItem={renderItem}
          removeClippedSubviews={false}
        />
        <SafeAreaView style={{marginTop: 10}}>
          <SmallButton
            title="Submit"
            onPress={onSubmit}
            textStyle={{fontWeight:'600'}}
            containerStyle={{
              width: '100%',
              alignSelf: 'center',
              marginBottom: Platform.OS == 'android' ? 16 : 0
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default IntakeFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  intakeFormContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionContainer: {
    paddingVertical: 8,
  },
  questionText: {
    fontWeight: '600',
    paddingBottom: 4,
    color : 'black'
  },
  requiredStar: {
    color: colors.red,
    fontWeight: '500',
  },
  question: {
    fontWeight: '500',
    paddingBottom: 4,
    color:'black'
  },
});
