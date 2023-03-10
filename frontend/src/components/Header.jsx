import "../styles/header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.js";

export default () => {
  const { user } = useContext(AuthContext);
  const currentLocation = useLocation().pathname;

  return (
    <header>
      <nav>
        <div className="cont-part1">
          {user 
            ? 
              <>
                <NavLink
                  to="/"
                  className={`menu-item ${
                    currentLocation === "/" ? "is-active" : ""
                  }`}
                >
                  Home
                </NavLink>


                <NavLink
                  to="/profile"
                  className={`menu-item ${
                    currentLocation === "/profile" ? "is-active" : ""
                  }`}
                  >
                  Profile
                </NavLink>

                <span className="hello-user">Hi {user.name}</span>
              </>
            :
              <NavLink
                to="/"
                className={`menu-item ${
                  currentLocation === "/" ? "is-active" : ""
                }`}
              >
                Home
              </NavLink>
          }

        </div>

        <div className="cont-part2">
          {user ? (
            <NavLink
              to="/logout"
              className={`menu-item ${
                currentLocation === "/logout" ? "is-active" : ""
              }`}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className={`menu-item ${
                  currentLocation === "/login" ? "is-active" : ""
                }`}
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className={`menu-item ${
                  currentLocation === "/signup" ? "is-active" : ""
                }`}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
