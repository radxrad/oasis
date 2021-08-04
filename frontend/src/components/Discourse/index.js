import React from "react";

export default function Discourse() {
  window.DiscourseEmbed = {
    discourseUrl: "https://ste.trydiscourse.com/",
    discourseEmbedUrl: "https://ste.trydiscourse.com/t/oasis/11",
  };

  (function () {
    var d = document.createElement("script");
    d.type = "text/javascript";
    d.async = true;
    d.src = window.DiscourseEmbed.discourseUrl + "javascripts/embed.js";
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(d);
  })();
  return (
    <div>
      <div id="discourse-comments"></div>
    </div>
  );
}
