import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyJSFO55KqoEGDCB0sQR2aHOD5mo7e9Ng",
  authDomain: "payo-6811c.firebaseapp.com",
  projectId: "payo-6811c",
  storageBucket: "payo-6811c.appspot.com",
  messagingSenderId: "616127005162",
  appId: "1:616127005162:web:f3489ed2db9cfc8ed33293"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), importProvidersFrom([
    provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ])]
};
