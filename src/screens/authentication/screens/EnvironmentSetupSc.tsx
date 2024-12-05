import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors';
import {heights, showAlert} from '../../../common/dimensionConstant';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import TextInput from '../../../components/TextInput/TextInput';
import {EnvSetup, setBaseUrl} from '../../../redux/reducers/auth/AuthReducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store/hooks';
import {RootState} from '../../../redux/store/storeConfig';

export default function EnvironmentSetupSc() {
  const [isSecureEntry, setSecureEntry] = useState(false);
  let passwordTxt = '';
  const dispatch = useAppDispatch();
  const envData = useAppSelector(
    (state: RootState) => state.auth.selectedEnvironment,
  );

  const EnvCard = (props: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(EnvSetup(props.title));
          dispatch(setBaseUrl(props.url));
          showAlert(
            'Alert',
            `Environment set to ${props.title}\nPlease restart App to reflect changes`,
          );
        }}>
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                envData == props.title ? 'blue' : colors.app_color1,
            },
          ]}>
          <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <EnvCard title={'PROD'} url={'https://api.navalaglobal.com/api/master'}/>
        <EnvCard title={'DEV'} url={'https://dev.api.navalaglobal.com/api/master'}/>
      </View>
      <View style={{flexDirection: 'row'}}>
        <EnvCard title={'QA'} url={'https://qa.api.navalaglobal.com/api/master'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.new_grey,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: colors.yellow,
    margin: 10,
    height: heights.height / 4,
    width: heights.width / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
