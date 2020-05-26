import React from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId: '831814607590-69at1t4dem6m5cgqj9rtedah8ohggv5b.apps.googleusercontent.com'
});
  // export async function onFacebookButtonPress(){
  // console.log("ok")
  // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  // if (result.isCancelled) {
  //   throw 'User cancelled the login process';
  // }
  // const data = await AccessToken.getCurrentAccessToken();
  // if (!data) {
  //   throw 'Something went wrong obtaining access token';
  // }
  // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  // return auth().signInWithCredential(facebookCredential);
  // }

  export async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const provider = auth.GoogleAuthProvider;
    const credential = provider.credential(idToken);
    auth().signInWithCredential(credential)
    .then((data) => {
      console.log('SUCCESS', data);
    })
    .catch((error) => {
      console.log('ERROR', error);
    });
  }