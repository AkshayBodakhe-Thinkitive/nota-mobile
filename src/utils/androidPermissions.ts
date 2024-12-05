import { PermissionsAndroid } from 'react-native';

export async function requestPermissionsFile() {
  try {
    // Permissions for Storage and Camera
    const storagePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;

    // Request Storage Permission
    const grantedStorage = await PermissionsAndroid.request(
      storagePermission,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage for file and media access.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    // Request Camera Permission
    const grantedCamera = await PermissionsAndroid.request(
      cameraPermission,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera for capturing photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    // Handle permissions response
    if (grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }

    if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }

  } catch (err) {
    console.warn(err);
  }
}
