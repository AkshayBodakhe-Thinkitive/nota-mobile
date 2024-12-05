import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
// import { fontType } from '../../assets/fontType';
import { fontType } from '../../assets/fontType';
// import { InputBoxStyle } from '../../authentication/Components/InputBox/InputBoxStyle';
import { InputBoxStyle } from './InputBoxStyle';

const InputBox = ({
  label,
  onChange,
  error,
  secureTextEntry,
  style,
  value,
  editable,
  contentStyle,
}: Props) => {
  const [dispPass, setDispPass] = useState(true);
  const [text, setText] = useState('');

  const returnText = (val: string) => {
    onChange && onChange(val);
    setText(val);
  };

  return (
    <View
      style={[
        style
          ? style
          : error === false
          ? InputBoxStyle.marginTop
          : InputBoxStyle.marVertical,
        style,
        {justifyContent: 'center'},
      ]}>
      <TextInput
        // mode="outlined"
        label={label}
        theme={{
          fonts: {
            bodyLarge: {
              fontFamily: fontType.outfit400,
            },
          },
          colors: {
            onSurfaceVariant: '#898989',
          },
        }}
        value={value}
        autoCapitalize="none"
        // activeOutlineColor="#898989"
        placeholderTextColor={'gray'}
        outlineStyle={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#B0B0B0',
        }}
        // selectionColor="#717171"
        textColor="Black"
        style={InputBoxStyle.whiteback}
        contentStyle={[InputBoxStyle.font, contentStyle]}
        onChangeText={returnText}
        secureTextEntry={secureTextEntry ? dispPass : false}
        editable={editable}
      />
      {secureTextEntry === true && text.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setDispPass(!dispPass);
          }}
          style={InputBoxStyle.eye}>
          <Icon name={dispPass ? 'eye-off' : 'eye'} color={'green'} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;

type Props = {
  onChange?: (val: string) => void;
  label?: string;
  secure?: boolean;
  error?: boolean;
  secureTextEntry?: boolean;
  style?: object;
  value?: string;
  editable?: boolean;
  contentStyle?: any;
};
