import AppRouter from "./components/AppRouter.jsx";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./AuthContext/AuthContext.js";

import {
  recordToken,
  removeToken,
  getToken,
} from "../helpers/handleLocalStorage.js";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const temToken = getToken();
    if (temToken) {
      setToken(temToken);
      setUser(jwtDecode(temToken));
    }
  }, [token]);

  function setNewToken(token, action = null) {
    // logout is calling
    if (action === "rm") {
      removeToken();
      setUser(null);
      setToken(null);
      return;
    }

    recordToken(token);
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ user, token, setNewToken }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}
