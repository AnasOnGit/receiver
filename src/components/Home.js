import React,{useState,useEffect} from "react"
import ReactPlayer from 'react-player'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import axios from "axios";
// import parser from "iptv-playlist-parser";
import Channels from "./Channels";

function Home() {
    
    // const [hindiChannels, setHindiChannels] = useState("");
    // // effect
    // useEffect(() => {
    //   axios
    //     .get("https://iptv-org.github.io/iptv/languages/hin.m3u")
    //     .then(function (response) {
    //       // handle success
  
    //       // console.log(response.data);
    //       setHindiChannels(response.data);
    //       const result = parser.parse(response.data);
  
    //       console.log(result.items);
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .then(function () {
    //       // always executed
    //     });
    // }, []);
  return (
    <div className="App">
      <section className="category-section">
        <h2>Movies</h2>
        <Channels category={"https://iptv-org.github.io/iptv/categories/movies.m3u"}/>
      </section>
      <section className="category-section">
        <h2>Kids</h2>
        <Channels category={"https://iptv-org.github.io/iptv/categories/kids.m3u"}/>
      </section>
      <section className="category-section">
        <h2>Entertainment</h2>
        <Channels category={"https://iptv-org.github.io/iptv/categories/entertainment.m3u"}/>
      </section>
      <section className="category-section">
        <h2>News</h2>
        <Channels category={"https://iptv-org.github.io/iptv/categories/news.m3u"}/>
      </section>
      <section className="category-section">
        <h2>Music</h2>
        <Channels category={"https://iptv-org.github.io/iptv/categories/music.m3u"}/>
      </section>
      <section className="category-section">
        <h2>Other</h2>
        {/* <Channels category={"https://iptv-org.github.io/iptv/categories/xxx.m3u"}/> */}
      </section>
    </div>
  );
}


export default Home;
