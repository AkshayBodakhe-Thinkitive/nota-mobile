import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
// import { colors } from '../../../constants/Colors';
import { colors } from '../../../assets/colors';
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';

const SplashScreen = () => {
  return (
    <View style={{height: '100%', width: '100%',backgroundColor: colors.white}}>
      <ImageBackground source={ImagePath1.navalaLogoWithNameImage}></ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
