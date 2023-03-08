import React from "react";
import { Card } from "react-bootstrap";
import history from "history.js";
export default function MicropubCard(props) {
  return (
    <Card className="micropub" onClick={() => history.push(`/read/${props.id}`)}>
      <div className="content">
          { props.figure && <Card.Img src={props.figure} alt="img" />
          }

        <div>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text dangerouslySetInnerHTML={{__html:props.abstract}} ></Card.Text>
        </div>
      </div>
      <div className="authors">
         {/*{props.authors?*/}
         {/*  props.authors.map((author) => (*/}
         {/*     <Card.Link href={author.attributes.link} key={author.attributes.id}>*/}
         {/*       <img src={author.attributes.picture} className="avatar--sm" alt="avatar" />*/}
         {/*       {author.attributes.name}*/}
         {/*     </Card.Link>*/}
         {/*   ))*/}
         {/* : ""}*/}
          {props.authors?
             (
               <Card.Link href={props.authors.attributes.name} key={props.authors.attributes.id}>
                   {
                       props.authors.attributes.picture? (
                           <img src={props.authors.attributes.picture} className="avatar--sm" alt="avatar" />
                       ) : ""
                   }

                 {props.authors.attributes.name}
               </Card.Link>
             )
           : ""}
      </div>
        <div className="rating">

            {props.rating?
                (
                    <div>*</div>
                )
                : ""}
        </div>
    </Card>
  );
}
