import React from 'react';
import {colors} from '../assets/colors';
import {fontType} from '../assets/fontType';

import {Platform, useWindowDimensions} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ContactScreen from '../screens/profile/Screens/ContactScreen';
import IdentificationScreen from '../screens/profile/Screens/IdentificationScreen';
import PrivacyScreen from '../screens/profile/Screens/PrivacyScreen';
import PrivacyHolderScreen from '../screens/profile/Screens/PrivacyHolderScreen';

const renderScene = SceneMap({
  first: IdentificationScreen,
  second: ContactScreen,
  // third: PrivacyScreen,
  // four: PrivacyHolderScreen
});

export default function EditDemographicTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Identification'},
    {key: 'second', title: 'Contact'},
    // {key: 'third', title: 'Privacy'},
    // {key: 'four', title: 'Policy Holder'},
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
          // scrollEnabled={true}
          inactiveColor={colors.grey}
          labelStyle={{
            fontSize: 16,
            fontFamily: fontType.Roboto_Regular,
            textTransform: 'capitalize',
            marginTop: responsiveHeight(1),
          }}
          style={{
            backgroundColor: '#0097F014',
            height: Platform.OS === 'android' ? responsiveHeight(7) : '7%',
          }}
        />
      )}
    />
  );
}
