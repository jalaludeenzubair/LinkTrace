import React, { createContext, useContext, useState } from "react";

export interface User {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  flags: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(
      document.cookie.split("; ").find((c) => c.startsWith("csrfToken=")),
    );
  });

  const login = (userData: any) => {
    const formattedUser: User = {
      userId: userData._id,
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      flags: userData.featureFlags || [],
    };
    localStorage.setItem("user", JSON.stringify(formattedUser));
    setUser(formattedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev: User | null) => (prev ? { ...prev, ...userData } : null));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
