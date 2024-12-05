import React from 'react';
// import {FontType} from '../constants/FontType';
// import {colors} from '../constants/Colors';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';
import FamilyDetailTabScreen from '../screens/profile/FamilyDetailTabScreen';
import PersonalDetailTabScreen from '../screens/profile/PersonalDetailTabScreen';

import { Platform, useWindowDimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import InsuranceDetailTabScreen from '../screens/profile/InsuranceDetailTabScreen';

const renderScene = SceneMap({
  first: PersonalDetailTabScreen,
  second: FamilyDetailTabScreen,
  third: InsuranceDetailTabScreen,
});

export default function ProfileTabNavigator() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Personal Details'},
    // {key: 'second', title: 'Family Details'},
    // {key: 'third', title: 'Insurance'},
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
        
          inactiveColor={colors.grey}
          labelStyle={{
            fontSize: responsiveFontSize(2),
            fontFamily: fontType.Roboto_Regular,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            marginTop: responsiveHeight(1),
          }}
          style={{
            backgroundColor: '#0097F014',
            elevation:0,
            height:
              Platform.OS === 'android'
                ? responsiveHeight(7)
                : responsiveHeight(6),
          }}
        />
      )}
    />
  );
}
