import React from 'react';
import {Dimensions, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {fontType} from '../../assets/fontType';
import { heights } from '../../common/dimensionConstant';
const {height, width} = Dimensions.get('screen');
const MessagesSc = ({navigation}: any) => {
  //   const navigation = useNavigation();
  
  const users = [
    {
      id: '1',
      name: 'John Doe',
      avatar: ImagePath1.profileImage,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: ImagePath1.profileDefault,
    },
    {
      id: '3',
      name: 'Sam Wilson',
      avatar: ImagePath1.profileImage,
    },
    {
      id: '4',
      name: 'Sam Karan',
      avatar: ImagePath1.profileDefault,
    },
  ];

  const goToNotification = () => navigation.navigate('NotificationSc');

  const ChatCard = ({item}: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        console.log(`Chat with ${item.name}`);
        navigation.navigate('Chat', {name: item.name});
      }}>
      <Image source={item.avatar} style={styles.avatar} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, top: -10}}>
      <HeaderBg height={Platform.OS === 'android' ? '10%' : '17%'}>
        <TopNavigationView
          title="Messages"
          onTap={() => {}}
          onTapNotification={goToNotification}
          source1={null}
          source2={ImagePath1.notificationImage}
          isbuttonshow={false}
        />
      </HeaderBg>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={ChatCard}
      />
    </View>
  );
};

export default MessagesSc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: 'gray',
  },
  avatar: {
    width: height * 0.06,
    height: height * 0.06,
    borderRadius: 35,
    marginRight: 15,
    marginVertical: 4,
  },
  name: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: fontType.Roboto,
  },
});
