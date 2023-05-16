import React, { useEffect, useState, useContext } from "react";
import {Button, Form, Container, Row, Modal} from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import {ReviewsConfigContext, Reviews, ReviewForm, ErrorBox, ReviewStats} from "strapi-ratings-client"

import { useAuthContext } from "../context/AuthContext";
import { fetchAPI, getStrapiURL } from "../lib/api";

import MicropubCardAnswer from "../components/MicropubCardAnswer";
import AddQuestion from "../components/AddQuestion";
import {getToken} from "../lib/helpers";

export default function Question(props) {
    const { slug } = useParams(); // router.query;

    //const { user, setUser } = useAuthContext();
    const { user } = useAuthContext();
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
    const [postsData, setPostsData] = useState([]);// ;
    const { setUser, setContentID, setCanPostReview  } = useContext(ReviewsConfigContext);
    useEffect(() => {
        const newUser = user;
        if (user) {
            newUser.token = getToken();
        }

        setUser(newUser);
    }, [user]);
    //  const { contentID } = useParams();
    useEffect(() => {

        if (slug) {
            setContentID(slug);
            setCanPostReview(true);
        }
    }, [slug]);

    useEffect(() => {
        const fetchReviewsCount = async (slug) => {
            const url = getStrapiURL(`/api/ratings/reviews/${slug}/count`);
            const res = await fetch(url);
            const { count } = await res.json();
            const updatedPostsData = postsData.map(p => {
                if (p.contentID === slug) {
                    p.reviewsCount = count;
                }
                return p;
            });
            setPostsData(updatedPostsData);
        };
        // postsData.map(p => {
        //     fetchReviewsCount(p.contentID);
        // });
        fetchReviewsCount(slug);
    }, []);


    useEffect(() => {
        //const slug ="culture-and-identification-of-a-deltamicron-sars-co-v-2-in-a-three-cases-cluster-in-southern-france"

        console.log("query");
        console.log("passed slug: " + slug);

        const fetchData = async () => {
            const [questionRes, micropubRes] = await Promise.all([
                fetchAPI("/questions", {
                    filters: {
                        slug: slug,
                    },
                    populate: ["micropublications", "writer", "micropublications.writer", "micropublications.files"],
                    // populate: ["*"],
                }),
                fetchAPI("/micropublications", {
                    // filters: {
                    //     micropublications: slug,
                    // },
                    //   populate: ["files", "keyword", "writer.picture", "writer", "ratings"],
                }),


            ]);
            const micros = await micropubRes;
            const aq = await questionRes;
            setMicropubs(micros.data);
            setQuestion(aq.data[0]);
        }
        fetchData()
            // make sure to catch any error
            .catch( (err) => {
                console.error(err);
                if (err.status == 401){

                }
            });
    }, []);
    const [show, setShow] = useState(false);
    const handleQClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div id="question" className="qpage max-window">
            <Container >
                <Modal show={show} onHide={handleQClose}>
                    <AddQuestion close={handleQClose} />
                </Modal>
                <Row className="writing">

                    <div className="answer">
                        {question ? question.attributes.question : ""}
                    </div>

                    <div>
                        {question ? question.attributes.details : ""}
                    </div>

                    <div className="control">
                        <Button className="btn--white">
                            Answer With Existing Micropub
                        </Button>
                        <Button className="btn--lg">
                            <BsFillPlusSquareFill />
                            Write New Answer
                        </Button>
                        <Button className="btn--blue btn--lg" onClick={handleShow} close={handleQClose} >
                            <MdQuestionAnswer />
                            <span>Ask Another Question</span>
                        </Button>
                    </div>
                </Row>

                <Row>
                    <div className={"heading"}>
                        Micropubs
                    </div>
                </Row>
                <Row >


                    <div >
                        {question ?
                            question.attributes.micropublications.data.length > 0 ?
                                question.attributes.micropublications.data.map(item => {
                                    let file = item.attributes?.files?.data?.length > 0 ? item.attributes?.files?.data[0].attributes.url : undefined;
                                    file = file ? getStrapiURL(file) : file;
                                    return <MicropubCardAnswer
                                        figure={file}
                                        authorIds={item.attributes.writer.data?.id}
                                        title={item.attributes.title}
                                        abstract={item.attributes.abstract}
                                        id={item.attributes.slug}
                                        key={item.attributes.slug}

                                    ></MicropubCardAnswer>
                                }


                                ) : "No Micropublications"
                            : "Loading"}
                    </div>
                </Row>
                <ReviewForm />
                <ErrorBox />
                <Reviews />

            </Container>
        </div>
    )
}
