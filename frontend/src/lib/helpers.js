
import {API, AUTH_TOKEN} from "./constant";
import axios from "axios";
import {getStrapiURL} from "./api";

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);

};

export const    getRefreshToken= async () => {
    try {
        const data = {
            refreshToken: getToken(),
        };
        const options = {
            "Access-Control-Allow-Credentials": true,
            withCredentials: true,
        };
        const res = await axios.post(
            `${getStrapiURL()}/token/refresh`,
            data,
            options
        );
        setToken( res.data.jwt);
        this.$emit("close-modal");
    } catch (err) {
        console.log(err);
    }
} ;
