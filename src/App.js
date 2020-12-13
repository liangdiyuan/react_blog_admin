import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={Main} />
      <Route path="/login" exact component={Login} />
      {/* <Redirect from="/" to="/index" /> */}
    </Router>
  );
}

export default App;
