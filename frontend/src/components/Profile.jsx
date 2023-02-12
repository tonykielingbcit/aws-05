import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return <div>{user && <h1>Hi {user.name} Profile page!!</h1>}</div>;
};

export default Profile;
