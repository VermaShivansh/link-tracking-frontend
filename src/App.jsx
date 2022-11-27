import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./App.module.scss";
import bg from "./bg2.mp4";
import { Route, Routes, useNavigate } from "react-router-dom";
import Generate from "./pages/Generate";
import Track from "./pages/Track/Track";
import Redirect from "./pages/Redirect/Redirect";

const App = () => {
  const [hideVideo, setHideVideo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {});

  const onTrackClick = () => {};

  const handleClick = (path) => {
    setHideVideo(1);
    setTimeout(() => {
      setHideVideo(2);
      navigate(path);
    }, 1000);
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <div className={styles.background}>
                <video
                  src={bg}
                  aria-label="background"
                  loop={true}
                  autoPlay={true}
                  muted={true}
                  className={`${hideVideo === 1 ? styles.hiding : ""} ${
                    hideVideo === 2 ? styles.hide : ""
                  }`}
                />
              </div>
              <div className={styles.homeView}>
                <div>
                  <button onClick={() => handleClick("/generate")}>
                    Generate
                  </button>
                </div>
                <div>
                  <button onClick={() => handleClick("/track")}>Track</button>
                </div>
              </div>
            </>
          }
        />
        <Route path="/generate" exact element={<Generate />}></Route>
        <Route path="/track" exact element={<Track />}></Route>
        <Route path="/track/:id" exact element={<Track />}></Route>
        <Route path="/:id" element={<Redirect />}></Route>
      </Routes>
    </div>
  );
};

export default App;
