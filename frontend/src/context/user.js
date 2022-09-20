import React, { useState, createContext } from 'react';
import { linstance } from '../lib/api';

export const UserContext = createContext(null);


const UserProvider = ({ children }) => {

    const [dummy, setDummy] = useState();

    async function dummyfunction() {
        return "dummy function invoked";
    }

    const useract = {
        dummy: dummy,
        setDummy: setDummy,
        dummyfunction: dummyfunction,
    };

    return (
        <UserContext.Provider value={useract}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
