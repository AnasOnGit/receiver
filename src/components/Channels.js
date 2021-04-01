import React,{useEffect,useState} from "react"
import Channel from "./Channel"
import axios from "axios"
import parser from "iptv-playlist-parser";

function Channels({category}) {
  const [allChannels, setAllChannels] = useState({});
  // effect
  useEffect(() => {
    console.log("working")
    axios
      .get(category)
      .then(function (response) {
        return parser.parse(response.data);
        // return response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function (data) {
        // always executed
        setAllChannels(data.items)
      });
  }, []);
    return (
      <div className="channels">
            {/* <Channel channelName="Anas" channelIcon='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Cartoon_Network_1992_logo.svg/682px-Cartoon_Network_1992_logo.svg.png' src='http://d1hya96e2cm7qi.cloudfront.net/Live/_definst_/sweetbcha1novD28_W_250.sdp/playlist.m3u8' />
            <Channel channelName="Ary Digital" channelIcon='https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/ARY_Digital_Logo_2.png/150px-ARY_Digital_Logo_2.png' src='http://95.211.211.168/live/aryfamily0071/playlist.m3u8' />
            <Channel channelName="CNN" channelIcon='https://i.imgur.com/OifwcrE.png' src='https://92news.vdn.dstreamone.net/92newshd/92hd/playlist.m3u8' />
            <Channel channelName="Spacetoon" channelIcon='http://i.imgur.com/x33MwPN.png' src='http://158.69.124.9:1935/5aabtv/5aabtv/playlist.m3u8' /> */}
            {Object.keys(allChannels).length === 0 ?"":allChannels.map((channel,index)=>(<Channel channelName={channel.name} channelIcon={Channel.logo || channel.tvg.logo || "https://img.icons8.com/dotty/80/ffffff/gps-disconnected.png"} src={channel.url} key={index}/>))}
      </div>
    );
  }
  
  export default Channels;
  