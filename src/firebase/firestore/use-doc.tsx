import { DocumentReference, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useDoc = <T>(ref: DocumentReference | null) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        if (doc.exists()) {
          setData({ ...(doc.data() as T), id: doc.id });
        } else {
          setData(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching document: ', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, isLoading };
};
