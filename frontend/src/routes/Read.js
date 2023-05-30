import React, {useContext, useEffect, useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams, Redirect, useHistory
} from "react-router-dom";
import { ReviewsConfigContext,
    ErrorBox,
    ReviewStats,
    ReviewsProvider,
    Reviews,
    ReviewForm
} from "strapi-ratings-client";


import { Button, Modal, Form } from "react-bootstrap";
import { MdQuestionAnswer, MdRateReview } from "react-icons/md";
import { BsCloudDownload, BsStar, BsStarFill } from "react-icons/bs";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import MicropubBody from "components/MicropubBody";
//import text from "text.json";
import AddQuestion from "components/AddQuestion";
import AddReview from "components/AddReview";
import moment from "moment";
//import a_question from "discourse_json/post_20.json";

import VisibilitySelector from "components/VisibilitySelector";
import StarRating from "../components/StarRating";
import {createAPI, fetchAPI, getStrapiURL} from "../lib/api";
import {useAuthContext} from "../context/AuthContext";
import { format } from 'date-fns'
import slugify from "slugify";
import {getRefreshToken, getToken} from "../lib/helpers";

export default function Read() {
    const { user } = useAuthContext();
  const { slug } = useParams(); // router.query
    const [postsData, setPostsData] = useState([]);// ;
 // const example = text.micropub;
 // const post = a_question;
  const time = (mp) =>  moment.unix(mp.attributes.createdAt).format("MM/DD/YYYY");
  const [voteType, setVoteType] = useState(null);
  const [voteNum, setVoteNum] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewRatingHover, setReviewRatingHover] = useState(0);
    const [review, setReview] = useState("");
  const [visibility, setVisibility] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showReview, setShowReview] = useState(false);
   const [reviews, setReviews] = useState([]);
 // const [reviews] = useState([{ user: "Aa", text: "testing", rating: 3 }]);
    let history = useHistory();
  const [micropub, setMicropub] = useState();
  const [categories, setCategories ]= useState([]);
  const [keywords, setKeywords]= useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

    const stopEventPropagationTry = (event) => {
        if (event.target === event.currentTarget) {
            try {
                event.stopPropagation();
            } catch (e) {
                console.log(e);
            }

        }
    };
    const { setUser, setContentID, setCanPostReview  } = useContext(ReviewsConfigContext);
    useEffect(() => {
        const newUser = user;
        if (user) {
            newUser.token = getToken();
        }

        setUser(newUser);
    }, [user]);

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
     const [ micropubRes] = await Promise.all([
         fetchAPI("/micropublications", {
        filters: {
          slug: slug,
        },
        populate: ["files", "keyword", "writer.picture", "writer", "ratings"],
      }),
         // fetchAPI("/reviews", {
         //     filters: {
         //         micropublication: {
         //             slug: slug,
         //         }
         //     },
         //     populate: [ "ratings"],
         // }),
      ]);
      const micros  = await micropubRes;
     // const reviews = await reviewsRes;
      setMicropub(micros.data[0]);
       // setReviews(reviews.data);
    };
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
    const refresh = () => window.location.reload(true)


    const handleUpdateReview = (e) => {
        stopEventPropagationTry(e);
        setReview(e.target.value);
    };
    const handleAddReview = async (e) => {
        if (review === undefined || review.trim() === "") {
            return;
        }
        const submitQ = {
            "review":review,
            "micropublication":  micropub.id,
            "slug" : slugify(review),
        };
        return createAPI("/reviews",submitQ ).then((response)=>{
            console.log(response.data);
            // history.push("/user");
            let slug = response.data.id;
            //let redir = `/reviews/${slug}`;
            //Redirect(redir);
           // history.push(redir);
            let newList = reviews.push(response);
            setReviews(reviews);
            refresh();
        }).catch((err) => {
            console.error(err);

            if (user) {
                getRefreshToken();
            } else {
                // display some dialog login
                Redirect("/signin");
            }


        });
    };

  const writeReview = (
    // <Form className="write-review">
    //   <Form.Group style={{ flex: "1 0" }}>
    //     <Form.Control
    //       as="textarea"
    //       placeholder="Write a review..."
    //       className="review"
    //       id="write_review"
    //       onChange={handleUpdateReview}
    //     />
    //   </Form.Group>
    //   <Form.Group className="controls">
    //     <div className="selectors">
    //       <StarRating
    //         rating={reviewRating}
    //         setRating={setReviewRating}
    //         hover={reviewRatingHover}
    //         setHover={setReviewRatingHover}
    //         readonly={false}
    //       />
    //       <VisibilitySelector
    //         visibility={visibility}
    //         handleSelect={handleSelect}
    //       />
    //     </div>
    //
    //     <Button className="btn--md" onClick={handleAddReview}>
    //       <MdRateReview />
    //       Post Review
    //     </Button>
    //   </Form.Group>
    // </Form>
      <div>

          <ReviewForm />
          <ErrorBox />
      </div>
  );
 const renderMpBody = (micropub)=> {

     let file = micropub.attributes?.files?.data?.length > 0 ? micropub.attributes?.files?.data[0].attributes.url: undefined;
     file = file? getStrapiURL(file): file;
     return  <MicropubBody
         title={micropub.attributes.title}
         figure={file}
         body={micropub.attributes.body}
         abstract={micropub.attributes.abstract}
         refList={micropub.attributes?.citations}
     />
  }
  const renderWriter= (micropub) => {
      const file = micropub.attributes?.files?.data?.length > 0 ? micropub.attributes?.files?.data[0].attributes.url: undefined;
      const image = file !== undefined ? getStrapiURL('/') + file : "https://source.unsplash.com/random"
      return <a href={micropub.attributes.writer.data.attributes.email} key={micropub.attributes.writer.data.id}>
        <img
            src={image}
            className="avatar--sm"
            alt="avatar"
        />
        {micropub.attributes.writer.data.attributes.name}
      </a>

  }
  const renderFileList = (micropub) => {
    const file = micropub.attributes?.files?.data?.length > 0 ? micropub.attributes?.files?.data: [];
      file.map((file) => (
        <a href={getStrapiURL() + file.attributes.url} key={file.id}>
          {file.attributes.name}
          <BsCloudDownload className="sidebar__icon"/>
        </a>
    ))
  }

  return (
    <div id="read" className="max-window">
      <Modal show={showQuestion} onHide={() => setShowQuestion(false)}>
        <AddQuestion close={() => setShowQuestion(false)}  />
      </Modal>
        <Modal show={showReview} onHide={() => setShowReview(false)}>
            <AddReview close={() => setShowReview(false)}  />
        </Modal>
      <div>
        { micropub ? renderMpBody(micropub) : ""

        }
          {/*<ReviewForm />*/}
          <ErrorBox />
          <Reviews />
        {writeReview}
      {/*    {  postsData.map(p => {*/}
      {/*    return (*/}
      {/*    <div className="p-4 my-3 border rounded" key={slug}>*/}
      {/*    <h5><Link to={"/"+p.contentID}>{slug}</Link></h5>*/}
      {/*        <ReviewStats />*/}
      {/*    </div>*/}
      {/*    )*/}
      {/*}) }*/}
      {/*  <div className="review__wrapper">*/}
      {/*    {reviews*/}
      {/*      ? reviews.map((item, i) => (*/}
      {/*          <div id={i} key={i} className="review__item">*/}
      {/*            <div className="header">*/}
      {/*              {item.attributes?.user}{" "}*/}
      {/*              <StarRating readonly={true} rating={item.attributes?.ratings.data[0]?.attributes?.rating} />{" "}*/}
      {/*            </div>*/}
      {/*            {item.attributes?.review}*/}
      {/*          </div>*/}
      {/*        ))*/}
      {/*      : ""}*/}
      {/*  </div>*/}
      </div>


      <div className="sidebar">
        <div className="info">
          <div className="publish-time">
            <div className="label">Published:</div>
            <div className="time">{micropub?.attributes?.publishedAt ?
               format (Date.parse(micropub?.attributes?.publishedAt), "yyyy/mm/dd"): ""
            }</div>
          </div>
          <div className="authors">
            <div className="label">Author(s):</div>
            <div className="list">
              {micropub && micropub.attributes.writer
                  ? renderWriter(micropub): ""}
            </div>
          </div>
          <div className="data">
            <div className="label">Data and Resources:</div>
            <div className="list">
              {micropub && micropub.attributes.files
                ? renderFileList(micropub)
                : ""}
            </div>
          </div>
            { micropub?.attributes?.question ? (
                <Button className="btn--white view-related-btn">
                    <a  href={`/question/${micropub?.attributes?.question.attributes.slug}`}>
                        View Related Question
                    </a>
                </Button> ) : ""
            }

        </div>
        <div className="controls">
            <ReviewStats/>
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


          </div>
          <Button
            className="btn--blue btn--md"
            onClick={() => setShowQuestion(true)}
          >
            <MdQuestionAnswer />
            Ask a Question
          </Button>



          {/*<Button*/}
          {/*  className="btn--blue btn--md"*/}
          {/*  onClick={() => setShowReview(true)}*/}
          {/*>*/}
          {/*  <MdRateReview />*/}
          {/*  Write a Review*/}
          {/*</Button>*/}

        </div>
      </div>
    </div>
  );
}
