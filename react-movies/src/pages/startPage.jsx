import { Link } from "react-router";
import React from "react";

const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to Malgosia Movies! View your profile <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to see the movies!
            </p>
        </>
    );
  };

export default StartPage;
