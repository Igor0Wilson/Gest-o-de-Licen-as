import React, { useState, createContext, ReactNode, useEffect } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

type UserContextProps = {
  children: ReactNode;
};

type ContextProps = {
  user: FirebaseAuthTypes.User | null;
  signed: boolean;
  signUp: {};
  signIn: {
    email: string;
    password: string;
  };
};

const ContextProps = {
  user: Boolean,
  signed: Boolean,
  signIn: {},
  signUp: {},
};

export const AuthContext = createContext<ContextProps>(ContextProps);

export default function AuthProvider({ children }: UserContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
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
        Alert.alert("Cadastro realizado!", "Usuário cadastrado com sucesso!");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function signIn(email: string, password: string) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert(
              "Usuário inexistente",
              "O email digitado não pertence a nenhum usuário cadastrado!"
            );
            break;

          case "auth/wrong-password":
            Alert.alert(
              "Senha inválida",
              "A senha digitada é inválida! Verifique a senha e tente novamente!"
            );
            break;

          default:
            Alert.alert(
              "Ocorreu um erro!",
              "Um erro inesperado ocorreu! Entre em contato com o administrador do sistema para mais informações"
            );
            break;
        }
      })
      .finally(() => setIsLoading(false));
  }

  function signOut() {
    auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
