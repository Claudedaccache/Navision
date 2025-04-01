import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../data/types";
import { useMediaQuery, useTheme } from "@mui/material";

// Define the type for the context values
interface UserContextType {
  token: string;
  user: User;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isMobile: boolean;
}

// Create the context with a default value of `undefined`
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

// Define the type for the props of the UserContextProvider component
interface UserContextProviderProps {
  children: ReactNode;
  userData: User;
}

export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const UserContextProvider = ({
  children,
  userData,
}: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(userData);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const values: UserContextType = {
    token,
    setToken,
    user,
    setUser,
    isMobile,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
