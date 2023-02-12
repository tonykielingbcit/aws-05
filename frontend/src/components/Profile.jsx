import { useState, useEffect, useContext, useRef } from "react";
import "../styles/signup.css";
import "../styles/profile.css";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default () => {
  const { user, token, setNewToken } = useContext(AuthContext);
  // console.log("------------------- user::: ", user);
  // const [email, setEmail] = useState("tk1@tk.ca");
  const [displayName, setDisplayName] = useState("");
  const [tempName, setTempName] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [messageClass, setMessageClass] = useState(null);
  const [btCancelLabel, setBtCancelLabel] = useState("Cancel");
  const nameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("user in PoROFILE::: ", user);
    if (!user) {
      navigate("/");
      return;
    }

    setDisplayName(user.name);
  }, [user]);

  const handleSubmit = async (e) => {
    console.log("data: ", displayName, user);
    e.preventDefault();
    setMessage("");
    const result = await fetch(`/api/users/${user.id}/displayName`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newDisplayName: displayName, email: user.email }),
    }).then((res) => res.json());
    // console.log("result:::::::::::::: ", result);

    if (result.error) {
      setMessage(result.error);
      setMessageClass("msg-fail");
      return;
    }

    setMessageClass("msg-success");
    setNewToken(result.token);
    setMessage(result.message);
    setBtCancelLabel("Close");
    setTempName("");
  };

  useEffect(() => {
    setMessage("");
    setMessageClass(null);
    if (editMode) {
      setDisplayName(user.name);
      setTempName(displayName);
      nameRef.current.focus();
    }

    if (!editMode) setDisplayName(tempName);
  }, [editMode]);

  return (
    <div className="cont-signup">
      <h2>Profile Page</h2>
      <form>
        <input
          // type="email"
          // value={email}
          value={user?.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="profile-no-edit"
          disabled
        />
        <input
          type="text"
          value={displayName || user?.name}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="User Name"
          required
          disabled={!editMode}
          className={`${editMode ? "profile-yes-edit" : "profile-no-edit"}`}
          ref={nameRef}
        />

        <div className="buttons">
          {editMode ? (
            <div className="two-buttons">
              <button id="save-bt" onClick={handleSubmit}>
                Save
              </button>
              <button id="cancel-bt" onClick={() => setEditMode(false)}>
                {btCancelLabel}
              </button>
            </div>
          ) : (
            <button id="edit-bt" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
        </div>

        <div className={`${messageClass || "msg-none"}`}>{message}</div>
      </form>
    </div>
  );
};
