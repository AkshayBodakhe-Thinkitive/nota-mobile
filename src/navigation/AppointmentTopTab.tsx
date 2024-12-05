import React from 'react';
// import {FontType} from '../constants/FontType';
// import {colors} from '../constants/Colors';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';

import { useWindowDimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import PastAppointments from '../screens/appointment/PastAppointments';
import UpcomingAppointments from '../screens/appointment/UpcomingAppointments';

const renderScene = SceneMap({
  first: UpcomingAppointments,
  second: PastAppointments,
});

export default function AppointmentTopTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming'},
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
