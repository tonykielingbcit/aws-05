import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext.js";
import "../styles/home.css";

const Home = () => {
    const { user } = useContext(AuthContext);

    return(
        <div className="home">
            <h1>Usersys</h1>

            {user ? <h2>Hello {user.name}</h2> : ""}
            <h2>Here you can have your users account in a nice place.</h2>
        </div>
    );
};

export default Home;