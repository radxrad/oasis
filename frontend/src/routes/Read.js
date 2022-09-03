import React, {useEffect, useState} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { Button, Modal, Form } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar, BsStarFill } from "react-icons/bs";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import MicropubBody from "components/MicropubBody";
//import text from "text.json";
import AddQuestion from "components/AddQuestion";
import moment from "moment";
//import a_question from "discourse_json/post_20.json";

import VisibilitySelector from "components/VisibilitySelector";
import StarRating from "../components/StarRating";
import {fetchAPI, getStrapiURL} from "../lib/api";


export default function Read() {
  const { slug } = useParams(); // router.query;
 // const example = text.micropub;
 // const post = a_question;
  const time = (mp) =>  moment.unix(mp.attributes.createdAt).format("MM/DD/YYYY");
  const [voteType, setVoteType] = useState(null);
  const [voteNum, setVoteNum] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRatingHover, setReviewRatingHover] = useState(0);

  const [visibility, setVisibility] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  // const [reviews, setReviews] = useState([
  const [reviews] = useState([{ user: "Aa", text: "testing", rating: 3 }]);

  const [micropubs, setMicropubs] = useState();
  const [categories, setCategories ]= useState([]);
  const [keywords, setKeywords ]= useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);


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
     const [ micropubRes ] = await Promise.all([fetchAPI("/micropublications", {
        filters: {
          slug: slug,
        },
        populate: ["files", "keyword", "writer.picture"],
      })
      ]);
      const micros  = await micropubRes;
      setMicropubs(micros.data[0]);
    }
    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, []);

  const handleStar = () => setIsStarred(!isStarred);
  const handleSelect = (e) => setVisibility(e);
  const handleVoteClick = (type) => {
    if (voteType === null) {
      setVoteNum(type === true ? voteNum + 1 : voteNum - 1);
      setVoteType(type);
    } else if (type === voteType) {
      setVoteType(null);
      setVoteNum(type === true ? voteNum - 1 : voteNum + 1);
    } else {
      setVoteType(type);
      setVoteNum(type === true ? voteNum + 2 : voteNum - 2);
    }
  };

  const writeReview = (
    <Form className="write-review">
      <Form.Group style={{ flex: "1 0" }}>
        <Form.Control
          as="textarea"
          placeholder="Write a review..."
          className="review"
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

  return (
    <div id="read" className="max-window">
      <Modal show={showQuestion} onHide={() => setShowQuestion(false)}>
        <AddQuestion close={() => setShowQuestion(false)} />
      </Modal>
      <div>
        { micropubs ?
          <MicropubBody
              title={micropubs.attributes.title}
              figure={getStrapiURL()+micropubs.attributes.files?.data[0].attributes.url}
              body={micropubs.attributes.body}
              refList={micropubs.attributes?.citations}
          /> : ""

        }

        {writeReview}
        <div className="review__wrapper">
          {reviews
            ? reviews.map((item, i) => (
                <div id={i} key={i} className="review__item">
                  <div className="header">
                    {item.user}{" "}
                    <StarRating readonly={true} rating={item.rating} />{" "}
                  </div>
                  {item.text}
                </div>
              ))
            : ""}
        </div>
      </div>

      <div className="sidebar">
        <div className="info">
          <div className="publish-time">
            <div className="label">Published:</div>
            <div className="time">{time}</div>
          </div>
          <div className="authors">
            <div className="label">Author(s):</div>
            <div className="list">
              {micropubs && micropubs.attributes.writer
                ?   <a href={micropubs.attributes.writer.data.attributes.email} key={micropubs.attributes.writer.data.id}>
                          <img
                              src={getStrapiURL()+micropubs.attributes.writer.data.attributes.picture.data.attributes.url}
                              className="avatar--sm"
                              alt="avatar"
                          />
                          {micropubs.attributes.writer.data.attributes.name}
                        </a>


                : ""}
            </div>
          </div>
          <div className="data">
            <div className="label">Data and Resources:</div>
            <div className="list">
              {micropubs && micropubs.attributes.files
                ? micropubs.attributes.files.data.map((file) => (
                    <a href={getStrapiURL()+file.attributes.url} key={file.id}>
                      {file.attributes.name}
                      <BsCloudDownload className="sidebar__icon" />
                    </a>
                  ))
                : ""}
            </div>
          </div>
          <Button className="btn--white view-related-btn">
            View Related Questions
          </Button>
        </div>
        <div className="controls">
          <div className="icon-group">
            <div id="vote-btn" className={"vote--" + voteType}>
              <GoArrowUp
                id="upvote-btn"
                onClick={() => handleVoteClick(true)}
              />
              {voteNum}
              <GoArrowDown
                id="downvote-btn"
                onClick={() => handleVoteClick(false)}
              />
            </div>

            <Button className="icon-btn" id="star-btn" onClick={handleStar}>
              {isStarred ? (
                <BsStarFill className="star-btn--filled" />
              ) : (
                <BsStar />
              )}
            </Button>
          </div>
          <Button
            className="btn--blue btn--md"
            onClick={() => setShowQuestion(true)}
          >
            <MdQuestionAnswer />
            Ask a Question
          </Button>
          <Button
            className="btn--blue btn--md"
            onClick={() => console.log("aa")}
          >
            <MdRateReview />
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
}
