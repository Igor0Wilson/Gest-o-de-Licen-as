import React, { useState, createContext, ReactNode } from "react";

type UserContextProps = {
  children: ReactNode
};

const ContextProps = {
  user: {}
};

export const AuthContext = createContext(ContextProps)

export default function AuthProvider({ children }: UserContextProps) {
  const [user, setUser] = useState({
    name: "teste"
  });

  return (
    <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>
  );
}