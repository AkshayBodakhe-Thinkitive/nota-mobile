import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    View,
} from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';


const CustomDateTextField = (props: DateTextfieldProps) => {
  const [textDD, setTextDD] = useState('');
  const [textMM, setTextMM] = useState('');
  const [textYYYY, setTextYYYY] = useState('');

  const [errorMsg, setErrorMessage] = useState<any>('');

  useEffect(()=>{
    setErrorMessage(props?.errorMessage)
  },[props?.errorMessage])

  const MMRef = useRef<TextInput>(null);
  const DDRef = useRef<TextInput>(null);
  const YYYYRef = useRef<TextInput>(null);

  interface DaysInMonthsProps {
    month: number;
    year: number;
  }

  useEffect(() => {
    if (textMM == '' && textDD == '' && textYYYY == '') {
      return;
    }
    checkDateValidation();
  }, [textDD, textMM, textYYYY]);

  useEffect(() => {
    setDate();
  }, [props.isResetDate]);

  const sendSelectedDate = () => {
    setErrorMessage('');
    let month = textMM;
    let date = textDD;
    if (textMM.length == 1) {
      month = '0' + month;
    }
    if (textDD.length == 1) {
      date = '0' + date;
    }
    let concatedDate = date + '/' + month + '/' + textYYYY;
    let convertedDate = textYYYY + '-' + month + '-' + date + 'T00:00:00Z';
    props.onChange(concatedDate, convertedDate);
  };

  const setDate = () => {
    if (props.date == undefined || props.date == '' || props.date == null) {
      setTextMM('');
      setTextDD('');
      setTextYYYY('');
      return;
    }
    if (props.date == undefined || props.date == '') {
      return;
    }
    const parts = props.date.split('/');
    if (parts.length !== 3) {
      return;
    }
    let month = String(parseInt(parts[0], 10)); // Month is zero-indexed in Date object
    let day = String(parseInt(parts[1], 10));
    if (month.length == 1) {
      month = '0' + month;
    }
    if (day.length == 1) {
      day = '0' + day;
    }
    const year = String(parseInt(parts[2], 10));
    setTextDD(day);
    setTextMM(month);
    setTextYYYY(year);
  };
  useEffect(() => {
    props.onChangeError(errorMsg);
  }, [errorMsg]);

  const checkDateValidation = () => {
    const currentYear = new Date().getFullYear();
    const year = Number(textYYYY) || currentYear;
    const month = Number(textMM);
    const date = Number(textDD);
    if (textMM != '' && textDD != '' && textYYYY.length < 4) {
      setErrorMessage('Invalid year');
      return;
    }
    if (month > 12 || month == 0) {
      setErrorMessage('Invalid month');
    } else {
      const daysInMonth = getDaysInMonth({month: month, year: year});
      if (date > daysInMonth) {
        setErrorMessage(`Invalid date for month ${month}`);
      } else {
        if (
          !(
            textMM == '' ||
            textDD == '' ||
            textYYYY == '' ||
            textYYYY.length < 4
          )
        ) {
          if (isFutureDateSelected() && !props.canSelectFutureDate) {
            setErrorMessage('Cannot select future date');
          } else {
            sendSelectedDate();
          }
        } else {
          setErrorMessage('Invalid date');
        }
      }
    }
  };
  function isFutureDateSelected() {
    let today = new Date();
    const currentYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDate = String(today.getDate()).padStart(2, '0');
    let todayStr = `${currentYear}-${todayMonth}-${todayDate}`;
    let concatedSelectedDate = `${textYYYY}-${textMM}-${textDD}`;
    const selectedDate = new Date(concatedSelectedDate);
    const todaysDate = new Date(todayStr);
    return selectedDate.getTime() > todaysDate.getTime();
  }

  const getDaysInMonth = ({month, year}: DaysInMonthsProps) => {
    const date = new Date(year, month, 0);
    return date.getDate();
  };

  const onMMChange = (txt: any) => {
    setTextMM(txt);
    if (txt.length === 2) {
      DDRef.current?.focus();
    }
  };

  const onDDChange = (txt: any) => {
    setTextDD(txt);
    if (txt.length == 2) {
      YYYYRef.current?.focus();
    } else if (txt.length === 0) {
      MMRef.current?.focus();
    }
  };

  const onYYYYChange = (txt: any) => {
    setTextYYYY(txt);
    if (txt.length === 0) {
      DDRef.current?.focus();
    }
  };

  const onKeyPress = (event: TextInputKeyPressEventData, index: number) => {
    if (event.key === 'Backspace') {
      switch (index) {
        case 1:
          break;
        case 2:
          if (textDD == '') {
            onDDChange('');
          }
          break;
        case 3:
          if (textYYYY == '') {
            onYYYYChange('');
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      {props.title != '' && (
        <Text style={styles.labelStyles}>{props.title} {props.required && <Text style={{color:'red'}}>*</Text>}</Text>
      )}
      <View
        style={[styles.container, errorMsg == '' ? {marginBottom: 15} : {}]}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={MMRef}
            onKeyPress={({nativeEvent}) => onKeyPress(nativeEvent, 1)}
            cursorColor={'grey'}
            style={[styles.inputBox]}
            value={textMM}
            onChangeText={onMMChange}
            placeholder="MM"
            placeholderTextColor={colors.navala_grey}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={{color: colors.black}}>/</Text>
          <TextInput
            ref={DDRef}
            onKeyPress={({nativeEvent}) => onKeyPress(nativeEvent, 2)}
            cursorColor={'grey'}
            style={[styles.inputBox]}
            value={textDD}
            onChangeText={onDDChange}
            placeholder="DD"
            placeholderTextColor={colors.navala_grey}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={{color: colors.black}}>/</Text>
          <TextInput
            ref={YYYYRef}
            onKeyPress={({nativeEvent}) => onKeyPress(nativeEvent, 3)}
            cursorColor={'grey'}
            style={[styles.inputBox, {}]}
            value={textYYYY}
            onChangeText={onYYYYChange}
            placeholder="YYYY"
            placeholderTextColor={colors.navala_grey}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
      </View>
      {errorMsg != '' && <Text style={styles.errorText}>{errorMsg}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: colors.grey40,
    backgroundColor: colors.white,
    height: responsiveHeight(5),
    borderRadius: 6,
    paddingHorizontal: 7,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.4,
    elevation: 5,
  },
  inputBox: {
    fontFamily: fontType.Roboto_Medium,
    color: colors.grey80,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
    height: '100%',
    marginHorizontal: 5,
  },
  errorText: {
    color: colors.error70,
    fontSize: responsiveFontSize(1.2),
    marginBottom: 15,
    paddingTop: 4,
    paddingLeft: 6,
  },
  labelStyles: {
    color: colors.black,
    marginBottom: 4,
    fontSize: responsiveFontSize(1.6),
    fontFamily: fontType.Roboto_Regular,
  },
});

export default CustomDateTextField;

interface DateTextfieldProps {
  title: string;
  date: string;
  canSelectFutureDate: boolean;
  onChange: (dateStr: string, convertedDateStr: string) => void;
  isResetDate?: boolean;
  onChangeError: (message: string) => void;
  errorMessage?: string;
  required?:boolean
}
