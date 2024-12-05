import { StyleSheet, View } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import CustomText from "../../../../components/Text/CustomText";

type KeyMapping = {
  [key: string]: string;
};

type KeyValuePairsProps = {
  dataArray: any[];
  keyMapping: KeyMapping; 
  labelStyle?: any;
  valueStyle?: any; 
};


const KeyValuePairs = ({dataArray, keyMapping, labelStyle, valueStyle}:KeyValuePairsProps) => {
    return (
      <View style={styles.container}>
        {dataArray.map((dataItem:any, index:any) => (
          <View key={index}>
            {Object.entries(keyMapping).map(([dataKey, label]:any) => (
              <View key={dataKey} style={styles.row}>
                <CustomText style={[styles.label,labelStyle]}>{label}: </CustomText>
                <CustomText style={[styles.value,valueStyle]}>{dataItem[dataKey]}</CustomText>
              </View>
            ))}
            {index !== dataArray.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    );
  };

  export default KeyValuePairs
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    row: {
      flexDirection: 'row',
    //   borderWidth : 1,
      marginVertical: responsiveHeight(0.6),
    },
    label: {
      marginRight: 4,
      width : '50%',
      color : '#1A1A1A80',
      fontSize : responsiveFontSize(1.7)
    },
    value: {
      flex: 1,
      fontSize : responsiveFontSize(1.7)
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      marginVertical: 8,
    },
  });