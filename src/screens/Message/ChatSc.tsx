import React, { useCallback, useEffect, useState } from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const ChatSc = (props: any) => {
    const [messages, setMessages] = useState<any[]>([]);
  const goBack = () => {
    props?.navigation.pop();
  };

  const onSend = useCallback((messages: any = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
const onLongPress = () => { 
    console.log('On log pressed');
    createTwoButtonAlert('Long button pressed')
}
const createTwoButtonAlert = (msg: string) =>{
    Alert.alert(
      msg,
      '',
      [
       
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

    
  };
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 1,
          avatar: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
        },
      }
    ]);
  }, []);

  return (
    <View style={{flex: 1}}>
      <HeaderBg height={Platform.OS === 'android' ? responsiveHeight(10) : '15%'}>
        <TopNavigationView
          title={props.route.params.name}
          onTap={goBack}
          onTapNotification={() => {}}
          source1={ImagePath1.backImage}
          source2={null}
          isbuttonshow={true}
          isSource2ResizeToContain={true}
        />
      </HeaderBg>
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 3,
        }}
        onLongPress={()=>onLongPress}
        onPress={()=>onLongPress}
      />
      </SafeAreaView>
    </View>
  );
};

export default ChatSc;

const styles = StyleSheet.create({});
