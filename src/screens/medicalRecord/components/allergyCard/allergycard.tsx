import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Card from '../../../../components/Card/Card';
import CustomText from '../../../../components/Text/CustomText';
// import {colors} from '../../../../constants/Colors';
import { colors } from '../../../../assets/colors';

const Allergycard = ({title, children,bordered}: any) => {
  return (
    <Card width={'100%'} style={{marginBottom: 10, height: null}}>
     {title && <View
        style={{
          borderBottomWidth: bordered ? 1 : 0,
          padding: 12,
          paddingBottom: bordered ? null : 0,
          borderColor: '#1A1A1A4D',
        }}>
        <CustomText color={colors.primary} fontSize={responsiveFontSize(2.2)}>
          {title}
        </CustomText>
      </View>}
      <View style={{flex: 1}}>{children}</View>
    </Card>
  );
};

export default Allergycard;

const styles = StyleSheet.create({});
