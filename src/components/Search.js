import React,{useState,useEffect} from "react"
import axios from "axios"
import Terms from "./Terms"

// helper
import parser from "iptv-playlist-parser";
import _ from 'lodash';
import Channels from "./Channels";

function Search({setSearch,search,channelName,channelIcon,src}) {
  // states
const [channels,setChannels] = useState({});
const [searchTerm,setSerachTerm] = useState("")
const [results,setResults] = useState([]);
const [resultClassName,setResultClassName] = useState("results-section")

// svg
let svgBackupIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.002 4h-10a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1zm-10-1a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-10z" clip-rule="evenodd"></path><path d="M10.648 8.646a.5.5 0 01.577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"></path><path fill-rule="evenodd" d="M4.502 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10a1 1 0 011 1v8a1 1 0 01-1 1v1a2 2 0 002-2V3a2 2 0 00-2-2H4a2 2 0 00-2 2h1a1 1 0 011-1z" clip-rule="evenodd"></path></svg>`

let channelLinksArray = ["https://iptv-org.github.io/iptv/categories/auto.m3u","https://iptv-org.github.io/iptv/categories/business.m3u","https://iptv-org.github.io/iptv/categories/comedy.m3u","https://iptv-org.github.io/iptv/categories/documentary.m3u","https://iptv-org.github.io/iptv/categories/education.m3u","https://iptv-org.github.io/iptv/categories/entertainment.m3u","https://iptv-org.github.io/iptv/categories/family.m3u","https://iptv-org.github.io/iptv/categories/fashion.m3u","https://iptv-org.github.io/iptv/categories/food.m3u","https://iptv-org.github.io/iptv/categories/general.m3u","https://iptv-org.github.io/iptv/categories/health.m3u","https://iptv-org.github.io/iptv/categories/history.m3u","https://iptv-org.github.io/iptv/categories/hobby.m3u","https://iptv-org.github.io/iptv/categories/kids.m3u","https://iptv-org.github.io/iptv/categories/legislative.m3u","https://iptv-org.github.io/iptv/categories/lifestyle.m3u","https://iptv-org.github.io/iptv/categories/local.m3u","https://iptv-org.github.io/iptv/categories/movies.m3u","https://iptv-org.github.io/iptv/categories/music.m3u","https://iptv-org.github.io/iptv/categories/news.m3u","https://iptv-org.github.io/iptv/categories/religious.m3u","https://iptv-org.github.io/iptv/categories/shop.m3u","https://iptv-org.github.io/iptv/categories/sport.m3u","https://iptv-org.github.io/iptv/categories/travel.m3u","https://iptv-org.github.io/iptv/categories/weather.m3u","https://iptv-org.github.io/iptv/categories/xxx.m3u","https://iptv-org.github.io/iptv/categories/other.m3u","https://iptv-org.github.io/iptv/languages/aka.m3u","https://iptv-org.github.io/iptv/languages/sqi.m3u","https://iptv-org.github.io/iptv/languages/amh.m3u","https://iptv-org.github.io/iptv/languages/ara.m3u","https://iptv-org.github.io/iptv/languages/hye.m3u","https://iptv-org.github.io/iptv/languages/aze.m3u","https://iptv-org.github.io/iptv/languages/ben.m3u","https://iptv-org.github.io/iptv/languages/bos.m3u","https://iptv-org.github.io/iptv/languages/bul.m3u","https://iptv-org.github.io/iptv/languages/mya.m3u","https://iptv-org.github.io/iptv/languages/cat.m3u","https://iptv-org.github.io/iptv/languages/zho.m3u","https://iptv-org.github.io/iptv/languages/hrv.m3u","https://iptv-org.github.io/iptv/languages/ces.m3u","https://iptv-org.github.io/iptv/languages/dan.m3u","https://iptv-org.github.io/iptv/languages/nld.m3u","https://iptv-org.github.io/iptv/languages/eng.m3u","https://iptv-org.github.io/iptv/languages/est.m3u","https://iptv-org.github.io/iptv/languages/fao.m3u","https://iptv-org.github.io/iptv/languages/fin.m3u","https://iptv-org.github.io/iptv/languages/fra.m3u","https://iptv-org.github.io/iptv/languages/glg.m3u","https://iptv-org.github.io/iptv/languages/kat.m3u","https://iptv-org.github.io/iptv/languages/deu.m3u","https://iptv-org.github.io/iptv/languages/heb.m3u","https://iptv-org.github.io/iptv/languages/hin.m3u","https://iptv-org.github.io/iptv/languages/hun.m3u","https://iptv-org.github.io/iptv/languages/isl.m3u","https://iptv-org.github.io/iptv/languages/ind.m3u","https://iptv-org.github.io/iptv/languages/ita.m3u","https://iptv-org.github.io/iptv/languages/jpn.m3u","https://iptv-org.github.io/iptv/languages/jav.m3u","https://iptv-org.github.io/iptv/languages/kaz.m3u","https://iptv-org.github.io/iptv/languages/khm.m3u","https://iptv-org.github.io/iptv/languages/kin.m3u","https://iptv-org.github.io/iptv/languages/kor.m3u","https://iptv-org.github.io/iptv/languages/kur.m3u","https://iptv-org.github.io/iptv/languages/lao.m3u","https://iptv-org.github.io/iptv/languages/lav.m3u","https://iptv-org.github.io/iptv/languages/ltz.m3u","https://iptv-org.github.io/iptv/languages/mkd.m3u","https://iptv-org.github.io/iptv/languages/cmn.m3u","https://iptv-org.github.io/iptv/languages/nan.m3u","https://iptv-org.github.io/iptv/languages/mon.m3u","https://iptv-org.github.io/iptv/languages/nob.m3u","https://iptv-org.github.io/iptv/languages/fas.m3u","https://iptv-org.github.io/iptv/languages/pol.m3u","https://iptv-org.github.io/iptv/languages/por.m3u","https://iptv-org.github.io/iptv/languages/pus.m3u","https://iptv-org.github.io/iptv/languages/ron.m3u","https://iptv-org.github.io/iptv/languages/rus.m3u","https://iptv-org.github.io/iptv/languages/srp.m3u","https://iptv-org.github.io/iptv/languages/sin.m3u","https://iptv-org.github.io/iptv/languages/slk.m3u","https://iptv-org.github.io/iptv/languages/som.m3u","https://iptv-org.github.io/iptv/languages/spa.m3u","https://iptv-org.github.io/iptv/languages/swe.m3u","https://iptv-org.github.io/iptv/languages/tgl.m3u","https://iptv-org.github.io/iptv/languages/tam.m3u","https://iptv-org.github.io/iptv/languages/tha.m3u","https://iptv-org.github.io/iptv/languages/tur.m3u","https://iptv-org.github.io/iptv/languages/tuk.m3u","https://iptv-org.github.io/iptv/languages/ukr.m3u","https://iptv-org.github.io/iptv/languages/urd.m3u","https://iptv-org.github.io/iptv/languages/vie.m3u","https://iptv-org.github.io/iptv/languages/yue.m3u","https://iptv-org.github.io/iptv/languages/undefined.m3u","https://iptv-org.github.io/iptv/countries/af.m3u","https://iptv-org.github.io/iptv/countries/al.m3u","https://iptv-org.github.io/iptv/countries/dz.m3u","https://iptv-org.github.io/iptv/countries/ad.m3u","https://iptv-org.github.io/iptv/countries/ao.m3u","https://iptv-org.github.io/iptv/countries/ar.m3u","https://iptv-org.github.io/iptv/countries/am.m3u","https://iptv-org.github.io/iptv/countries/aw.m3u","https://iptv-org.github.io/iptv/countries/au.m3u","http://i.mjh.nz/nzau/epg.xml.gz","https://iptv-org.github.io/iptv/countries/at.m3u","http://epg.streamstv.me/epg/guide-austria.xml.gz","https://iptv-org.github.io/iptv/countries/az.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/bh.m3u","https://iptv-org.github.io/iptv/countries/bd.m3u","https://iptv-org.github.io/iptv/countries/bb.m3u","https://iptv-org.github.io/iptv/countries/by.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/be.m3u","https://iptv-org.github.io/iptv/countries/bo.m3u","https://iptv-org.github.io/iptv/countries/ba.m3u","http://epg.streamstv.me/epg/guide-exyu.xml.gz","https://iptv-org.github.io/iptv/countries/br.m3u","https://iptv-org.github.io/iptv/countries/bn.m3u","https://iptv-org.github.io/iptv/countries/bg.m3u","https://iptv-org.github.io/iptv/countries/bf.m3u","https://iptv-org.github.io/iptv/countries/kh.m3u","https://iptv-org.github.io/iptv/countries/cm.m3u","https://iptv-org.github.io/iptv/countries/ca.m3u","http://epg.streamstv.me/epg/guide-canada.xml.gz","https://iptv-org.github.io/iptv/countries/cl.m3u","https://iptv-org.github.io/iptv/countries/cn.m3u","http://epg.51zmt.top:8000/e.xml.gz","https://iptv-org.github.io/iptv/countries/co.m3u","https://iptv-org.github.io/iptv/countries/cr.m3u","https://iptv-org.github.io/iptv/countries/hr.m3u","http://tvprofil.net/xmltv/data/epg_tvprofil.net.xml","https://iptv-org.github.io/iptv/countries/cw.m3u","https://iptv-org.github.io/iptv/countries/cy.m3u","https://iptv-org.github.io/iptv/countries/cz.m3u","http://epg.streamstv.me/epg/guide-cz.xml.gz","https://iptv-org.github.io/iptv/countries/cd.m3u","https://iptv-org.github.io/iptv/countries/dk.m3u","https://iptv-org.github.io/iptv/countries/do.m3u","https://iptv-org.github.io/iptv/countries/ec.m3u","https://iptv-org.github.io/iptv/countries/eg.m3u","https://iptv-org.github.io/iptv/countries/sv.m3u","https://iptv-org.github.io/iptv/countries/gq.m3u","https://iptv-org.github.io/iptv/countries/ee.m3u","https://iptv-org.github.io/iptv/countries/et.m3u","https://iptv-org.github.io/iptv/countries/fo.m3u","https://iptv-org.github.io/iptv/countries/fi.m3u","https://iptv-org.github.io/iptv/countries/fj.m3u","https://iptv-org.github.io/iptv/countries/fr.m3u","https://iptv-org.github.io/iptv/countries/gm.m3u","https://iptv-org.github.io/iptv/countries/ge.m3u","https://iptv-org.github.io/iptv/countries/de.m3u","https://iptv-org.github.io/iptv/countries/gh.m3u","https://iptv-org.github.io/iptv/countries/gr.m3u","https://iptv-org.github.io/iptv/countries/gp.m3u","https://iptv-org.github.io/iptv/countries/gy.m3u","https://iptv-org.github.io/iptv/countries/ht.m3u","https://iptv-org.github.io/iptv/countries/hn.m3u","https://iptv-org.github.io/iptv/countries/hk.m3u","https://iptv-org.github.io/iptv/countries/hu.m3u","http://epg.streamstv.me/epg/guide-hungry.xml.gz","https://iptv-org.github.io/iptv/countries/is.m3u","https://iptv-org.github.io/iptv/countries/in.m3u","http://epg.streamstv.me/epg/guide-india.xml.gz","https://iptv-org.github.io/iptv/countries/id.m3u","https://iptv-org.github.io/iptv/countries/int.m3u","https://iptv-org.github.io/iptv/countries/ir.m3u","https://iptv-org.github.io/iptv/countries/iq.m3u","https://iptv-org.github.io/iptv/countries/ie.m3u","https://iptv-org.github.io/iptv/countries/il.m3u","http://epg.streamstv.me/epg/guide-israel.xml.gz","https://iptv-org.github.io/iptv/countries/it.m3u","https://iptv-org.github.io/iptv/countries/ci.m3u","https://iptv-org.github.io/iptv/countries/jm.m3u","https://iptv-org.github.io/iptv/countries/jp.m3u","https://iptv-org.github.io/iptv/countries/jo.m3u","https://iptv-org.github.io/iptv/countries/kz.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/ke.m3u","https://iptv-org.github.io/iptv/countries/xk.m3u","https://iptv-org.github.io/iptv/countries/kw.m3u","https://iptv-org.github.io/iptv/countries/kg.m3u","https://iptv-org.github.io/iptv/countries/la.m3u","https://iptv-org.github.io/iptv/countries/lv.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/lb.m3u","https://iptv-org.github.io/iptv/countries/ly.m3u","https://iptv-org.github.io/iptv/countries/li.m3u","https://iptv-org.github.io/iptv/countries/lt.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/lu.m3u","https://iptv-org.github.io/iptv/countries/mo.m3u","https://iptv-org.github.io/iptv/countries/my.m3u","https://freeview.github.io/iptv/epg/tv.xml","https://iptv-org.github.io/iptv/countries/mt.m3u","http://epg.streamstv.me/epg/guide-malta.xml.gz","https://iptv-org.github.io/iptv/countries/mx.m3u","https://iptv-org.github.io/iptv/countries/md.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/mn.m3u","https://iptv-org.github.io/iptv/countries/me.m3u","https://iptv-org.github.io/iptv/countries/ma.m3u","https://iptv-org.github.io/iptv/countries/mz.m3u","https://iptv-org.github.io/iptv/countries/mm.m3u","https://iptv-org.github.io/iptv/countries/np.m3u","https://iptv-org.github.io/iptv/countries/nl.m3u","https://iptv-org.github.io/iptv/countries/nz.m3u","http://i.mjh.nz/nzau/epg.xml.gz","https://iptv-org.github.io/iptv/countries/ni.m3u","https://iptv-org.github.io/iptv/countries/ng.m3u","https://iptv-org.github.io/iptv/countries/kp.m3u","https://iptv-org.github.io/iptv/countries/mk.m3u","https://iptv-org.github.io/iptv/countries/no.m3u","http://epg.streamstv.me/epg/guide-norway.xml.gz","https://iptv-org.github.io/iptv/countries/om.m3u","https://iptv-org.github.io/iptv/countries/pk.m3u","https://iptv-org.github.io/iptv/countries/ps.m3u","https://iptv-org.github.io/iptv/countries/pa.m3u","https://iptv-org.github.io/iptv/countries/py.m3u","https://iptv-org.github.io/iptv/countries/pe.m3u","https://iptv-org.github.io/iptv/countries/ph.m3u","https://iptv-org.github.io/iptv/countries/pl.m3u","https://iptv-org.github.io/iptv/countries/pt.m3u","https://iptv-org.github.io/iptv/countries/pr.m3u","https://iptv-org.github.io/iptv/countries/qa.m3u","https://iptv-org.github.io/iptv/countries/ro.m3u","https://iptv-org.github.io/iptv/countries/ru.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/rw.m3u","https://iptv-org.github.io/iptv/countries/kn.m3u","https://iptv-org.github.io/iptv/countries/sm.m3u","https://iptv-org.github.io/iptv/countries/sa.m3u","https://iptv-org.github.io/iptv/countries/sn.m3u","https://iptv-org.github.io/iptv/countries/rs.m3u","http://epg.streamstv.me/epg/guide-exyu.xml.gz","https://iptv-org.github.io/iptv/countries/sl.m3u","https://iptv-org.github.io/iptv/countries/sg.m3u","https://freeview.github.io/iptv/epg/tv.xml","https://iptv-org.github.io/iptv/countries/sk.m3u","https://iptv-org.github.io/iptv/countries/si.m3u","https://iptv-org.github.io/iptv/countries/so.m3u","https://iptv-org.github.io/iptv/countries/za.m3u","http://i.mjh.nz/za/DStv/epg.xml.gz","https://iptv-org.github.io/iptv/countries/kr.m3u","https://iptv-org.github.io/iptv/countries/es.m3u","https://iptv-org.github.io/iptv/countries/lk.m3u","https://iptv-org.github.io/iptv/countries/sd.m3u","https://iptv-org.github.io/iptv/countries/se.m3u","https://iptv-org.github.io/iptv/countries/ch.m3u","https://iptv-org.github.io/iptv/countries/sy.m3u","https://iptv-org.github.io/iptv/countries/tw.m3u","https://iptv-org.github.io/iptv/countries/tj.m3u","https://iptv-org.github.io/iptv/countries/tz.m3u","https://iptv-org.github.io/iptv/countries/th.m3u","https://iptv-org.github.io/iptv/countries/tt.m3u","https://iptv-org.github.io/iptv/countries/tn.m3u","https://iptv-org.github.io/iptv/countries/tr.m3u","https://iptv-org.github.io/iptv/countries/tm.m3u","https://iptv-org.github.io/iptv/countries/ug.m3u","https://iptv-org.github.io/iptv/countries/ua.m3u","https://iptvx.one/epg/epg.xml.gz","https://iptv-org.github.io/iptv/countries/ae.m3u","https://iptv-org.github.io/iptv/countries/uk.m3u","https://iptv-org.github.io/iptv/countries/us.m3u","http://epg.streamstv.me/epg/guide-usa.xml.gz","https://iptv-org.github.io/iptv/countries/uy.m3u","https://iptv-org.github.io/iptv/countries/ve.m3u","https://iptv-org.github.io/iptv/countries/vn.m3u","https://iptv-org.github.io/iptv/countries/vi.m3u","https://iptv-org.github.io/iptv/countries/eh.m3u","https://iptv-org.github.io/iptv/countries/ye.m3u"]
    // effect
    useEffect(() => {
       
        // if(!channels){
          axios
          .get("https://iptv-org.github.io/iptv/channels.json")
          .then(function (response) {
            // handle success
            // enter channel to
            // processChannel();
            // get all 5000 channels
            setChannels(response.data)
            // setChannels(Object.assign(response.data,channels))
            // console.log(channels.length, 1)
            // const result = parser.parse(response.data);
    
            // console.log(result.items);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        // }
      }, []);
    //   functions
    const processChannel = async() =>{
      // console.log(channelLinksArray.length)
      for(let i = 0; i < channelLinksArray.length; i++){
        await parseLink(channelLinksArray[i])
      }
    }
    // getting channel list from links and enter it to tj\he state
    const parseLink = (link) => {
      axios
      .get(link)
      .then(function (response) {
        const result = parser.parse(response.data);
        // console.log(result.items)
      //  setChannels( _.merge(result.items,channels));
      //  setChannels(Object.assign(result.items,channels));
        console.log(channels.length)
        // setChannels({...channels,...result.items});
        // console.log(channels.lenght, `Lenght on try`)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }



    const searchChannel = (e)=>{
        setSerachTerm(e.target.value)
      if(searchTerm === "" || null || undefined){

      }else{
        // console.log(searchTerm)
        let foundTerm =  channels.filter(channel=>{
          let regex = new RegExp(`^${searchTerm}`,'gi')
          return channel.name.match(regex); 
          //|| channel.category.match(regex) || channel.language[0].name.match(regex) || channel.country[0].name.match(regex) 
      })
      setResults(foundTerm)
      console.log(foundTerm)

    }
  }
    
    const toggleResultClass = () =>{
        if(resultClassName === "results-section"){
            setResultClassName( "results-section no-scroll")
        }
        else{
            setResultClassName( "results-section")
        }
    }
  return (
    <div className='search' onDoubleClick={()=>setSearch(false)}>
        <div className="search-bar">
            <input type="text" className="search-input" value={searchTerm} placeholder="Search" autoFocus name="channel" onChange={searchChannel} autoComplete="off"/>
            {channels.length}
        </div>
        {searchTerm === "" ? "" :
         <div className={resultClassName}>
             {/* {results.length === 0 && searchTerm !== ""?toggleResultClass():toggleResultClass()} */}
            {results.length === 0 && searchTerm !== "" ? <Terms term="No result found!" key="error" /> : results.map((result,index)=>(<Terms term={result.name} icon={result.logo || result.tvg.logo }src={result.url} key={index} setSearch={setSearch} />))}
            {/* {setSearch(searchAgent)} */}
        </div>
        }
       
            
    </div>
  );
}


export default Search;
