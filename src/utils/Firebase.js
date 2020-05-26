import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

  GoogleSignin.configure({
    webClientId: '831814607590-69at1t4dem6m5cgqj9rtedah8ohggv5b.apps.googleusercontent.com'
  });

  // export async function onFacebookButtonPress(){
    // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    // const data = await AccessToken.getCurrentAccessToken();
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // return auth().signInWithCredential(facebookCredential)
      // .then((data) => {
      //   return true
      // })
      // .catch((error) => {
      //   return false
      // });
  // }

  export async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const provider = auth.GoogleAuthProvider;
    const credential = provider.credential(idToken);
    return auth().signInWithCredential(credential)
    .then((data) => {
      return true
    })
    .catch((error) => {
      return false
    });
  }

  export async function onLoginButtonPress({ email, password }) {
    return auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      return true
    })
    .catch((error) => {
      return false
    });
  }

  export async function onSignOutButtonPress() {
    auth().signOut()
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
  }

  //xác nhận xem user còn hạn đăng nhập hay không
  export async function checkUserSignIn() {
    return auth().onAuthStateChanged(function(user) {
      if (user) {
        return true
      } else {
        return false
      }
    });
  }

  //dùng khi thực hiện các hành động nhạy cảm cần đăng nhập lại để xác nhận
  export async function reAuthenUser() {
    var user = auth().currentUser;
    var credential;
    return user.reauthenticateWithCredential(credential).then(function() {
      return true
    }).catch(function(error) {
      return false
    });
  }

  export function getUserProfile() {
    var user = auth().currentUser;
    if (user != null) {
      return user
    }
  }

  export function updateUserProfile() {
    var user = auth().currentUser;
    return user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      return true
    }).catch(function(error) {
      return false
    });
  }
