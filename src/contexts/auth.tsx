import React, { useState, createContext, ReactNode, useEffect } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { showToast } from "@components/ToastMessage";

type UserContextProps = {
  children: ReactNode;
};

type UserDataProps = {
  email: string;
  isActive: boolean;
  name: string;
  role: string;
  telephone: string;
};

type ContextProps = {
  user: FirebaseAuthTypes.User | null;
  userData: UserDataProps;
  signed: boolean;
  signUp: {};
  signIn: {
    email: string;
    password: string;
  };
};

type signInProps = {
  email: string;
  password: string;
};

const ContextProps = {
  user: Boolean,
  signed: Boolean,
  userData: {
    email: "",
    isActive: true,
    name: "",
    role: "",
    telephone: "",
  },
  signIn: {},
  signUp: {},
};
// @ts-ignore
export const AuthContext = createContext<ContextProps>(ContextProps);

export default function AuthProvider({ children }: UserContextProps) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  function signOut() {
    auth().signOut();
  }

  useEffect(() => {
    if (user === null) {
      signOut();
    }
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  }, []);

  async function signUp(
    name: string,
    email: string,
    telephone: string,
    password: string,
    role: string,
    isActive: boolean
  ) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        let uid = value.user.uid;
        firestore().collection("Users").doc(uid).set({
          name: name,
          email: email,
          telephone: telephone,
          role: role,
          isActive: isActive,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        showToast("emerald.500", "Usuário cadastrado com sucesso!");
      })
      .catch((error) => {
        throw error;
      });
  }

  function signIn(data: signInProps) {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (value) => {
        let uid = value.user.uid;
        const userData = await firestore().collection("Users").doc(uid).get();
        // @ts-ignore
        if (userData._data.isActive === true) {
          signOut();
          showToast("danger.400", "Seu usuário está bloqueado!");
        } else {
          // @ts-ignore
          setUserData(userData._data);
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            showToast(
              "danger.400",
              "O email digitado não pertence a nenhum usuário cadastrado!"
            );
            break;

          case "auth/wrong-password":
            showToast(
              "danger.400",
              "A senha digitada é inválida! Verifique a senha e tente novamente!"
            );
            break;

          default:
            showToast(
              "danger.400",
              "Um erro inesperado ocorreu! Entre em contato com o administrador do sistema para mais informações"
            );
            break;
        }
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        // @ts-ignore
        userData,
        user,
        signUp,
        // @ts-ignore
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
