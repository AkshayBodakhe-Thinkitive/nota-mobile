import React from 'react';
import { StyleSheet, View } from 'react-native';

const CustomShapeView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperPart}>
        <View style={styles.middleView}></View>
      </View>
      <View style={styles.lowerPart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  upperPart: {
    height: 100,
    backgroundColor: '#3498db', // Adjust the color as per your design
    // borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    // borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  lowerPart: {
    flex: 1,
    // backgroundColor: '#ecf0f1', // Adjust the color as per your design
  },
  middleView: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default CustomShapeView;
