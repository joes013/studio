'use client';

import {
  Auth,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const UserContext = createContext<{
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
} | null>(null);

export const UserProvider = ({ children, auth }: { children: React.ReactNode, auth: Auth }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [auth]);

  const value = useMemo(() => {
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error signing in with Google: ', error);
      }
    };

    const signOut = async () => {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    };

    return {
      user,
      isLoading,
      signInWithGoogle,
      signOut,
    };
  }, [auth, user, isLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider, which is part of FirebaseClientProvider.');
  }
  return context;
};
