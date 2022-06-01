import firebase from "@react-native-firebase/app";

if(!firebase.apps.length){
    var firebaseConfig = {
        apiKey: "AIzaSyCu6y9jPrEfVhaO_mPWsLRunXrqRsrhwgo",
        authDomain: "sihala-fm-c517d.firebaseapp.com",
        databaseURL: "https://sihala-fm-c517d.firebaseio.com",
        projectId: "sihala-fm-c517d",
        storageBucket: "sihala-fm-c517d.appspot.com",
        messagingSenderId: "783964599236",
        appId: "1:783964599236:android:d3350aa059b270cc3e6a91",
    };
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
  }else{
    firebase.app();
  }


export default firebase;