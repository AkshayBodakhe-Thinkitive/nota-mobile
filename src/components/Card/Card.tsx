import React, { ReactNode } from 'react';
import { DimensionValue, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
// import {colors} from '../../constants/Colors';
import { colors } from '../../assets/colors';

const Card = ({ children, style, height = 120, width = 110, touchable = false }: Props) => {
  if (touchable) {
    return (
      <TouchableOpacity style={[styles.container, { height, width }, style]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.container, { height, width }, style]}>
        {children}
      </View>
    );
  }
};


export default Card;

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    height: 120,
    width: 110,
    borderRadius: 8,
  },
});

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  touchable?: boolean;
}
