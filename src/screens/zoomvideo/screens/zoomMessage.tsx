// import { Errors, EventType, ZoomVideoSdkChatMessage, ZoomVideoSdkChatMessageType } from '@zoom/react-native-videosdk';
// import React, { useRef, useState } from 'react';
// import { Alert, Easing, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import { Icon } from '../components/icon';
// import { useIsMounted } from '../utils/hooks';
// const BookAppointmentScreen = (routes: any) => {
//   const dispatch = useAppDispatch();
//   const isFocused = useIsFocused();
//   const {navigation, route} = routes && routes;
// const ZoomMessage = (routes: any) => {
  
//     const chatSendButtonScale = useSharedValue(0);
//     const chatInputRef = useRef<TextInput>(null);
//     const {navigation, route} = routes && routes;
//     const [refreshFlatlist, setRefreshFlatList] = useState(false);
//     const zoom =  route?.params?.zoom
//     const [isLongTouch, setIsLongTouch] = useState(false);

//     const isLongTouchRef = useRef(isLongTouch);
//     const isMounted = useIsMounted();
//     const [chatMessages, setChatMessages] = useState<ZoomVideoSdkChatMessage[]>(
//         []
//       );
//     const [chatMessage, setChatMessage] = useState<string>('');
//     const sendChatMessage = async () => {
//         chatInputRef.current?.clear();
//         await zoom.chatHelper.sendChatToAll(chatMessage);
//         setChatMessage('');
//         // send the chat as a command
//         zoom.cmdChannel.sendCommand(null, chatMessage);
//       };
//       const chatSendButtonScaleAnimatedStyle = useAnimatedStyle(() => ({
//         width: 38 * chatSendButtonScale.value,
//         marginLeft: 8 * chatSendButtonScale.value,
//         transform: [{scale: chatSendButtonScale.value}],
//       }));
//       const scaleChatSend = (show: boolean) => {
//         const easeIn = Easing.in(Easing.exp);
//         const easeOut = Easing.out(Easing.exp);
//         chatSendButtonScale.value = withTiming(show ? 1 : 0, {
//           duration: 500,
//           easing: show ? easeIn : easeOut,
//         });
//       };
//       const deleteChatMessage = async (
//         msgId: string,
//         message: ZoomVideoSdkChatMessage
//       ) => {
//         const canBeDelete = await zoom.chatHelper.canChatMessageBeDeleted(msgId);
//         if (canBeDelete === true || msgId == null) {
//           const error = await zoom.chatHelper.deleteChatMessage(msgId);
//           if (error === Errors.Success) {
//             const chatIndex = chatMessages.indexOf(message);
//             chatMessages.splice(chatIndex, 1);
//             setRefreshFlatList(!refreshFlatlist);
//           } else {
//             Alert.alert(error);
//           }
//         } else {
//           Alert.alert('Message could not be deleted');
//         }
//       };
//     const chatNewMessageNotify = zoom.addListener(
//         EventType.onChatNewMessageNotify,
//         (newMessage: ZoomVideoSdkChatMessageType) => {
//           if (!isMounted()) return;
//           setChatMessages([
//             new ZoomVideoSdkChatMessage(newMessage),
//             ...chatMessages,
//           ]);
//         }
//       );
//       const onListTouchStart = () => {
//         touchTimer = setTimeout(() => {
//           setIsLongTouch(true);
//         }, 200);
//       };
//       const onListTouchEnd = (event: any) => {
//         // Toggle UI behavior
//         // - Toggle only when user list or chat list is tapped
//         // - Block toggling when tapping on a list item
//         // - Block toggling when keyboard is shown
//         if (event._targetInst.elementType.includes('Scroll') && isKeyboardOpen) {
//           !isLongTouchRef.current && toggleUI();
//         }
//         clearTimeout(touchTimer);
//         setIsLongTouch(false);
//       };
//   return (

//     <View>
//       <Text>zoomMessage</Text>

//       <View style={styles.middleWrapper} pointerEvents="box-none">
//             <FlatList
//               contentContainerStyle={styles.chatList}
//               onTouchStart={onListTouchStart}
//               onTouchEnd={onListTouchEnd}
//               data={chatMessages}
//               extraData={refreshFlatlist}
//               renderItem={({ item }) => (
//                 <View>
//                   <View style={styles.chatMessage}>
//                     <Text style={styles.chatUser}>
//                       {item.senderUser.userName}:
//                     </Text>
//                     <Text style={styles.chatContent}> {item.content}</Text>
//                   </View>
//                   <TouchableOpacity
//                     style={styles.deleteButton}
//                     onPress={() => {
//                       Alert.alert('Delete Message', 'Delete this message?', [
//                         {
//                           text: 'Cancel',
//                           onPress: () => console.log('Cancel Pressed'),
//                           style: 'cancel',
//                         },
//                         {
//                           text: 'OK',
//                           onPress: () => {
//                             deleteChatMessage(item.messageID, item);
//                           },
//                         },
//                       ]);
//                     }}>
//                     <Text style={styles.deleteText}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//               keyExtractor={(item, index) =>
//                 `${String(item.timestamp)}${index}`
//               }
//               showsVerticalScrollIndicator={false}
//               fadingEdgeLength={50}
//               inverted
//             />
            
//             {/* <View style={styles.controls}>
//               <Icon
//                 containerStyle={styles.controlButton}
//                 name={isMuted ? 'unmute' : 'mute'}
//                 onPress={onPressAudio}
//               />
//               <Icon
//                 containerStyle={styles.controlButton}
//                 name={isSharing ? 'shareOff' : 'shareOn'}
//                 onPress={onPressShare}
//               />
//               <Icon
//                 containerStyle={styles.controlButton}
//                 name={isVideoOn ? 'videoOff' : 'videoOn'}
//                 onPress={onPressVideo}
//               />
//               <Icon
//                 containerStyle={styles.controlButton}
//                 name="more"
//                 onPress={onPressMore}
//               />
//             </View> */}
//           </View>
          
//        <TextInput
//                 style={styles.chatInput}
//                 ref={chatInputRef}
//                 placeholder="Type comment"
//                 placeholderTextColor="#AAA"
//                 onChangeText={(text) => {
//                   scaleChatSend(text.length !== 0);
//                   setChatMessage(text);
//                 }}
//                 onSubmitEditing={sendChatMessage}
//               />
//               <Animated.View
//                 style={[
//                   chatSendButtonScaleAnimatedStyle,
//                   styles.chatSendButton,
//                 ]}>
//                 <Icon name="chatSend" onPress={sendChatMessage} />
//               </Animated.View>
// {/* <Modal></Modal> */}
//     </View>
  
//   )
// }

// export default ZoomMessage

// const styles = StyleSheet.create({
//     chatInput: {
//         height: 40,
//         marginVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 6,
//         borderWidth: 1,
//         borderColor: '#666',
//         color: '#AAA',
//         backgroundColor: 'rgba(0,0,0,0.6)',
//       },
//       chatSendButton: {
//         height: 36,
//       },
//       middleWrapper: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 8,
//       },
//       deleteButton: {
//         fontSize: 10,
//         paddingLeft: 4,
//       },
//       deleteText: {
//         color: '#FFF',
//       },
//       chatContent: {
//         fontSize: 14,
//         color: '#FFF',
//       },
//       chatList: {
//         paddingRight: 16,
//       },
// })