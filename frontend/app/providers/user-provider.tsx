'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getUser } from '../(pages)/app/actions/user';
import { User } from "@/app/types/user";


export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const ContextUser = () =>{
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("ContextUser must be used within a UserProvider");
    }
    return context;
} 