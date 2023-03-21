

import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
//import { message } from "antd";
import Alert from 'react-bootstrap/Alert';
import { API, BEARER } from "../../lib/constant";
import { useEffect } from "react";
import {getToken, removeToken, setToken} from "../../lib/helpers";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authToken = getToken();
    const    getRefreshToken= async () => {
        try {
            const data = {
                refreshToken: getToken(),
            };
            const options = {
                "Access-Control-Allow-Credentials": true,
                withCredentials: true,
            };
            const res = await axios.post(
                `${API}/token/refresh`,
                data,
                options
            );
            setToken( res.data.jwt);
            this.$emit("close-modal");
        } catch (err) {
            console.log(err);
        }
    } ;

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/users/me`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();
            if (data.status == 401){
                getRefreshToken();
            } else {
                setUserData(data);
            }

        } catch (error) {
            console.error(error);
            Alert.error("Error While Getting Logged In User Details");
            getRefreshToken();
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user) => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider
            value={{ user: userData, setUser: handleUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
