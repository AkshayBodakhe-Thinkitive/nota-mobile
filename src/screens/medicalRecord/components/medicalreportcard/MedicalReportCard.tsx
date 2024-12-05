import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import Card from '../../../../components/Card/Card';
import KeyValuePairs from '../keyvaluepair/KeyValuePair';
import Row from '../../../../components/Row/Row';
import TextButton from '../../../../components/TextButton/TextButton';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import { key_mapping_lab } from '../../constants/StringCostants';

const MedicalReportCard = ({data}:any) => {
  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={{margin: 5}}>
              <Card width={null} height={null}>
                <KeyValuePairs
                  dataArray={[item]}
                  keyMapping={key_mapping_lab}
                  labelStyle={{width: '30%'}}
                />
                <Row
                  style={{
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    paddingRight: 10,
                    width: '50%',
                    alignSelf: 'flex-end',
                  }}>
                  <TextButton
                    text="View Report"
                    textStyle={{fontSize: responsiveFontSize(1.7)}}
                  />
                  <SmallButton title="Download" />
                </Row>
              </Card>
            </View>
          );
        }}
      />
    </View>
  )
}

export default MedicalReportCard

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
      },
})