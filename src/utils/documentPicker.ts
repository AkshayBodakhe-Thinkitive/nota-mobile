import {useState} from 'react';
import { Alert } from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

type FinishProps = {
  fileAttachId: string;
  fileName: string;
  error: string;
};

export const pickAndUploadDocumentMultipart: any = async () => {
  try {
    // const [finishedResult, setFinishedResult] = useState({} as FinishProps);
    // Step 1: Pick the document
    const res: any = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles], // Adjust types as per your need
    });

    // Step 2: Extract the file properties
    const fileUri = res[0]?.uri || res.uri;
    const fileName = res[0]?.name || res.name;
    const fileType = res[0]?.type || res.type;

    const fileTypeMapping: any = {
      'image/jpeg': 'JPEG_IMAGE',
      'image/png': 'PNG_IMAGE',
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
    };
    const formattedFileType = fileTypeMapping[fileType] || 'Unknown';

    return {
      fileUri,
      fileName,
      formattedFileType,
      fileType
    };
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the document picker');
    } else {
      console.error('Error picking or uploading document: ', err);
    }
    return null; // Return null if there's an error
  }
};

import { launchCamera } from 'react-native-image-picker';

export const captureAndUploadPhotoMultipart: any = async () => {
  try {
    const response: any = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.1, 
    });

    console.log("response===>",response)


    if (response.didCancel) {
      console.log('User cancelled the camera');
      return null; 
    }
    if (response.errorCode) {
      console.error('Error capturing photo: ', response.errorMessage);
      return null; 
    }

    const photo = response.assets?.[0];
    if (!photo) {
      console.error('No photo data available');
      return null;
    }
    const fileUri = photo.uri;
    const fileName = photo.fileName || 'captured_photo.jpg'; // Default file name if not provided
    const fileType = photo.type || 'image/jpeg'; // Default to JPEG

    const fileTypeMapping: any = {
      'image/jpg': 'JPEG_IMAGE',
      'image/jpeg': 'JPEG_IMAGE',
      'image/png': 'PNG_IMAGE',
    };

    const formattedFileType = fileTypeMapping[fileType] || 'Unknown';

    return {
      fileUri,
      fileName,
      fileSize: photo.fileSize || 0,
      formattedFileType,
      fileType
    };
  } catch (err) {
    console.error('Error capturing or uploading photo: ', err);
    return null; // Return null if there's an error
  }
};






export const pickAndUploadDocument: any = async () => {
  try {
    const res: any = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    // console.log('Document picked: ', res);

    // Ensure res.uri is defined
    const fileUri = res.uri || res[0].uri;
    const fileName = res.name || res[0].name;
    const fileType = res.type || res[0].type;

    if (!fileUri) {
      throw new Error('File URI is undefined');
    }

    // Read the file and convert it to base64
    const base64File = await RNFS.readFile(fileUri, 'base64');
    const base64WithMimeType = `data:${fileType};base64,${base64File}`;

    // console.log('Base64 file: ', base64WithMimeType);

    // Return the necessary details
    return {
      fileUri,
      fileName,
      fileType,
      base64WithMimeType,
    };
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // console.log('User cancelled the document picker');
    } else {
    }
    return null;
  }
};

import {launchImageLibrary} from 'react-native-image-picker';

export const pickAndUploadImage = async () => {
  try {
    const options: any = {
      mediaType: 'photo',
      includeBase64: true,
    };

    const response = await launchImageLibrary(options);

    if (response.didCancel) {
      return null;
    } else if (response.errorCode) {
      return null;
    } else if (response.assets && response.assets.length > 0) {
      const {uri, fileName, type, base64} = response.assets[0];

      const base64WithMimeType = `data:${type};base64,${base64}`;

      return {
        fileUri: uri,
        fileName: fileName,
        fileType: type,
        base64WithMimeType: base64WithMimeType,
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
