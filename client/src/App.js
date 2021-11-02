import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import AddItem from "./public/AddItem";
import UserHomePage from "./public/userHomePage";
import ItemPage from "./public/ItemPage";
import PrivateRoute from "./public/PrivateRoute";
import IsLoggedinRoute from "./public/IsLoggedinRoute";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/additem" exact component={AddItem} />
        <IsLoggedinRoute path="/userhomepage" exact component={UserHomePage} />
        <IsLoggedinRoute path="/ItemPage/:id" exact component={ItemPage} />
      </BrowserRouter>
    </div>
  );
}
