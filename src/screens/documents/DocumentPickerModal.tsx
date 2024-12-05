import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';
import {OctiIcons} from '../../components/Icons/OctiIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { FeatherIcon } from '../../components/Icons/FeatherIcon';
import { colors } from '../../assets/colors';
import MaterialCommunityIcons from '../../components/Icons/MaterialCommunityIcons';
import { fontType } from '../../assets/fontType';
import { captureAndUploadPhotoMultipart, pickAndUploadDocumentMultipart } from '../../utils/documentPicker';

const {height} = Dimensions.get('window');

const ImagePickerModal = ({ visible, onClose, onFileSelect }: any) => {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start(() => onClose());
    }
  }, [visible]);

  const handleFilePick = async (option: string) => {
    try {
      let result = null;
      if (option === 'camera') {
        result = await captureAndUploadPhotoMultipart(); // File picking logic for camera
      } else {
        result = await pickAndUploadDocumentMultipart(); // File picking logic for gallery/documents
      }

      if (result) {
        onFileSelect(result); // Return the result to the parent
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    } finally {
      onClose(); // Close the modal after selection
    }
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: translateY }] },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select File</Text>
            <TouchableOpacity onPress={onClose}>
              <OctiIcons name="x" size={25} color={colors.grey80} />
            </TouchableOpacity>
          </View>
          <View style={styles.quickAccessIcons}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconImgContainer}
                onPress={() => handleFilePick('camera')}
              >
                <FeatherIcon
                  name="camera"
                  style={{
                    fontSize: responsiveFontSize(3),
                    color: colors.primary,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.iconText}>Camera</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconImgContainer}
                onPress={() => handleFilePick('gallery')}
              >
                <MaterialCommunityIcons
                  name="image-outline"
                  style={{
                    fontSize: responsiveFontSize(3),
                    color: colors.primary,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.iconText}>Gallery</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

  
// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 15,
    elevation: 10,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E8EBEC',
  },
  modalTitle: {
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2.5),
    color: colors.grey80,
  },
  quickAccessIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 8,
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(1.5),
    color: colors.grey80,
  },
  iconStyles: {
    width: responsiveWidth(7.5),
    height: responsiveHeight(3.5),
  },
  iconImgContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveFontSize(6),
    backgroundColor: '#DCF7FF',
  },
});

export default ImagePickerModal;
