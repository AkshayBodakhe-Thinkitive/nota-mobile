import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';
export const HealthPlanSc = ({navigation}) => {
  const goBack = () => {
    navigation.pop();
  };
  // export function HealthPlanSc() {
  const [plan, setPlan] = useState('6M');
  const threeMonthsPlanDetails = [
    '40% off up to $50 on all Doctor Consultations',
    '20% off up to $50 on all Health Checks & lab tests',
    '40% off up to $50 on all Doctor Consultations',
  ];

  const sixMonthsPlanDetails = [
    '50% off up to $60 on all Doctor Consultations',
    '20% off up to $60 on all Health Checks & lab tests',
    '50% off up to $60 on all Doctor Consultations',
    '20% off up to $60 on all Health Checks & lab tests',
    '50% off up to $60 on all Doctor Consultations',
  ];

  const twelveMonthsPlanDetails = [
    '60% off up to $70 on all Doctor Consultations',
    '40% off up to $70 on all Health Checks & lab tests',
    '60% off up to $70 on all Doctor Consultations',
    '40% off up to $70 on all Health Checks & lab tests',
    '60% off up to $70 on all Doctor Consultations',
  ];
  const [planDetailsData, setPlanDetails] = useState(sixMonthsPlanDetails);

  const PlanCard = ({isSelected, planMonths, cost, onTap}) => {
    return (
      <TouchableOpacity
        style={[
          styles.plancard,
          {backgroundColor: isSelected ? '#0097F0' : 'white'},
        ]}
        onPress={onTap}>
        <View style={styles.planCheckButton}>
          <Image
            resizeMode="center"
            style={{height: 14, width: 14, margin: 5}}
            source={isSelected ? ImagePath1.notificationImage : ''}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 18,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: isSelected ? 'white' : 'black'}}>
            {planMonths} Months
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              paddingTop: 9,
              color: isSelected ? 'white' : '#0097F0',
            }}>
            ${cost}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const PlanDetailsCard = ({details}) => {
    return (
      <View style={styles.planDetailsCardContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>What you get</Text>
        <FlatList
          data={details}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <Image
                  style={{height: 18, width: 18, marginEnd: 10}}
                  source={ImagePath1.doctorImage}
                />
                <Text style={{paddingEnd: 16}}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={{height: Dimensions.get('window').height * 0.35}}
        source={ImagePath1.topBGImage}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            paddingTop: Dimensions.get('window').height * 0.05,
          }}>
          <TouchableOpacity onPress={goBack}>
            <Image
              style={{width: 28, height: 25, tintColor: 'white'}}
              source={ImagePath1.backImage}
            />
          </TouchableOpacity>

          <Text style={{fontSize: 23, fontWeight: '500', color: 'white'}}>
            Health Plan
          </Text>

          <TouchableOpacity>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: 'white',
                tintColor: 'black',
              }}
              source={ImagePath1.notificationImage}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          flex: 1,
          marginTop: -Dimensions.get('window').height * 0.16,
          padding: 16,
        }}>
        <Text style={styles.heading}>Select Health plan for your family</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <PlanCard
            isSelected={plan == '6M'}
            planMonths={6}
            cost={150}
            onTap={() => {
              setPlan('6M');
              setPlanDetails(sixMonthsPlanDetails);
            }}
          />
          <PlanCard
            isSelected={plan == '3M'}
            planMonths={3}
            cost={100}
            onTap={() => {
              setPlan('3M');
              setPlanDetails(threeMonthsPlanDetails);
            }}
          />
          <PlanCard
            isSelected={plan == '12M'}
            planMonths={12}
            cost={300}
            onTap={() => {
              setPlan('12M');
              setPlanDetails(twelveMonthsPlanDetails);
            }}
          />
        </View>
        <PlanDetailsCard details={planDetailsData} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Subscribed');
        }}>
        <Text style={{color: 'white', fontWeight: '600'}}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '600',
    color: 'white',
    paddingBottom: Dimensions.get('window').height * 0.025,
  },

  plancard: {
    alignItems: 'center',
    borderRadius: 6,
    borderColor: '#0097F0',
    borderWidth: 1,
  },

  planCheckButton: {
    height: 24,
    width: 24,
    alignSelf: 'flex-end',
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0097F0',
    alignItems: 'center',
    alignContent: 'center',
  },

  planDetailsCardContainer: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#00000029',
    shadowRadius: 3,
    borderRadius: 5,
    backgroundColor: Platform.OS == 'android' ? '#0000' : 'white',
    shadowOpacity: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    marginTop: 20,
    maxHeight:
      Dimensions.get('window').height *
      (Platform.OS === 'android' ? 0.35 : 0.44),
  },

  button: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#0097F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 4,
    backgroundColor: '#0097F0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});
