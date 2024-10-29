import { createContext, useState } from "react";
import { firebaseApp, auth, db, storage } from "../firebase/config";


export const FirebaseContext = createContext({
  firebaseApp,
  auth,
  db,
  storage,
});

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});


export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FirebaseContext.Provider value={{ firebaseApp, auth, db, storage }}>
        {children}
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  );
}