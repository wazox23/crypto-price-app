import React from "react";
import {
  HashRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./views/Home";
import Show from "./views/Show";
import "./App.scss";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/:coinId" element={<Show />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
