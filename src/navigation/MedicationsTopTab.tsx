import React from 'react';
// import {FontType} from '../constants/FontType';
// import {colors} from '../constants/Colors';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';

import { useWindowDimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CurrentMedications from '../screens/medicalRecord/components/Medications/CurrentMedications';
import PastMedications from '../screens/medicalRecord/components/Medications/PastMedications';

const renderScene = SceneMap({
  first: CurrentMedications,
  second: PastMedications,
});

export default function MedicationsTopTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Current'},
    {key: 'second', title: 'Past'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
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
          }}
          style={{backgroundColor: colors.white, height: responsiveHeight(5)}}
        />
      )}
    />
  );
}
