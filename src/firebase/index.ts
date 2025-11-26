'use client';

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  FirebaseProvider,
} from './provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import { FirebaseClientProvider } from './client-provider';

let firebaseApp: FirebaseApp;

// This guard is needed to prevent re-initialization on hot reloads.
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export const initializeFirebase = () => firebaseApp;

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
