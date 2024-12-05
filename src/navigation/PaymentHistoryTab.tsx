import React from 'react';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';
import { useWindowDimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CardsList from '../screens/payments/CardsList';
import PaymentHistory from '../screens/payments/PaymentHistory';

const renderScene = SceneMap({
  first: CardsList,
  second: PaymentHistory,
});

export default function PaymentHistoryTopTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Card Details'},
    {key: 'second', title: 'Payment History'},
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
