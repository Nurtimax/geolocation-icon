// hooks/useRealtimeData.ts
import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase";

export const useRealtimeData = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataRef = ref(db, path);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        const value = snapshot.val();
        setData(value);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    // Cleanup при размонтировании компонента
    return () => {
      off(dataRef, "value", unsubscribe);
    };
  }, [path]);

  return { data, loading, error };
};
