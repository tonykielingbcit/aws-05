import "../styles/header.css";
import { NavLink } from "react-router-dom";

export default () => {
    const user = window.localStorage.getItem("user");

// notlogged => home / login / sign up
//    logged => home / profile / log out


    return(
        <header>
            <nav>
                <div className="cont-part1">
                    {user
                        ?
                            <>
                                <NavLink 
                                    to = "/" 
                                    className = "menu-item"
                                    // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                                >
                                    Home
                                </NavLink>

                                <NavLink 
                                    to = "/profile" 
                                    className = "menu-item"
                                    // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                                >
                                    Profile
                                </NavLink>
                            </>
                        :
                            <NavLink 
                                to = "/"
                                className = "menu-item"
                                // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                            >
                                Home
                            </NavLink>
                    }
                </div>

                <div className="cont-part2">
                    { user
                        ?
                            <NavLink 
                                to = "/logout" 
                                className = "menu-item"
                                // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                            >
                                Logout
                            </NavLink>
                        :
                            <>
                                <NavLink 
                                    to = "/login"
                                    className = "menu-item"
                                    // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                                >
                                    Log In
                                </NavLink>
                                <NavLink 
                                    to = "/signup"
                                    className = "menu-item"
                                    // className = {`single-item ${(currentLocation === "/favourites" ? "is-active" : "")}`}
                                >
                                    Sign Up
                                </NavLink>
                            </>
                    }
                </div>
            </nav>
        </header>
    );
}