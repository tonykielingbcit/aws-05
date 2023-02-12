import { useState, useEffect, useContext } from "react";
import "../styles/signup.css";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default () => {
  const { user, setNewToken } = useContext(AuthContext);
  const [email, setEmail] = useState("tk1@tk.ca");
  const [displayName, setDisplayName] = useState("tk1");
  const [password, setPassword] = useState("tk1");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/profile");
  }, []);

  const handleSubmit = async (e) => {
    console.log("data: ", email, password, displayName);
    e.preventDefault();
    setMessage("");
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: displayName }),
    }).then((res) => res.json());
    // console.log("result: ", result);

    if (result.error) {
      setMessage(result.error);
      return;
    }

    const token = result.token;

    setNewToken(token);
    navigate("/profile");
  };

  return (
    <div className="cont-signup">
      <h2>Let's creat a free account</h2>
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
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="User Name"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Create Account</button>

        <div className={`${message ? "signup-message" : ""}`}>{message}</div>
      </form>
    </div>
  );
};
