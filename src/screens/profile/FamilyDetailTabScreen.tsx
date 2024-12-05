import React from 'react';
import { FlatList, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../../components/Card/Card';
import SmallButton from '../../components/SmallButton/SmallButton';
import CustomText from '../../components/Text/CustomText';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';

const FamilyDetailTabScreen = () => {
  const familyData = [
    {
      image: ImagePath1.famMem1Image,
      name: 'Samantha Williams',
      Contact: '202-555-0156',
      Email_Id: 'samantha.williams@gmail.co',
      Relationship: 'Sister',
      Address: '257 Fireweed Ln, Ketchikan, Alaska 99901, USA',
    },
    {
      image: ImagePath1.famMem1Image,
      name: 'Luke Williams',
      Contact: '202-555-0156',
      Email_Id: 'luke@gmail.com',
      Relationship: 'Brother',
      Address: '257 Fireweed Ln, Ketchikan, Alaska 99901, USA',
    },
  ];

  const renderItem = ({item}: any) => (
    <Card width={'100%'} height={Platform.OS === 'ios' ? responsiveFontSize(23) : responsiveFontSize(24)} style={styles.card}>
      <View style={styles.containerCard}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.personContainer}>
          {Object.entries(item).map(
            ([key, value]) =>
              key !== 'image' && (
                <View key={key} style={styles.row}>
                  <View style={{backgroundColor:'white'}}>
                  {key !== 'name' && (
                    <CustomText style={styles.label}>{key} : </CustomText>
                  )}
                  </View>
                   <View style={{width:'60%',backgroundColor:'white'}}>
                  <CustomText style={styles.value}>{value as any}</CustomText>
                  </View>
                </View>
              ),
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingBottom: 30,
          marginBottom: 30,
        }}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{paddingHorizontal: 5}}
          data={familyData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.addMemCard}>
          <CustomText>
            Booking the lab test for someone else? Add their details here
          </CustomText>
          <SmallButton outlined title="Add New Family Member"></SmallButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default FamilyDetailTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'ios' ? '2%' : 10,
    margin: 5,
    // marginBottom: 60,
  },
  personContainer: {
    flex: 1,
    marginTop: responsiveHeight(1),
  },
  row: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.3),
    flexWrap: 'wrap',
  },

  card: {
    marginVertical: '1%',
  },
  containerCard: {
    height: '100%',
    padding: '2%',
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    height: responsiveHeight(13),
    width: responsiveWidth(26),
  },
  label: {
    fontSize: responsiveFontSize(1.6),
    color: '#1A1A1A80',
  },
  value: {
    fontSize: responsiveFontSize(1.6),
    // backgroundColor: 'pink'
  },

  addMemCard: {
    marginHorizontal: 5,
    marginTop: '3%',
    height: '23%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D940',
  },
});
