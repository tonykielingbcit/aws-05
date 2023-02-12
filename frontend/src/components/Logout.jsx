import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";

const Logout = () => {
  const { setNewToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNewToken("", "rm");
    navigate("/");
  }, []);

  return <p>loggin out</p>;
};

export default Logout;
