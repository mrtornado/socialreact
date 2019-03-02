import React from "react";
import Posts from "../post/Posts";

const Home = () => (
  <div>
    <div className="jumbotron">
      <h2>Welcome to DivinityBook</h2>
      <p className="lead">
        Do you know what the powers of the Archangels are? Awareness of how the
        Archangels can enhance your life could finally remove your blocks
        putting you on track to fulfilling your unique life’s purpose. The
        Archangels can bring you the blessings of the universe and the love of
        The Divine.
      </p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
