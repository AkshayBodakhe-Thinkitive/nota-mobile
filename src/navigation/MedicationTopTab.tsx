import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import { colors } from '../constants/Colors';
import { colors } from '../assets/colors';
// import { FontType } from '../constants/FontType';
import { fontType } from '../assets/fontType';
// import LabScreen from '../screens/medical-records/screens/LabScreen';
import LabSc from '../screens/medicalRecord/screens/LabSc';
// import MedicinesScreen from '../screens/medical-records/screens/MedicinesScreen';
import { medicationTitleHanlder } from '../redux/reducers/medicalrecord/medicalRecordReducer';
import { useAppDispatch } from '../redux/store/hooks';
import MedicinesSc from '../screens/medicalRecord/screens/MedicinesSc';

const renderScene = SceneMap({
    first: LabSc,
    second: MedicinesSc,
});

const MedicationTopTab = () => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Lab'},
    {key: 'second', title: 'Medicines'},
  ]);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    
    dispatch(medicationTitleHanlder(newIndex === 0 ? true : false));
  };
  useEffect(()=>{
    dispatch(medicationTitleHanlder(index === 0 ? true : false));
  }, [])

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.primary}}
          activeColor={colors.primary}
          inactiveColor={colors.grey90}
          labelStyle={{
            fontSize: responsiveFontSize(1.8),
            fontFamily: fontType.Roboto_Regular,
            textTransform: 'capitalize',
            marginTop: responsiveHeight(1.2),
          }}
          style={{backgroundColor: '#0097F014', height: responsiveHeight(6)}}
        />
      )}
    />
  );
};


export default MedicationTopTab;

const styles = StyleSheet.create({});
