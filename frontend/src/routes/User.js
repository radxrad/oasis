import React, {useEffect, useState} from "react";
import { Button, ListGroup, Container, Modal } from "react-bootstrap";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ListItem from "components/ListItem";
import Question from "components/Question";
import history from "history.js";
import text from "text.json";
import AddQuestion from "components/AddQuestion";
import {fetchAPI, getStrapiURL} from "../lib/api";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../lib/helpers";
import Spinner from "react-bootstrap/Spinner";

export default function User() {
  let navigate = useHistory();
  const { user, isLoading, setUser } = useAuthContext();
  const {questions, setQuestions} = useState([]);
  const {micropubs,setMicropubs} = useState([]);

  // const user = {
  //   name: "User",
  //   id: -1,
  //   img: "https://source.unsplash.com/random",
  // };
  const exampleQuestion = text.question;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      const [ questionRes, micropubRes,  homepageRes] = await Promise.all([
        fetchAPI("/questions", { populate: "*" }),
        fetchAPI("/micropublications", { populate: ["files", "keyword", "writer"] }),
        fetchAPI("/homepage", {
          populate: {
            hero: "*",
            seo: { populate: "*" },
          },
        }),
      ]);
      const cats = await questionRes;
      const micros  = await micropubRes;
      setQuestions(cats.data);
      setMicropubs(micros.data);
    };

    fetchData()
        // make sure to catch any error
        .catch(console.error);
  }, []);

  if (isLoading) {
    return <Spinner size="small" />;
  };
  return (
    <Container className="userpage max-window">
      <Modal show={show} onHide={handleClose}>
        <AddQuestion close={handleClose} />
      </Modal>
      <div>
        <div className="welcome heading">
          {user?.picture ?
              (<img src={user?.picture.url} alt="user-avatar" className="avatar--lg"></img>):
              (<img src="https://source.unsplash.com/random" alt="user-avatar" className="avatar--lg"></img> )}
          Welcome, {user?.name}
        </div>
        <div className="block">
          <div className="heading">
            My Micropubs{" "}
            <Button
              className="btn--blue btn--lg"
              onClick={() => history.push("/publish")}
            >
              <BsFillPlusSquareFill />
              <span>Create a Micropub</span>
            </Button>
          </div>
          <ListGroup className="list-group--small">
            ( micropublications?
            <ListItem
              type="micropub"
              title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>

            )
          </ListGroup>
        </div>

        <div className="block">
          <div className="heading">
            My Question & Answers
            <Button className="btn--blue btn--lg" onClick={handleShow}>
              <MdQuestionAnswer close={handleClose} />
              <span>Ask a Question</span>
            </Button>
          </div>
          <ListGroup className="list-group--small">
            <ListItem
              type="question"
              title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
            <ListItem
              type="answer"
              title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
            <ListItem
              type="question"
              title="Looking at vaccine hesitancy through Behavioural Economics"
            ></ListItem>
          </ListGroup>
        </div>
      </div>
      <div>
        <div className="block">
          <div className="heading">
            My Feeds
            <Button className="btn--blue btn--lg">Browse Open Questions</Button>
          </div>
          <ListGroup className="list-group--large">
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
            <Question
              asker={exampleQuestion.asker}
              title={exampleQuestion.title}
              uid={exampleQuestion.uid}
              ansNum={0}
            />
          </ListGroup>
        </div>
      </div>
    </Container>
  );
}
