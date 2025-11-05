import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "danotes-140cf", appId: "1:411505967155:web:415294b9ce95d150dae346", storageBucket: "danotes-140cf.firebasestorage.app", apiKey: "AIzaSyBoBqX6W7o5T8Tz186mIPi6s8MCaaxbgho", authDomain: "danotes-140cf.firebaseapp.com", messagingSenderId: "411505967155", measurementId: "G-PSSFP45D11" })), provideFirestore(() => getFirestore())]
};
