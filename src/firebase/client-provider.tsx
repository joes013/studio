'use client';

import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { ReactNode, useMemo } from 'react';
import { initializeFirebase, FirebaseProvider } from '.';
import { UserProvider } from './auth/use-user';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export const FirebaseClientProvider = ({
  children,
}: FirebaseClientProviderProps) => {
  const { firebaseApp, firestore, auth } = useMemo(() => {
    const firebaseApp = initializeFirebase();
    const firestore = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);

    return { firebaseApp, firestore, auth };
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      <UserProvider>{children}</UserProvider>
    </FirebaseProvider>
  );
};
