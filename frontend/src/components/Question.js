import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import {createAPI, fetchAPI} from "../lib/api";



export default function Question(props) {
    const [question, setQuestion] = useState([]);
    const [keywords, setKeywords ]= useState([]);

    const [errors, setErrors]= useState("");
    const [showError, setShowError] = useState(false);

    const handleErrorClose = () => setShowError(false);
    const handleErrorShow = () => setShowError(true);
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
        const fetchData = async () => {
            const [ questionRes, keywordRes, homepageRes] = await Promise.all([
                fetchAPI("/questions", {}),
                fetchAPI("/keywords", {   }),
                fetchAPI("/homepage", {
                    populate: {
                        hero: "*",
                        seo: { populate: "*" },
                    },
                }),
            ]);
            const questions = await questionRes;
            const kws  = await keywordRes;
            setQuestion(questions.data);
            setKeywords(kws.data);
        };

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);
    function createQuestion(mpObj){

        createAPI('/questions', mpObj)
            // THIS IS HANDLE CREATE
            .then(data => {
                setQuestion(data.data);
                if(data.data.attributes.slug) {
                    //navigate('/message?d=postcreated')
                    setErrors("Saved");
                    handleErrorShow();


                } else {
                    // navigate('/message?d=postfail')
                    setErrors(errors);
                    handleErrorShow();
                }
            }).catch(err => {
            console.log(err);
            handleErrorShow();
        });
    }

  const num = props.ansNum;
 // const asker = props.askerId;
  return (
    <div id={props.id} className="question">
      <div className="body">
        <p>{props.title}</p>
        <div className="control">
          {num > 1 ? `${num} answers` : `${num} answer`}
          <Button className="btn--white btn--lg">
            Answer <span>Question</span>
          </Button>
        </div>
      </div>
      <div className="arrow-down"></div>
      {/*
      <a href={asker.link} key={asker.id} className="asker">
        <img src={asker.img} className="avatar--sm" alt="avatar" />
        {asker.name}
      </a> */}
    </div>
  );
}
