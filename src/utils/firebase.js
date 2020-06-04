import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { FIREBASE_STATUS } from 'consts/configs';
import { v1 as uuid } from 'uuid';

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

export function getCurrentUserProfile() {
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

export const uploadImage = async (path) => {
  const user = auth().currentUser;
  const filename = uuid();
  const imageRef = storage().ref("image").child(`images/${user.uid}/${filename}`)

  await imageRef.putFile(path)

  return imageRef.getDownloadURL()
  // var userImageRef = storage().ref('images').child(`images/${user.uid}/${filename}${file.type}`);
  // var uploadTask = userImageRef.put(file, { contentType: 'application/octet-stream' })
  // uploadTask.on(storage.TaskEvent.STATE_CHANGED,
  //   (snapshot) => {
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     progressListener(progress)
  //   },
  //   (error) => {
  //     return reject(FIREBASE_STATUS.FAIL)
  //   },
  //   () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //       return resolve(downloadURL)
  //     });
  //   }
  // );
}

export const uploadOneStory = (story) => {
  var user = auth().currentUser;
  const diariesCollection = firestore().collection("Diaries");
  const userStoriesCollection = diariesCollection.doc(user.uid).collection("Stories");
  return userStoriesCollection.doc(story.id).set(story)
    .then(() => {
      if(story.isPublic) database().ref(`publicDiaries/${user.uid}/${story.id % 10}`).set(story); //tự động thêm vào newfeed mỗi newfeed chỉ chứa 10 stories gần nhất của user
      if(story.isPublic) firestore().collection("Newsfeed").add({...story, ...user})
      return FIREBASE_STATUS.SUCCESS                                                              //hàm realtime lỗi không ảnh hưởng
    })
    .catch(() => {
      return FIREBASE_STATUS.FAIL
    })
}

export const updateOneStory = (story) => {
  var user = auth().currentUser;
  const diariesCollection = firestore().collection("Diaries");
  const userStoriesCollection = diariesCollection.doc(user.uid).collection("Stories");
  return userStoriesCollection.doc(story.id).update(story)
    .then(() => {
      if(story.isPublic) database().ref(`publicDiaries/${user.uid}/${story.id % 10}`).set(story); //tự động thêm vào newfeed mỗi newfeed chỉ chứa 10 stories gần nhất của user
      if(story.isPublic) firestore().collection("Newsfeed").add({...story, ...user})
      return FIREBASE_STATUS.SUCCESS                                                              //hàm realtime lỗi không ảnh hưởng
    })
    .catch(() => {
      return FIREBASE_STATUS.FAIL
    })
}

//lasvisible là doc cuối dùng của snapshot của collection trước
//lastVisible = querySnapshots.docs[querySnapshots.docs.length-1];
//code lấy story theo 20 dòng một
export const getStories = (lastVisible) => {
  var user = auth().currentUser;
  const diariesCollection = firestore().collection("Diaries");
  const userStoriesCollection = diariesCollection.doc(user.uid).collection("Stories");
  const query = userStoriesCollection
    .orderBy("updatedAt")
    .limit(20)
    .lastVisible ? startAfter(lastVisible) : {} //nếu có truyền lastvisible thì chạy hàm này không thì thôi
  return query.get()
    .then(function (querySnapshot) {
      return querySnapshot
    })
    .catch(function (error) {
      return FIREBASE_STATUS.FAIL
    });
}

export const getUserPublicStory = (uid, lastVisible) => {
  var user = auth().currentUser;
  const diariesCollection = firestore().collection("Diaries");
  const userStoriesCollection = diariesCollection.doc(uid).collection("Stories");
  const query = userStoriesCollection
    .where("isPublic", "==", "true") //đã cài rule chỉ cho lấy story public của user khác trên firebase
    .orderBy("updatedAt")
    .limit(20)
    .lastVisible ? startAfter(lastVisible) : {}
  return query.get()
    .then(function (querySnapshot) {
      return querySnapshot
    })
    .catch(function (error) {
      return FIREBASE_STATUS.FAIL
    });
}

export const getNewsfeed = (lastVisible) => {
  var user = auth().currentUser;
  const newsfeedCollection = firestore().collection("Newsfeed");
  const query = newsfeedCollection
                .orderBy("updatedAt")
                .limit(20)
                .lastVisible?startAfter(lastVisible):{}
  return query.get()
    .then(function(querySnapshot) {
      return querySnapshot
    })
    .catch(function(error) {
        return FIREBASE_STATUS.FAIL
    });
}

//code lắng nghe sự kiện realtime khi newfeed được cập nhật qua callback
export const newsfeed = (cb) => {
  const subscriber = database();
  database().ref(`publicDiaries`).on("child_changed", (snapshot) => {
    cb(snapshot)
  })
  return () => subscriber()
}