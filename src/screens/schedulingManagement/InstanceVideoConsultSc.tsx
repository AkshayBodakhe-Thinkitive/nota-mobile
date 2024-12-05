import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import { fontType } from '../../assets/fontType';
import TopNavigationView from '../../common/topNavigationView';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import { Ionicons } from '../../components/Icons/Ionicons';
import TextInput from '../../components/TextInput/TextInput';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';
import ProviersConsulted from '../appointment/components/ProvidersConsulted/ProviersConsulted';
import { healthissuedata, specilistData } from './constants/StringConstants';
import { InstantConsultStyles as styles } from './style/InstantConsultStyles';

const InstanceVideoConsultSc = ({navigation}: any) => {
  const specilistItem = ({item}) => (
    <View style={styles.specilistView}>
      <Image source={item.imageName} style={styles.specilistImg} />
      <Text
        style={{
          color: 'black',
          fontFamily: fontType.Roboto,
          fontSize: 16,
          paddingLeft: 8,
        }}>
        {item.name}
      </Text>
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
        <PersonIcon name="person-outline" color="#00000066" />
        <Text style={{color: '#00000066'}}> {item.detail}</Text>
      </View>
    </View>
  );
const goBack = () => {
  navigation.pop()
}
  return (
    <GestureHandlerRootView style={{backgroundColor: 'pink', flex: 1}}>
      <View style={styles.container}>
        <HeaderBg  height={'20%'} style={{shadowOpacity: 0}}>
        <TopNavigationView
              title="Consult a Provider"
              onTap={goBack}
              source1={ImagePath1.backImage}
              source2={ImagePath1.notificationImage}
              isbuttonshow={true}
            />
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.headText}>Search Health Problem/Symptoms</Text>
            <TextInput
              style={styles.textInputStyles}
              placeholder="Eg. Cold, Fever"
              leftIcon={
                <Ionicons
                  name={'search'}
                  color={'#00000066'}
                  style={{fontSize: responsiveFontSize(3)}}
                />
              }
            />
          </View>
        </HeaderBg>
        <View style={styles.pageContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
            <ProviersConsulted
              drImage={ImagePath1.profileImage} // Assuming this is correctly defined
              drName={'Dr. Jimmy Joh'}
              drSpeciality={'Specialist Cardiologist'}
              drDate={'10-06-2021'}
            />
            <View style={styles.providerView}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Choose Top Specialities
              </Text>
              <TouchableOpacity>
                <Text style={{color: '#0097F0', alignSelf: 'center'}}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.specilistOuterView}>
              <FlatList
                data={specilistData}
                renderItem={specilistItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              />
            </View>
            <View style={styles.providerView}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Health Issues
              </Text>
              <TouchableOpacity>
                <Text style={{color: '#0097F0', alignSelf: 'center'}}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.healthOuterView}>
              <FlatList
                data={healthissuedata}
                renderItem={specilistItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default InstanceVideoConsultSc;
