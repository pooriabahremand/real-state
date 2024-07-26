import { createContext, useEffect, useMemo, useState } from "react";
import { AuthContextInterface } from "../interface/interface";

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  setUser: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{
    accessToken: string;
    userId: number;
  } | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user") as string));
    } else {
      setUser(null);
    }
  }, []);

  const memoizedUser = useMemo(() => {
    return user;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user: memoizedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
