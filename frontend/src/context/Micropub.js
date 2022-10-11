import React, {createContext, useState} from 'react';
import {UserContext} from "./user";

const MicropubContext = createContext();

const MicropubProvider = ({ children }) => {

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
        <MicropubContext.Provider value={useract}>{children}</MicropubContext.Provider>
    );
};

export { MicropubProvider, MicropubContext};


