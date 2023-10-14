"use client";
import { useState, createContext, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { Toaster } from "react-hot-toast";

interface ContextProps {
  user: {};
  setUser: Dispatch<SetStateAction<{}>>;
}

export const Context = createContext<ContextProps>({ user: {}, setUser: () => {} });

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
};
