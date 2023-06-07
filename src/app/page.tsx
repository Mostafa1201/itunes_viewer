"use client";
import { useEffect, useState } from "react";
import SearchComponent from "./components/Search/SearchComponent";
import ListComponent from "./components/List/ListComponent";

const HomePage = () => {
  const [tracks, setTracks] = useState("");

  useEffect(() => {}, [tracks]);
  return (
    <div className="homepage-component-wrapper">
      <div style={{ flex: 0.2 }}></div>
      <SearchComponent setTracks={setTracks} />
      <div style={{ flex: 0.1 }}></div>
      <ListComponent tracks={tracks} />
    </div>
  );
};

export default HomePage;
