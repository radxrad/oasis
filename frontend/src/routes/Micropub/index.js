import Iframe from "react-iframe";
//import IframeResizer from 'iframe-resizer-react'
import { Grid } from "@material-ui/core";
import React from "react";

function Micropub(props, { draggableMapRoutes = [] }) {
  // watch for a URL change
  // flashpub Single Page App, so no change in url.
  new MutationObserver(function (mutations) {
    mutations.some(function (mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "src") {
        console.log(mutation);
        console.log("Old src: ", mutation.oldValue);
        console.log("New src: ", mutation.target.src);
        return true;
      }

      return false;
    });
  }).observe(document.body, {
    attributes: true,
    attributeFilter: ["src"],
    attributeOldValue: true,
    characterData: false,
    characterDataOldValue: false,
    childList: false,
    subtree: true,
  });

  // messaging.
  var receiveMessage = function receiveMessage(e) {
    if (
      e.origin !== "https://staging.outbreak.flashpub.io/" ||
      e.origin !== "https://outbreak.flashpub.io/"
    )
      return;

    var url = window.location.href,
      url_parts = url.split("/"),
      allowed = url_parts[0] + "//" + url_parts[2];

    // Only react to messages from same domain as current document
    //if (e.origin !== allowed) return;
    // Handle the message
    switch (e.data) {
      case "iframe_change":
        console.log("iframe_change");
        break;
    }
  };
  window.addEventListener("message", receiveMessage, false);

  return (
    <Grid container>
      <Iframe
        url="https://staging.outbreak.flashpub.io/publish/covid-19-diagnostics-assessment"
        width="450px"
        height="900px"
        id="flashPubId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </Grid>
  );
  // return (
  // <Grid
  //     container>
  //         <IframeResizer
  //             url="https://staging.outbreak.flashpub.io/publish/covid-19-diagnostics-assessment"
  //         width="450px"
  //         height="900px"
  //         id="flashPubId"
  //         className="myClassname"
  //         display="initial"
  //         position="relative"/>
  //
  // </Grid>
  // )
}
export default Micropub;
