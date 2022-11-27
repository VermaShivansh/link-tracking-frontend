import React, { useState } from "react";
import "./Track.scss";

import { ReactComponent as ArrowRight } from "../right-arrow.svg";
import { useNavigate, useParams } from "react-router";
import Details from "./Details/Details";

const Track = () => {
  const id = useParams().id;
  const [input, setInput] = useState();
  const navigate = useNavigate();

  return (
    <div className="track">
      <div className="heading">Track your URL</div>
      {!id ? (
        <div className="inputBox">
          <div class="webflow-style-input">
            <input
              class=""
              type="text"
              onChange={(e) => setInput(() => e.target.value.trim())}
              placeholder="Enter link you generated"
            ></input>
            <ArrowRight
              className={"arrow"}
              onClick={() => {
                navigate(`/track/${input.substring(input.length - 8)}`);
              }}
            />
          </div>
        </div>
      ) : (
        <Details />
      )}
    </div>
  );
};

export default Track;
