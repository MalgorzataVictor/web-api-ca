import React from "react";
import { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
    const [userName, setUserName] = useState("");


    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

const authenticate = async (username, password) => {
  try {
    const result = await login(username, password);

    if (result && result.success) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      return { success: true };
    } else {
      const message = result && result.msg ? result.msg : "Username or password is incorrect";
      return { success: false, msg: message };
    }
  } catch (err) {
    console.error(err);
    return { success: false, msg: "Login failed, try again" };
  }
};





    const register = async (username, password) => {
        const result = await signup(username, password);
        return result.success;
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signout,
                userName,
                authToken 
            }}
        >
            {props.children} {/* eslint-disable-line */}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
