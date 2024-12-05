import { Dimensions, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('screen');
export const LoaderStyle = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    // elevation: 2,
    alignItems: 'center',
    height: height,
    flex: 1,
    // borderWidth : 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // backgroundColor: 'pink'
  },
});
