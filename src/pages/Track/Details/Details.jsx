import React, { useState } from "react";
import "./Details.scss";
import { ReactComponent as ArrowRight } from "../../right-arrow.svg";
import { ReactComponent as Copy } from "./copy.svg";
import { useNavigate, useParams } from "react-router";
import { ENVS } from "../../../constants";

const Details = () => {
  const generatedUrlId = useParams().id;

  const [copied, setCopied] = useState(false);
  const generatedUrl = ENVS.BACKEND_URL + "/" + generatedUrlId;
  return (
    <div className="details">
      <div class="webflow-style-input removeRGB">
        <input
          class=""
          type="text"
          disabled={true}
          placeholder={generatedUrl}
        ></input>
        <Copy
          className={`copy ${copied && "copied"}`}
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(generatedUrl);
          }}
        />
        <ArrowRight
          className={"arrow"}
          onClick={() => {
            window.open(generatedUrl);
          }}
        />
      </div>
    </div>
  );
};

export default Details;
