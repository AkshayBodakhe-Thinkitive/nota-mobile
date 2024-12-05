import React from 'react';

import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImagePath1 } from '../../Constants1/ImagePathConstant1';
// import { MedicalRecordsMenu } from "./MedicalRecordsMenu";
import { MedicalRecordsMenu } from '../medicalRecord/screens/MedicalRecordsMenu';

export function ProvidersScreen() {
  return (
    <View>
      <ScrollView style={{}}>
        <View style={{height: Dimensions.get('window').height * 0.21}}>
          <ImageBackground
            resizeMode="stretch"
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            source={ImagePath1.topBGImage}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
              }}>
              <TouchableOpacity>
                <Image
                  style={{width: 28, height: 25}}
                  source={ImagePath1.backImage}
                />
              </TouchableOpacity>

              <Text style={{fontSize: 23, fontWeight: '500', color: 'black'}}>
             Clinics
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
            <CutomSearchBar placeholder="Search clinic name" />
          </ImageBackground>
        </View>

        <ProviderCard
          image={ImagePath1.provider1Image}
          name={'Dr.Karina Earle'}
          speciality={'General Physician'}
          rating={4}
          charges={40}
        />

        <ProviderCard
          image={ImagePath1.provider2Image}
          name={'Dr.Sara Dave'}
          speciality={'Dermatologist'}
          rating={4.5}
          charges={35}
        />
        <ProviderCard
          image={ImagePath1.provider3Image}
          name={'Dr.Perk Joh'}
          speciality={'General Physician'}
          rating={4}
          charges={50}
        />
        <ProviderCard
          image={ImagePath1.provider4Image}
          name={'Dr.Sina David'}
          speciality={'Specialist Cardiologist'}
          rating={4}
          charges={50}
        />
        <ProviderCard
          image={ImagePath1.provider5Image}
          name={'Dr.Jimmy John'}
          speciality={'General Physician'}
          rating={4}
          charges={30}
        />
      </ScrollView>
      <MedicalRecordsMenu />
    </View>
  );
}

function CutomSearchBar({placeholder, onchange, value}) {
  return (
    <View
      style={[{flexDirection: 'row', alignItems: 'center'}, styles.container]}>
      <Image style={{height: 25, width: 25}} source={ImagePath1.backImage} />
      <TextInput
        style={{paddingHorizontal: 12}}
        value={value}
        onChangeText={onchange}
        placeholder={placeholder}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginHorizontal: 32,
    paddingVertical: 8,
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
    marginBottom: 2,
  },

  shadow: {
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
  },

  starIcon: {
    height: 18,
    width: 18,
    marginEnd: 4,
  },
});

export function ProviderCard({
  image,
  name,
  rating,
  speciality,
  onTapBook,
  charges,
}) {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 16, marginTop: 16}}>
      <View style={[styles.shadow, {}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <Image
            style={[{height: 80, width: 80}, styles.shadow]}
            source={image}
          />

          <View style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '500', fontSize: 16, color: 'black'}}>
              {name}
            </Text>
            <Text style={{fontWeight: '500', fontSize: 14, color: 'gray'}}>
              {speciality}
            </Text>
            {/* <GetRating rating={rating} /> */}
          </View>

          <View
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#0097F0',
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 4,
              }}
              onPress={onTapBook}>
              <Text style={{color: 'white'}}>Book</Text>
            </TouchableOpacity>

            <Text style={{fontWeight: '500', fontSize: 15}}>$ {charges}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

//Code for start
// function GetRating({rating}) {
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         // Full star
//         stars.push(
//           <Image
//             key={i}
//             style={styles.starIcon}
//             source={require('../assets/star.png')}
//           />,
//         );
//       } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
//         // Half star
//         stars.push(
//           <Image
//             key={i}
//             style={styles.starIcon}
//             source={require('../assets/halfStar.png')}
//           />,
//         );
//       } else {
//         stars.push(
//           <Image
//             key={i}
//             style={styles.starIcon}
//             source={require('../assets/starOutline.png')}
//           />,
//         );
//       }
//     }
//     return stars;
//   };

//   return <View style={{flexDirection: 'row'}}>{renderStars()}</View>;
// }
