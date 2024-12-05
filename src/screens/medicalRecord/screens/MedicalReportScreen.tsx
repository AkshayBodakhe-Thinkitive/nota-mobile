import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderBg from '../../../components/HeaderBg/HeaderBg';
import { colors } from '../../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { fontType } from '../../../assets/fontType';
import TopNavigationView from '../../../common/topNavigationView';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';
import MedicalReportCard from '../components/medicalreportcard/MedicalReportCard';
import {
  diagnosisArray,
  labTestArray,
  radiologyArray,
} from '../constants/StringCostants';

const MedicalReportScreen = ({navigation}: any) => {
  const goBack = () => {
    navigation.pop();
  };
  const goToNotification = () => navigation.navigate('NotificationSc')
  const [selectedOption, setSelectedOption] = useState('Lab');

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white, paddingBottom: 80}}>
      <HeaderBg height={Platform.OS === 'android' ? '20%' : '22%'}>
        <TopNavigationView
          title="Medical Reports"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => handleOptionSelect('Lab')}
            style={[
              styles.tab,
              selectedOption === 'Lab' && styles.selectedTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedOption === 'Lab' ? colors.white : colors.navala_grey,
                },
              ]}>
              Lab
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionSelect('Radiology')}
            style={[
              styles.tab,
              selectedOption === 'Radiology' && styles.selectedTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedOption === 'Radiology' ? colors.white : colors.navala_grey,
                },
              ]}>
              Radiology
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionSelect('Diagnosis')}
            style={[
              styles.tab,
              selectedOption === 'Diagnosis' && styles.selectedTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedOption === 'Diagnosis' ? colors.white : colors.navala_grey,
                },
              ]}>
              Diagnosis
            </Text>
          </TouchableOpacity>
        </View>
      </HeaderBg>
      <MedicalReportCard
        data={
          selectedOption === 'Lab'
            ? labTestArray
            : selectedOption === 'Radiology'
            ? radiologyArray
            : diagnosisArray
        }
      />
    </View>
  );
};

export default MedicalReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  optionButton: {
    padding: 10,
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  contentText: {
    fontSize: 20,
  },
  tabContainer: {
    marginHorizontal: responsiveHeight(2),
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0097F01A',
    borderRadius: 8,
  },
  tab: {
    padding: 4,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(1.8),
  },
});
