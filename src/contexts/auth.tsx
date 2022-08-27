import { firebase } from "@react-native-firebase/auth";
import React, { useState, createContext, ReactNode } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type UserContextProps = {
  children: ReactNode
};

type ContextProps = {
  user: {} | null;
  signed: {};
};

type signUpProps = {
  name: string;
  email: string;
  telephone: string;
  password: string;
}

const ContextProps = {
  user: {},
  signed: {}
};

export const AuthContext = createContext<ContextProps>(ContextProps)

export default function AuthProvider({ children }: UserContextProps) {
  const [user, setUser] = useState({});

  async function signUp(name, email, telephone, password) {
    await auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      let uid = value.user.uid;
      firestore()
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user , user }}>
        {children}
    </AuthContext.Provider>
  );
}