import React from 'react';
import {
  Modal,
  Image,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Row from '../../components/Row/Row';
import SmallButton from '../../components/SmallButton/SmallButton';
import {colors} from '../../assets/colors';
import WebView from 'react-native-webview';
import Loader from '../../components/Loader/Loader';

const getFileTypeFromUrl = (url: any) => {
  const lowerCaseUrl = url.toLowerCase();

  if (lowerCaseUrl.includes('/jpeg/') || lowerCaseUrl.includes('/jpg/')) {
    return 'image/jpeg';
  } else if (lowerCaseUrl.includes('/png/')) {
    return 'image/png';
  } else if (lowerCaseUrl.includes('/pdf/')) {
    return 'application/pdf';
  } else if (
    lowerCaseUrl.includes('/doc/') ||
    lowerCaseUrl.includes('/docx/')
  ) {
    return 'application/msword';
  } else if (
    lowerCaseUrl.includes('/xls/') ||
    lowerCaseUrl.includes('/xlsx/')
  ) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  } else if (
    lowerCaseUrl.includes('/ppt/') ||
    lowerCaseUrl.includes('/pptx/')
  ) {
    return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  } else if (lowerCaseUrl.includes('/txt/')) {
    return 'text/plain';
  } else if (lowerCaseUrl.includes('/csv/')) {
    return 'text/csv';
  } else if (lowerCaseUrl.includes('/zip/')) {
    return 'application/zip';
  } else if (lowerCaseUrl.includes('/rar/')) {
    return 'application/x-rar-compressed';
  } else if (lowerCaseUrl.includes('/mp4/')) {
    return 'video/mp4';
  } else if (lowerCaseUrl.includes('/mp3/')) {
    return 'audio/mpeg';
  }

  return 'unknown'; // Return unknown if no type matches
};

const DocumentViewerModal = ({selectedImage, visible, onClose}: any) => {
  const fileType = getFileTypeFromUrl(selectedImage);
  const [loading, setLoading] = React.useState(true);

  console.log("fileType",fileType,selectedImage)
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading && (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          )}
          {fileType.startsWith('image/') ? (
            <Image
              style={styles.modalImage}
              source={{uri: selectedImage}}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          ) : fileType === 'application/pdf' ? (
            <>
              <Pdf
                source={{uri: selectedImage}}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, filePath) => {
                  // setLoading(false);
                  // console.log(`Number of pages: ${numberOfPages}`);
                }}
                onError={error => {
                  // console.error('PDF Error: ', error);
                  // setLoading(false);
                }}
                style={{flex: 1, backgroundColor: colors.white, width: '100%'}}
              />
            </>
          ) : (
            <View style={styles.unknownFileContainer}>
              <Text style={styles.unknownFileText}>
                File type not supported for preview.
              </Text>
            </View>
          )}
        </View>
      </View>
      <Row style={styles.buttonRow}>
        <SmallButton
          containerStyle={{width: '60%'}}
          outlined
          title="Close"
          onPress={onClose}
        />
      </Row>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    // height: undefined,
    // aspectRatio: 1,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.primary,
    top:"40%"
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    height: '90%',
  },
  unknownFileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  unknownFileText: {
    color: 'grey',
    textAlign: 'center',
  },
  buttonRow: {
    marginVertical: '5%',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default DocumentViewerModal;
