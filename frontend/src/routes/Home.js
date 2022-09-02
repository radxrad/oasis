import { Button, Form, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

import MicropubCard from "components/MicropubCard";
import text from "text.json";
//import history from "history.js";
// import posts from "posts.json";
import axios from "axios";
import {fetchAPI, getStrapiURL} from '../lib/api';


export default function Home(apikey, apiusername) {
  //const example = text.micropub;
  const [micropubs, setMicropubs] = useState([]);
  const [categories, setCategories ]= useState([]);
  const [keywords, setKeywords ]= useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("user"));
  const [isSignedIn,setIsSignedIn] = useState(localStorage.getItem("user"));
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
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
      const [ categoriesRes, micropubRes, keywordRes, homepageRes] = await Promise.all([
        fetchAPI("/categories", { populate: "*" }),
        fetchAPI("/micropublications", { populate: ["files", "keyword", "writer"] }),
        fetchAPI("/keywords", { populate: "*" }),
        fetchAPI("/homepage", {
          populate: {
            hero: "*",
            seo: { populate: "*" },
          },
        }),
      ]);
      const cats = await categoriesRes;
      const micros  = await micropubRes;
      const kws  = await keywordRes;
      setCategories(cats.data);
      setMicropubs(micros.data);
      setKeywords(kws.data);
    }

    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, []);

  async function handleSignUp(e) {
    e.preventDefault();
    const handleUsername = (e)=> setUsername(e.target.value);
    const handlePassword = (e)=> setPassword(e.target.value);
    // const options = {
    //   method: "POST",
    //   url: "https://stoplight.io/mocks/oasis/oasis/19253909/signup",
    //   headers: { "Content-Type": "application/json", Prefer: "" },
    //   data: {
    //     firstName: "Alice",
    //     lastName: "Smith",
    //     email: "alice.smith@gmail.com",
    //     password: "1234",
    //   },
    // };
    //
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //     window.location.replace("/user");
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
     const { data } = await axios.post(getStrapiURL()+'/api/auth/local', {
      identifier: username,
      password: password,
    }).then(response => {
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setLoggedIn(response.data)
    })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });

  }

  // const [ latestposts, setLatestposts ] = useState([])
  //
  // useEffect(() => {
  //   fetch('https://discourse.earth2.ucsd.edu/posts.json', {
  //     method: 'GET',
  //     headers: {
  //
  //       'Api-Key': "",
  //       'Api-Username': 'system'
  //     }
  //   })
  //       .then(response => response.json())
  //       .then(data => {
  //         data.latest_posts.forEach (post => setLatestposts(latestposts => [...latestposts, post]))
  //
  //       }).catch(err => console.log(err))
  // })

  return (
    <div className="home light-bg">
      <Container>
        <Row className="header">
          <div className="headlines">
            <div className="headline--black mb-4">
              <b>Get</b> and <b>Share</b> rapid science micropubs for COVID-19
            </div>
            <div className="headline--blue mb-2">
              <b>Get</b> answers on the latest research from other experts in
              the field.
            </div>
            <div className="headline--blue">
              <b>Share</b> your research with the world through
              micro-publications.
            </div>
          </div>
          {isSignedIn ? (
            ""
          ) : (
            <Form className="signup__container">
              <div className="signup__header">Join OASIS</div>
              <Form.Control
                type="test"
                className="signup__textbox"
                placeholder="First Name"
              />
              <Form.Control
                type="test"
                className="signup__textbox"
                placeholder="Last name"
              />
              <Form.Control
                type="email"
                className="signup__textbox"
                placeholder="Email"
              />
              <Form.Control
                type="password"
                className="signup__textbox"
                placeholder="Password"
              />
              <Button
                className="btn--md"
                type="submit"
                onClick={(e) => handleSignUp(e)}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Row>

        <Row className="preview">
          <div className="preview__subtitle">What is a MICROPUB(LICATION)?</div>
          <div className="definition">{text.intro}</div>
        </Row>
        <Row className="preview">
          <p className="preview__subtitle">Featured QUESTIONS AND MICROPUBS</p>
          <div className="mp-list">
            {micropubs
              ? micropubs.map((item, i) => (
                  <MicropubCard
                    figure={getStrapiURL()+item.attributes.files?.data[0].attributes.url }
                    authorIds={item.attributes.writer.data}
                    title={item.attributes.title}
                    abstract={item.attributes.abstract}
                    id={item.attributes.slug}
                    key={i}
                  ></MicropubCard>
                ))
              : ""}
            {/*  <MicropubCard*/}
            {/*    img={example.img}*/}
            {/*    authorIds={example.authorIds}*/}
            {/*    title={example.title}*/}
            {/*    abstract={example.abstract}*/}
            {/*    uid={example.uid}*/}
            {/*></MicropubCard>*/}

            {/* {posts.latest_posts.slice(0, 3).map((post) => (
              <MicropubCard
                img={post.img}
                authorIds={post.username}
                title={post.topic_html_title}
                abstract={post.raw}
                uid={post.id}
              ></MicropubCard>
            ))} */}
          </div>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
