import { useState } from "react";
import "../styles/signup.css";
import jwtDecode from "jwt-decode";
import { recordUser } from "../../helpers/handleLocalStorage.js";

export default () => {
  const [email, setEmail] = useState("tk@tk.ca");
  const [password, setPassword] = useState("passwd");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    console.log("data: ", email, password)
    e.preventDefault();
    setMessage("");
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
console.log("result: ", result)

    if (result.error) {
        setMessage(result.error);
        return;
    }

    const token = result.token;
    const user = jwtDecode(token);
    console.log("user::: ", user);

    recordUser(token);
    /// write token in localstorage
    //////////// set user globally
    /// handle context in each page


  };

  return (
    <div className="cont-signup">
        <h2>Get in the system</h2>
        <form onSubmit={handleSubmit}>
            <input
                type        = "email"
                // type        = "text"
                value       = {email}
                onChange    = {(e) => setEmail(e.target.value)}
                placeholder = "Email"
                required
            />

            <input
                type        = "password"
                value       = {password}
                onChange    = {(e) => setPassword(e.target.value)}
                placeholder = "Password"
                required
            />

            <button type="submit">Log In</button>

            <div className = {`${message ? "signup-message" : ""}`} >
                {  message }
            </div>

        </form>
    </div>
  );
}
