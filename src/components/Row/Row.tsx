import { StyleProp, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { RowStyles } from './RowStyles'

const Row = ({children,style,...props}:RowProps) => {
  return (
    <View style={[RowStyles.container,style]} {...props}>
      {children}
    </View>
  )
}

export default Row


interface RowProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}