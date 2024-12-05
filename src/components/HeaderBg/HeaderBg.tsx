import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
// import { ImagePath } from '../../constants/ImagePaths'
import { ImagePath1 } from '../../Constants1/ImagePathConstant1'

const HeaderBg = ({children,height}:any) => {
  return (
    <View style={{height: height == 'undefined' ? '25%' : height}}>
    <ImageBackground
      source={ImagePath1.gradientBgImage}
      resizeMode="cover"
      style={styles.imgBg}>
      <SafeAreaView style={styles.safeArea}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  </View>
  )
}

export default HeaderBg

const styles = StyleSheet.create({
    imgBg : {
        width: '110%',
        height: '100%',
        left: -20,
        top:-10,
        position: 'absolute',
        shadowOpacity:0.5,
        flex: 1,
      },
      safeArea : {height: '100%', width: '90%', alignSelf: 'center'},
     
})