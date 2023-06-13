import React, { useState } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {useAuthContext} from "../context/AuthContext";
import {fetchAPI} from "../lib/api";

export default function MicropubTypeahead({addMicropub}) {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    let endpoint = '/micropublications';
    // const handleSearch = (query) => {
    //     setIsLoading(true);
    //
    //     fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
    //         .then((resp) => resp.json())
    //         .then(({ items }) => {
    //             setOptions(items);
    //             setIsLoading(false);
    //         });
    // };
    const handleSearch = (query) => {
        setIsLoading(true);
        fetchAPI("/micropublications", {
            filters:
                { title:{'$startsWith':
                     query
             }
                }

        }).then((items ) => {
                let mplist = items.data.map(i =>  ( {"value":i.id, "label": i.attributes.title}) );
                setOptions(mplist);
                setIsLoading(false);
            });

        // fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
        //     .then((resp) => resp.json())
        //     .then(({ items }) => {
        //         setOptions(items);
        //         setIsLoading(false);
        //     });
    };
    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;
    const handleAddMicroPub= (e) => {
        console.log("test" + e);
        addMicropub(selected);
    } ;
    return (
        <AsyncTypeahead
            onBlur={handleAddMicroPub}
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="label"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            selected={selected}
            onChange={setSelected}
            placeholder="Answer With Existing Micropub..."
            renderMenuItemChildren={(option) => (
                <>

                    <span>{option.label}</span>
                </>
            )}
        />
    );
};
