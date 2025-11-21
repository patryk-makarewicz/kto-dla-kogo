import { createContext } from "react";

export interface User {
  name: string;
}
export interface DrawResult {
  giver: string;
  receiver: string;
}

export interface UsersContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  results: DrawResult[] | null;
  setResults: (results: DrawResult[] | null) => void;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);
