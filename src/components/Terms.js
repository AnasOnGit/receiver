// import {useState,useEffect} from "react"
import React from "react"
import { Link } from "react-router-dom";

function Terms({term,icon,src,setSearch}) {
  return (
    <Link className='result' to={`/watch/${src}`} onClick={()=>{setSearch(false)}}>
        <div className="result-bar">
            {icon === undefined ||icon === "" || icon === null ? <img src="https://img.icons8.com/cute-clipart/64/000000/no-image.png" alt="icon"/> : <img src={icon} alt="icon" />}
            <span>{term}</span>
        </div>
    </Link>
  );
}


export default Terms;
