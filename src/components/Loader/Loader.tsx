import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {LoaderStyle} from './LoaderStyle';
import { colors } from '../../Constants1/Colors';


export const Loader = () => {
  return (
      <View style={LoaderStyle.loader}>
        <ActivityIndicator size="large" color={'#0080CB'} />
      </View>
  );
};

export default Loader;
