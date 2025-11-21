"use client";

import React, { useState, useContext, useMemo } from "react";
import { UsersContext, UsersContextType, User, DrawResult } from "@/contexts";

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [results, setResults] = useState<DrawResult[] | null>(null);

  const value = useMemo(
    () => ({ users, setUsers, results, setResults }),
    [users, results]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
