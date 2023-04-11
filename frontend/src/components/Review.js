import {Button, Form} from "react-bootstrap";
import StarRating from "./StarRating";
import VisibilitySelector from "./VisibilitySelector";
import {MdRateReview} from "react-icons/md";
import React from "react";

import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import { Button } from "react-bootstrap";
import {createAPI, fetchAPI} from "../lib/api";
import { MdQuestionAnswer } from "react-icons/md";


export default function WriteReview(props) {
    let navigate = useHistory();
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const handleShowNewPublication = (e) =>{
        navigate.push({
            pathname: `/Publish/`,
            state: {
                question: props.title,
                questionid: props.id
            },
        });
    }
    const handleShowQuestion = (e) =>{
        navigate.push({
            pathname: `/question/${props.slug}`,
            state: {
                question: props.title,
                questionid: props.id
            },
        });
    }
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
                fetchAPI("/micropublications", {
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
        <Form className="write-review">
            <Form.Group style={{ flex: "1 0" }}>
                <Form.Control
                    as="textarea"
                    placeholder="Write a review..."
                    className="review"
                    id="write_review"
                />
            </Form.Group>
            <Form.Group className="controls">
                <div className="selectors">
                    <StarRating
                        rating={reviewRating}
                        setRating={setReviewRating}
                        hover={reviewRatingHover}
                        setHover={setReviewRatingHover}
                        readonly={false}
                    />
                    <VisibilitySelector
                        visibility={visibility}
                        handleSelect={handleSelect}
                    />
                </div>

                <Button className="btn--md">
                    <MdRateReview />
                    Post Review
                </Button>
            </Form.Group>
        </Form>
    );
}

