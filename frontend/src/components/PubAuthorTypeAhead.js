import React, { useState } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {useAuthContext} from "../context/AuthContext";
import {fetchAPI} from "../lib/api";

export default function PubAuthorTypeahead({addAuthor}) {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    let endpoint = '/authors';
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
        fetchAPI(endpoint, {
            filters:
                { name:{'$startsWith':
                     query
             }
                }

        }).then((items ) => {
                let mplist = items.data.map(i =>  ( {"value":i.id, "label": i.attributes.name}) );
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
        addAuthor(selected);
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
            placeholder="Add Author..."
            renderMenuItemChildren={(option) => (
                <>

                    <span>{option.label}</span>
                </>
            )}
        />
    );
};
