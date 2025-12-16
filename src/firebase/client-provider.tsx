'use client';

import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { ReactNode, useMemo } from 'react';
import { FirebaseProvider } from '.';
import { UserProvider } from './auth/use-user';
import { firebaseConfig } from './config';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

// Declare firebaseApp, firestore, and auth outside the component
// to ensure they are created only once per client session.
let firebaseApp: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

export const FirebaseClientProvider = ({
  children,
}: FirebaseClientProviderProps) => {
  // useMemo ensures that Firebase is initialized only once
  const services = useMemo(() => {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
      firestore = getFirestore(firebaseApp);
      auth = getAuth(firebaseApp);
    }
    return { firebaseApp, firestore, auth };
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      firestore={services.firestore}
      auth={services.auth}
    >
      <UserProvider auth={services.auth}>{children}</UserProvider>
    </FirebaseProvider>
  );
};
