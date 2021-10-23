import React from "react";
import "../styles/Bidder.css";

function Bidder(props) {
  return (
    <div className="Bcontainer">
      <div className="user">{props.user}</div>
      <div className="bidValue">{props.bidValue}</div>
    </div>
  );
}

export default Bidder;
