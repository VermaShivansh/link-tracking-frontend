import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ENVS } from "../../constants";
import "./Redirect.scss";

const Redirect = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const getTargetUrl = async () => {
    try {
      const res = await axios.get(`${ENVS.BACKEND_URL}/getTargetLink/${id}`);
      const data = res.data.data;
      window.location.href = data.target_url;
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };

  useEffect(() => {
    getTargetUrl();
  }, []);

  return <div className="redirect"></div>;
};

export default Redirect;
