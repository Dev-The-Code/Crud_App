import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';



firebase.initializeApp({
  apiKey: "AIzaSyAJzgmZB_-VnciHwcZnTHIZpDlEPZFLrNw",
  authDomain: "crud-app-react-native.firebaseapp.com",
  databaseURL: "https://crud-app-react-native.firebaseio.com",
  projectId: "crud-app-react-native",
  storageBucket: "crud-app-react-native.appspot.com",
  messagingSenderId: "721551495374"
});


export default (async function registerForPushNotificationsAsync() {

  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();



  userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();


  db.collection('users/' + userID).update({ token: token })




  
  // .then((res) => {
  //   if (res.size) {
  //     res.docs.forEach(data => {
  //       let obj = {}
  //       obj.productName = data.data().productName;
  //       obj.productId = data.data().id;
  //       productArray.push(obj)
  //     })
  //   }
  // })

  // firebase.database().ref('/users/' + userID).update({ token: token });



  // // POST the token to our backend so we can use it to send pushes from there
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
});
