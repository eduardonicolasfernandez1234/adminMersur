importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js");
firebase.initializeApp(
  {
    apiKey: "AIzaSyDBUKNn0RwCq5kvP_nHkpLI19MC54gMQxw",
    authDomain: "mersur-e5507.firebaseapp.com",
    projectId: "mersur-e5507",
    storageBucket: "mersur-e5507.appspot.com",
    messagingSenderId: "110695506453",
    appId: "1:110695506453:web:b9bf0f3854f63621c2641c"
  }
)

const messaging  = firebase.messaging();

/*messaging.setBackgroundMessageHandler(function (payload) {

  let title = payload.notification.title;

  let options = {
    body: payload.notification.body
  }

  self.registration.showNotification(title, options);

})*/

