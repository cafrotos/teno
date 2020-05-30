import {errorTitle, errorMessage} from "./index";
import {Alert, PermissionsAndroid} from 'react-native';


export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Teno',
        'message': 'Teno access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return
    } else {
      Alert.alert(
        errorTitle,
        errorMessage,
        [
          {text: 'Ok', onPress: () => {}},
        ],
      );
    }
  } catch (err) {
    console.warn(err)
  }
}