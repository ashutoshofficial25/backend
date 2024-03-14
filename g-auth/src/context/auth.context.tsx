import { ReactNode, createContext, useEffect, useState } from "react";

interface IInitialValues {
  user: null | any;
  isAuthenticated: boolean;
  login: () => void;
}

const initialValues: IInitialValues = {
  user: null,
  isAuthenticated: false,
  login: () => {},
};

const AuthContext = createContext(initialValues);

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    function init() {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const isValid = verifyToken(token);

      if (!isValid) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
    }

    init();
  }, []);

  const login = () => {};

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function verifyToken(token: string) {
  return true;
}
