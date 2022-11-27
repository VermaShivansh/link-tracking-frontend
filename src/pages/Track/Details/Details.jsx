import React, { useState } from "react";
import "./Details.scss";
import { ReactComponent as ArrowRight } from "../../right-arrow.svg";
import { ReactComponent as Copy } from "./copy.svg";
import { useNavigate, useParams } from "react-router";
import { ENVS } from "../../../constants";
import { useEffect } from "react";
import axios from "axios";
import Settings from "./components/Settings/Settings";
import Analytics from "./components/Analytics/Analytics";

const Details = () => {
  const generatedUrlId = useParams().id;
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  const generatedUrl = ENVS.BACKEND_URL + "/" + generatedUrlId;

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    if (generatedUrlId) {
      try {
        const res = await axios.get(
          `${ENVS.BACKEND_URL}/getInfo/${generatedUrlId}`
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      {data?.settings && (
        <Settings data={data} setData={setData} getAllInfo={getAllInfo} />
      )}
      {data?.analytics && <Analytics analytics={data.analytics} />}
    </div>
  );
};

export default Details;
