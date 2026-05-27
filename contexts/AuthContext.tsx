"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: async () => {},
  refreshUser: async () => {},
  isLoading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

const CACHE_KEY = "ap_user_cache";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.user));
      } else {
        setUser(null);
        localStorage.removeItem(CACHE_KEY);
      }
    } catch {
      setUser(null);
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  useEffect(() => {
    // Restore from cache immediately (no flash), then verify with server
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch {}
    }
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newUser));
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    localStorage.removeItem(CACHE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
