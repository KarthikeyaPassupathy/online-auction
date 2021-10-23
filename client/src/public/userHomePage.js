import React, { useState, useEffect } from "react";
import Item from "./Item";
import "../styles/UserHomePage.css";

function UserHomePage() {
  const [items, setItems] = useState([]);

  async function getItems() {
    console.log("Get items called");
    const response = await fetch("/api/getItems");
    const data = await response.json();
    console.log(data);
    if (data.status === "ok") {
      setItems(data.items);
    } else {
      console.log("Error");
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="uhp">
      <h1>VANGO VANGO VANGURATHUKU VANGO</h1>
      <div className="list">
        {items.map((item) => {
          return (
            <Item
              className="Item"
              key={item._id}
              id={item._id}
              name={item.itemName}
              desc={item.description}
              price={item.startPrice}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserHomePage;
