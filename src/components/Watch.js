import React,{useState,useEffect,useRef} from "react"
import ReactPlayer from 'react-player'
import {useParams } from "react-router-dom";
import screenfull from "screenfull"

// Icons import
import { AiFillPauseCircle } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitFill } from "react-icons/ri";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";

// helper functions
function useKey(key, cb) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}


function Watch({search}) {
  // state
  const [FScr,setFScr] = useState(true)
  const [playing,setPlaying] = useState(true)
  const [controllerClass,setControllerClass] = useState("controllers")
  const [mute,setMute] = useState(false)
  // define
    let src = window.location.pathname.replace('/watch/','');
    //TODO: check if video is playable
    // console.log(ReactPlayer.canPlay(src))
    // ref
    const extRef = useRef(null)
    const videoRef = useRef(null)
    const controllerRef = useRef(null)
    
    // effect
    // useEffect(()=>{toggleFullScreen()},[FScr])

    // functions
    const handlePlayPause = () =>{
      setPlaying(!playing)
    }
    const toggleFullScreen = ()=>{
      if(!search)
      {
        if(FScr){
          screenfull.toggle(extRef.current)
          setFScr(!FScr)
        }else{
          screenfull.toggle(extRef.current) 
        console.log("full screen")
          setFScr(!FScr)
        }
      }
    }

    const toggleHover = () => {
      setControllerClass("controllers visible");
      setTimeout(()=>setControllerClass("controllers"), 6000);
    }

    const handleFastForward = ()  => {
      // handle fastforward
      videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10)
      
    }
    
    const handleRewind = () =>  {
      // handle backward
      videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10)

    }

    // full screen
    useKey("KeyF", toggleFullScreen)
    // pause and play
    useKey("Space", handlePlayPause)
    // fast forward
    useKey("ArrowRight", handleFastForward)
    // rewind
    useKey("ArrowLeft", handleRewind)
    // mute and  unmute
    useKey("KeyM", ()=>{setMute(!mute)})
    // search
    useKey("KeyS", ()=>{if(screenfull.isFullscreen){toggleFullScreen()}})

  return (
    <div className="player-container" ref={extRef} onMouseMove={toggleHover}>
         <ReactPlayer 
          ref={videoRef}
          onStart={console.log("Opening your cahnnel, enjoy!!!")}
          onReady={console.log("playing your video")}
          onBuffer={()=>console.log("loading your video")}
          
          className="player" 
          url={window.location.pathname.replace('/watch/','')} 
          playing={playing} 
          width='100%' 
          height="100vh" 
          volume={mute?0:1}
          mute={mute}
         />
         <div className={controllerClass} ref={controllerRef}>
           <div className="top"><div className="live-icon" title="Sreaming Live Channel"><GoPrimitiveDot className="dot" /> Live</div></div>
           <div className="center" >
             <div className="left-center" onDoubleClick={handleRewind} >
                <FaBackward onClick={handleRewind} />
              </div>
             <div className="center-center" onClick={handlePlayPause} title="Press (Spacebar) to Play/Pause">
             {playing? <AiFillPauseCircle className="playbtn" />: <AiFillPlayCircle className="playbtn" />}
            </div>
             <div className="right-center" onDoubleClick={handleFastForward}>
               <FaForward onClick={handleFastForward}/>
              </div>
            </div>
           <div className="bottom"> 
           <div  onClick={handlePlayPause} title="Press (Spacebar) to Play/Pause">{playing? <AiFillPauseCircle className="playbtn-mini" />: <AiFillPlayCircle className="playbtn-mini" />}</div>
             <div className="mute" onClick={()=>{setMute(!mute)}}  title="Press (M) to Unmute/mute">
               {!mute?<GoUnmute className="mute-btn"/>:<GoMute className="mute-btn"/>}
              </div>
              <div  title="Press (F) to Toggle Screen Size" onClick={toggleFullScreen}>{FScr?<RiFullscreenFill className="full-srn"/>:<RiFullscreenExitFill className="full-srn"/>}</div>
            </div>
           
          </div>
    </div>
  );

}



export default Watch;
