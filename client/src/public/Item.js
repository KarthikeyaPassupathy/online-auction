import React from "react";
import "../styles/Item.css";
import { Link } from "react-router-dom";

function Item(props) {
  async function setBidder() {
    const response = await fetch("/api/setBidder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: props.id,
        dBid: props.price,
      }),
    });
    console.log(response.json());
  }

  return (
    <Link to={`/itempage/${props.id}`} onClick={setBidder}>
      <div className="Icontainer">
        <div className="name">{props.name}</div>
        <div className="desc">{props.desc}</div>
        <div className="price">₹ {props.price}</div>
      </div>
    </Link>
  );
}

export default Item;
