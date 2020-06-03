import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { FIREBASE_STATUS } from 'consts/configs';

auth().languageCode = 'vi'

GoogleSignin.configure({
  webClientId: '831814607590-69at1t4dem6m5cgqj9rtedah8ohggv5b.apps.googleusercontent.com'
});

export async function onFacebookButtonPress() {
  await LoginManager.logInWithPermissions(['public_profile', 'email']);
  const data = await AccessToken.getCurrentAccessToken();
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  return auth().signInWithCredential(facebookCredential)
    .then((data) => {
      return FIREBASE_STATUS.SUCCESS
    })
    .catch((error) => {
      return FIREBASE_STATUS.FAIL
    });
}

export async function onGoogleButtonPress() {
  const { idToken } = await GoogleSignin.signIn();
  const provider = auth.GoogleAuthProvider;
  const credential = provider.credential(idToken);
  return auth().signInWithCredential(credential)
    .then((data) => {
      return FIREBASE_STATUS.SUCCESS
    })
    .catch((error) => {
      return FIREBASE_STATUS.FAIL
    });
}

export async function onLoginButtonPress({ email, password }) {
  return auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      return FIREBASE_STATUS.SUCCESS
    })
    .catch((error) => {
      return FIREBASE_STATUS.FAIL
    });
}

export async function onSignUpButtonPress({ email, password }) {
  return auth().createUserWithEmailAndPassword(email, password)
    .then(async () => {
      var user = auth().currentUser;
      await user.sendEmailVerification();
      return FIREBASE_STATUS.SUCCESS;
    })
    .catch(error => {
      return FIREBASE_STATUS.FAIL
    });
}

export async function onSignOutButtonPress() {
  return auth().signOut()
    .then(() => {
      return FIREBASE_STATUS.SUCCESS
    })
    .catch(() => {
      return FIREBASE_STATUS.FAIL
    })
}

//xác nhận xem user còn hạn đăng nhập hay không
export const checkUserSignIn = () => new Promise((resolve, reject) => {
  auth().onAuthStateChanged((user) => {
    if (user) {
      return resolve(FIREBASE_STATUS.SUCCESS)
    }
    return resolve(FIREBASE_STATUS.FAIL)
  });
})

//dùng khi thực hiện các hành động nhạy cảm cần đăng nhập lại để xác nhận
export async function reAuthenUser() {
  var user = auth().currentUser;
  var credential;
  return user.reauthenticateWithCredential(credential).then(function () {
    return FIREBASE_STATUS.SUCCESS
  }).catch(function (error) {
    return FIREBASE_STATUS.FAIL
  });
}

export function getUserProfile() {
  var user = auth().currentUser;
  if (user != null) {
    return user
  }
}

export function updateUserProfile(user) {
  var user = auth().currentUser;
  return user.updateProfile(user).then(function () {
    return FIREBASE_STATUS.SUCCESS
  }).catch(function (error) {
    return FIREBASE_STATUS.FAIL
  });
}

function ramdomHash(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const uploadImage = (file) => new Promise((resolve, reject) => {
  var user = auth().currentUser;
  var filename = ramdomHash(12);
  var userImageRef = storage().ref().child(`images/${user.uid}/${filename}${file.type}`);
  var uploadTask = userImageRef.put(file)
  uploadTask.on(storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      return reject(FIREBASE_STATUS.FAIL)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        return resolve(downloadURL)
      });
    }
  );
})