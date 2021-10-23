import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import AddItem from "./public/AddItem";
import UserHomePage from "./public/userHomePage";
import ItemPage from "./public/ItemPage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/additem" exact component={AddItem} />
        <Route path="/userhomepage" exact component={UserHomePage} />
        <Route path="/ItemPage/:id" exact component={ItemPage} />
      </BrowserRouter>
    </div>
  );
}
