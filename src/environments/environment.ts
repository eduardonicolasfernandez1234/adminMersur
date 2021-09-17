// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'http://' + window.location.hostname + ':8000',
  BaseUrl: 'http://' + window.location.hostname + ':8000/api/',
  configFirebase: {
    apiKey: "AIzaSyDBUKNn0RwCq5kvP_nHkpLI19MC54gMQxw",
    authDomain: "mersur-e5507.firebaseapp.com",
    projectId: "mersur-e5507",
    storageBucket: "mersur-e5507.appspot.com",
    messagingSenderId: "110695506453",
    appId: "1:110695506453:web:b9bf0f3854f63621c2641c"
  },
  hmr: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
