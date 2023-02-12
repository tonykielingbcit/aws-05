import { useState, useContext, useEffect } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";

export default () => {
  const [email, setEmail] = useState("tk@tk.ca");
  const [password, setPassword] = useState("passwd");
  const [message, setMessage] = useState("");
  const { user, setNewToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/profile");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (result.error) {
      setMessage(result.error);
      return;
    }

    setNewToken(result.token);
    navigate("/profile");
  };

  return (
    <div className="cont-signup">
      <h2>Get in the system</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          // type        = "text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Log In</button>

        <div className={`${message ? "signup-message" : ""}`}>{message}</div>
      </form>
    </div>
  );
};
