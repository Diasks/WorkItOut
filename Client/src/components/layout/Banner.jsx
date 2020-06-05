import React from "react";

const Banner = () => {
  return (
    <header className="banner">
      <a href="/"><span className="logo logo-full big"></span></a>
      <h2 className="label mustard">Utmana din vardag</h2>
      <div className="description">Här finns olika utmaningar att välja bland.</div>
      <div className="description">Du har viljan och styrkan, vi har programmen.</div>
    </header>
  );
};

export default Banner;
