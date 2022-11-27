import React, { useState } from "react";
import "./Generate.scss";
import axios from "axios";
import Button from "../components/Button/Button";
import { ENVS } from "../constants";
import { ReactComponent as ArrowRight } from "./right-arrow.svg";
import { useNavigate } from "react-router";

const Generate = () => {
  const [input, setInput] = useState({ tag_name: "", target_url: "" });
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateUrl = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${ENVS.BACKEND_URL}/generate`, input);
      const data = res.data.data;
      setGeneratedUrl(data.generatedLink);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate">
      <div className="heading">Generate your URL</div>
      <div class="webflow-style-input">
        <input
          class=""
          type="text"
          onChange={(e) =>
            setInput((prev) => ({ ...prev, tag_name: e.target.value }))
          }
          placeholder="Enter a tagname for URL"
        ></input>
      </div>
      <div class="webflow-style-input">
        <input
          class=""
          type="text"
          onChange={(e) =>
            setInput((prev) => ({ ...prev, target_url: e.target.value }))
          }
          placeholder="Enter URL you want to track"
        ></input>
      </div>
      <Button onClick={() => generateUrl()}>Generate</Button>
      {generatedUrl !== "" && (
        <div class="webflow-style-input removeRGB">
          <input
            type="text"
            disabled={true}
            placeholder={ENVS.BACKEND_URL + "/" + generatedUrl}
          />
          <ArrowRight
            onClick={() => {
              navigate(`/track/${generatedUrl}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Generate;
