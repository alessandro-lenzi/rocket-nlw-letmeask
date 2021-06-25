import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from '../services/firebase';

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type User = {
  id        : string;
  name      : string;
  avatar    : string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  function setUserData(userData:any) {
    if (userData) {
      const { displayName, photoURL, uid } = userData;

      if( !displayName || !photoURL ) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserData(user);
    });

    return () => {
      unsubscribe();
    }
  }, []);


  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
    setUserData(result.user);
  }

  // async function signOut() {
  //   await auth.signOut();
  // }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
};
