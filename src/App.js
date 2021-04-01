import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { history } from "./helper/history";
import Home from "./components/Home";
import Watch from "./components/Watch";
import Search from "./components/Search";

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

function App() {
  // states
  const [search, setSearch] = useState(false);
  const [toHome, setToHome] = useState(false);
  // define

  // effects

  // functions
  function handleSearch() {
    setSearch(true);
    if (search === false) {
      setSearch(true);
      console.log("Searching....");
    }
    console.log(search);
  }

  function handleHome() {
    if (search === false) {
      console.log("Home");
    } else {
      console.log("Can't goto Homepage, While search-bar is open!!!");
    }
  }

  // function handleEscape() {
  //   console.log("Closing Everything....");
  //   setSearch(false);
  // }

  // Search
  useKey("KeyS", handleSearch);
  // Home
  useKey("KeyH", handleHome);

  // useKey("Escape", handleEscape);

  return (
    <Router>
      <div className="App">
        {search ? <Search setSearch={setSearch} search={search} /> : ""}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/watch/:src">
            <Watch search={search} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
