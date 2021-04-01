import React,{useState} from "react"
import ReactPlayer from 'react-player'
import { Link } from "react-router-dom";

function Channel({channelName,channelIcon,src}) {
  // states
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
// functions
  const toggleHover = () => {
    setPlaying(!hovered);
     togglePlaying()
    }; 
  // AutoPlay video   
  const togglePlaying = () => setHovered(!playing);
  // define
  const vol = 0
  return (
    <Link to={`/watch/${src}`} className='channel slide-up' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        <img src={channelIcon} className="channel-icon" alt="Channel Icon" onError={(e)=>e.target.src = 'https://img.icons8.com/dotty/80/ffffff/gps-disconnected.png'}/>
        <span>{channelName}</span>
        {/* <div className="channel-slide">
          <ReactPlayer className="preview" url={src} controls volume={vol} playing={playing} muted/>
      </div> */}
    </Link>
  );
}
// {hovered ? 'channel slide-up' : 'channel'}

export default Channel;
