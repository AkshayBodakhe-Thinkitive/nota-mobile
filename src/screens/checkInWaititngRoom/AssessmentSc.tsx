// Import necessary modules
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import { Text } from 'react-native-paper';
import TopNavigationView from '../../common/topNavigationView';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';
import KeyValuePairs from '../medicalRecord/components/keyvaluepair/KeyValuePair';
import {
  KEY_MAPPING_OBJECT_ASSESSMENT,
  asssessmentArray,
} from '../medicalRecord/constants/StringCostants';
import { AssessmentStyles as styles } from '../medicalRecord/styles/DemoGraphicScreenStyles';
import AssessmentCard from './componants/AssessmentCard';

// Define your component
const AssessmentSc = ({navigation}: any) => {
  const goBack = () => {
    navigation.pop();
  };
  return (
    // Wrap your entire application in GestureHandlerRootView
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderBg height={Platform.OS === 'android' ? '20%' : '22%'}>
          <TopNavigationView
            title="Assessments"
            onTap={goBack}
            source1={ImagePath1.backImage}
            source2={ImagePath1.notificationImage}
            isbuttonshow={true}
          />
        </HeaderBg>
        <ScrollView style={styles.scrollView}>
          <AssessmentCard title={'Fever Assessment'}>
            <KeyValuePairs
              dataArray={asssessmentArray}
              keyMapping={KEY_MAPPING_OBJECT_ASSESSMENT}
              labelStyle={{width: '40%'}}
              valueStyle={styles.value}
            />
            <View>
              <TouchableOpacity style={styles.btnStyle}>
                <Text style={{alignSelf: 'center'}}>Start Assessment</Text>
              </TouchableOpacity>
            </View>
          </AssessmentCard>
          <AssessmentCard title={'Fever Assessment'}>
            <KeyValuePairs
              dataArray={asssessmentArray}
              keyMapping={KEY_MAPPING_OBJECT_ASSESSMENT}
              labelStyle={{width: '40%'}}
            />
            <View>
              <TouchableOpacity style={styles.btnStyle}>
                <Text style={{alignSelf: 'center'}}>Start Assessment</Text>
              </TouchableOpacity>
            </View>
          </AssessmentCard>
          <AssessmentCard title={'Fever Assessment'}>
            <KeyValuePairs
              dataArray={asssessmentArray}
              keyMapping={KEY_MAPPING_OBJECT_ASSESSMENT}
              labelStyle={{width: '40%'}}
            />
            <View>
              <TouchableOpacity style={styles.btnStyle}>
                <Text style={{alignSelf: 'center'}}>View Assessment</Text>
              </TouchableOpacity>
            </View>
          </AssessmentCard>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default AssessmentSc;
