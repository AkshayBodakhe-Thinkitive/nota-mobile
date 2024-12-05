import {View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {TextInputStyles as styles} from './TextInputStyles';
import { fontType } from '../../../../assets/fontType';

const TextInputBox = ({label, style, onChangeText, secureTextEntry,onBlur,onFocus}: Props) => {
  return (
    <View>
      <TextInput
      theme={{
        fonts:{
        bodyLarge:{
          fontFamily: fontType.outfit400
        }
      }}}
        mode="outlined"
        label={label}
        textColor="black"
        activeOutlineColor="#0F9347"
        outlineColor="#B0B0B0"
        placeholderTextColor={'black'}
        outlineStyle={styles.outlineStyle}
        selectionColor="#717171"
        style={{...styles.textInputStyles, ...style}}
        contentStyle={styles.contentStyles}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </View>
  );
};

export default TextInputBox;

type Props = {
  label: string;
  style: Object;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  onBlur?: any;
  onFocus?: any;
};
