import { PermissionsAndroid } from 'react-native';

export async function requestPermissions() {
  try {
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

    const cameraGranted = await PermissionsAndroid.request(
      cameraPermission,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    const audioGranted = await PermissionsAndroid.request(
      audioPermission,
      {
        title: 'Audio Permission',
        message: 'App needs access to your microphone.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && audioGranted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
}
