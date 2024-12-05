import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import {useAppDispatch} from '../../redux/store/hooks';
import {getInsuranceAction} from '../../redux/reducers/home/aysnc-actions/getInsuranceAction';
import InsuraceDetails from './InsuraceDetails';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';

const CurrentInsuranceSc = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInsuranceAction());
  }, []);

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <HeaderBg height={'16%'}>
        <TopNavigationView
          title="Current Insurance"
          onTap={goBack}
          source1={ImagePath1.backImage}
          source2={ImagePath1.notificationImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={styles.pageContainer}>
      <InsuraceDetails />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
  },
});

export default CurrentInsuranceSc;
