import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../TextInput/TextInput';
import DropdownComponent from '../Dropdown/DropDown';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { countryCodes, localeToPhoneCodeMap } from './CountryCodes';
import { colors } from '../../assets/colors';

interface PhoneWithCountryCodeProps {
  countryCode?: string; // made it optional to set default
  number: string;
  onChange: (countryCode: string, number: string) => void; // handler for changes
  editable?: boolean;
  label?:string
  required?:boolean
  placeholder?:string
}


const PhoneWithCountryCode: React.FC<PhoneWithCountryCodeProps> = ({
  countryCode,
  number,
  onChange,
  editable,
  label,
  required,
  placeholder
}) => {
  const [currentCountryCode, setCurrentCountryCode] = useState<any>(countryCode);

  // console.log("countryCode=====",countryCode)
  const [phoneNumber, setPhoneNumber] = useState(number);

  useEffect(() => {
    if (!countryCode) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      const country = locale.split('-')[1]; 
      const defaultPhoneCode = localeToPhoneCodeMap[country];

      if (defaultPhoneCode) {
        setCurrentCountryCode(defaultPhoneCode);
      }
    }
  }, [countryCode]);

  const handleCountryCodeChange = (value: string) => {
    setCurrentCountryCode(value); 
    onChange(value, phoneNumber); 
  };

  const handleNumberChange = (value: string) => {
    setPhoneNumber(value); 
    onChange(currentCountryCode, value); 
  };

  console.log(currentCountryCode)

  return (
    <View style={styles.mainContainer}>
         {label && <Text style={styles.label}>{label} {required && (<Text style={{color:'red'}}>*</Text>)}</Text>}
      <View style={styles.container}>
        {/* Country Code Dropdown */}
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            selectedValue={currentCountryCode}
            data={countryCodes} 
            dropDownStyles={styles.dropdown}
            onValueChange={handleCountryCodeChange}
            disable={editable === false ? true :false} 
          />
        </View>
        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder ? placeholder : 'Contact Number'}
            value={phoneNumber}
            editable={editable}
            onChangeText={handleNumberChange} 
            keyboardType="phone-pad" 
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneWithCountryCode;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '20%',
  },
  inputContainer: {
    width: '78%',
  },
  dropdown: {
    height: responsiveHeight(5.5),
  },
  label: {
    marginBottom: 5,
    fontSize: responsiveFontSize(1.7),
    color: colors.grey70,
  },
});
