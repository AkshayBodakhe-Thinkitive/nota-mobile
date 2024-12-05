import React, { useState } from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NotificationSc from '../screens/notification/NotificationSc';
import { ImagePath1 } from '../Constants1/ImagePathConstant1';
import { MaterialIcons } from '../components/Icons/MaterialIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const TopNavigationView = ({
  title,
  onTap,
  onTapNotification,
  source1,
  source2,
  isbuttonshow,
  isSource2ResizeToContain = false,
  isNotificationShow,
}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  return (
    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      }}>
      {isbuttonshow ? (
        <TouchableOpacity onPress={onTap} style={{top: 20}}>
          <Image style={{width: 28, height: 25}} source={source1} />
        </TouchableOpacity>
      ) : (
        <View style={{width: 28, height: 25, top: 20}} />
      )}

      <Text style={{fontSize: 23, fontWeight: '500', color: 'black', top: 20}}>
        {title}
      </Text>

      {!isNotificationShow && (
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          {/* <Image
            resizeMode={isSource2ResizeToContain ? 'contain' : 'cover'}
            style={{width: 50, height: 30, borderRadius: 50, top: 20}}
            source={source2}
          /> */}
          <ImageBackground
            source={ImagePath1.bellBg}
            style={styles.bellBg}>
            <MaterialIcons
              color="black"
              name="notifications-none"
              size={responsiveFontSize(3.5)}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      )}
      <NotificationSc
        visible={showModal}
        setVisible={setShowModal}
        setNotificationCount={setNotificationCount}
      />
    </View>
  );
};

export default TopNavigationView;

const styles = StyleSheet.create({
  bellBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    width: responsiveWidth(10),
    right: '25%',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})