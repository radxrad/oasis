import React, {useEffect, useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
} from "react-router-dom";


import {useAuthContext} from "../context/AuthContext";
import {fetchAPI, getStrapiURL} from "../lib/api";
import MicropubCard from "../components/MicropubCard";

export default function Question(props) {
    const { slug } = useParams(); // router.query;

    const {setUser} = useAuthContext();
    const [micropubs, setMicropubs] = useState();
    const [question, setQuestion] = useState();

    let endpoint = '/question';
    let navigate = useHistory();
    const stopEventPropagationTry = (event) => {
        if (event.target === event.currentTarget) {
            try {
                event.stopPropagation();
            } catch (e) {
                console.log(e);
            }

        }
    };
    useEffect( () =>  {
        //const slug ="culture-and-identification-of-a-deltamicron-sars-co-v-2-in-a-three-cases-cluster-in-southern-france"

        console.log("query");
        console.log("passed slug: " + slug );
        // const options = {
        //   method: "GET",
        //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/fetch/micropubs/2",
        //   headers: { "Content-Type": "application/json", Prefer: "" },
        // };
        //
        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //     setMicropubs(response.data);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
        // const fetchData = async () => {
        //   const [ categoriesRes, micropubRes, keywordRes, homepageRes] = await Promise.all([
        //     fetchAPI("/categories", { populate: "*" }),
        //     fetchAPI("/micropublications/", { populate: ["files", "keyword", "writer"] }),
        //     fetchAPI("/keywords", { populate: "*" }),
        //     fetchAPI("/homepage", {
        //       populate: {
        //         hero: "*",
        //         seo: { populate: "*" },
        //       },
        //     }),
        //   ]);
        //   const cats = await categoriesRes;
        //   const micros  = await micropubRes;
        //   const kws  = await keywordRes;
        //   setCategories(cats.data);
        //   setMicropubs(micros.data);
        //   setKeywords(kws.data);
        // }
        const fetchData = async () => {
            const [ questionRes,micropubRes ] = await Promise.all([
                fetchAPI("/questions", {
                    filters: {
                        slug: slug,
                    },
                    populate: [ "micropublications", "writer", "micropublications.writer", "micropublications.files"],
                   // populate: ["*"],
                }),
                fetchAPI("/micropublications", {
                // filters: {
                //     micropublications: slug,
                // },
             //   populate: ["files", "keyword", "writer.picture", "writer", "ratings"],
               }),


            ]);
            const micros  = await micropubRes;
            const aq = await questionRes;
            setMicropubs(micros.data);
            setQuestion(aq.data[0]);
        }
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

return (
    <div>
        <div>
            {question? question.attributes.question: ""}
        </div>

        <div>
            {question? question.attributes.details: ""}
        </div>
        <div>
            Micropubs
        </div>
        <div>
            {question ?
                question.attributes.micropublications.data.length >0 ?
                question.attributes.micropublications.data.map(item =>
                        {
                                let file = item.attributes?.files?.data?.length > 0 ? item.attributes?.files?.data[0].attributes.url:undefined;
                                file = file? getStrapiURL(file): file;
                                return   <MicropubCard
                                    figure={file}
                                    authorIds={item.attributes.writer.data?.id }
                                    title={item.attributes.title}
                                    abstract={item.attributes.abstract}
                                    id={item.attributes.slug}
                                    key={item.attributes.slug}

                                ></MicropubCard>
                            }


                ): "No Micropublications"
                : "Loading"}
        </div>
    </div>
)
}
