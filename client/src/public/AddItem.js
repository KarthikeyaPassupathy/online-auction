import React, { useState, useEffect } from "react";
import Item from "./Item";
import "../styles/Additem.css";

function AddItem() {
  const [itemName, setItemName] = useState();
  const [description, setDescription] = useState();
  const [startPrice, setStartPrice] = useState();
  const [SDate, setSDate] = useState();
  const [STime, setSTime] = useState();
  const [EDate, setEDate] = useState();
  const [ETime, setETime] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    console.log("Get items called");
    const response = await fetch("/api/getItems");
    const data = await response.json();
    if (data.status === "ok") {
      setItems(data.items);
    } else {
      console.log("Error");
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();
    if (
      itemName &&
      description &&
      startPrice &&
      SDate &&
      STime &&
      EDate &&
      ETime
    ) {
      const st = SDate.split("-").join("-") + "T" + STime + ":00.000Z";
      const et = EDate.split("-").join("-") + "T" + ETime + ":00.000Z";
      const startTime = new Date(st);
      const endTime = new Date(et);
      startTime.setMinutes(startTime.getMinutes() - 330);
      endTime.setMinutes(endTime.getMinutes() - 330);
      console.log(startTime, endTime);
      const response = await fetch("/api/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName,
          description,
          startPrice,
          startTime,
          endTime,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        console.log("Item added successfully");
        getItems();
      } else {
        console.log("Item adding failed");
      }
    } else {
      alert("Fileds cannot be empty");
    }
  }

  return (
    <div className="aip">
      <h1>VANGO VANGO VANGURATHUKU VANGO</h1>
      <h2>Enter the details of the item to be added</h2>
      <form onSubmit={handelSubmit}>
        <span>Item name</span>
        <input
          type="text"
          name="item-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br />
        <span>Item description</span>
        <textarea
          className="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <span>Starting Price</span>
        <input
          type="text"
          name="start-price"
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
        />
        <br />
        <div>
          <span>Start Time</span>
          <input type="date" onChange={(e) => setSDate(e.target.value)} />
          <input type="time" onChange={(e) => setSTime(e.target.value)} />
        </div>
        <div>
          <span>End Time</span>
          <input type="date" onChange={(e) => setEDate(e.target.value)} />
          <input type="time" onChange={(e) => setETime(e.target.value)} />
        </div>
        <input className="submit-button" type="submit" value="Add Item" />
      </form>
      <br />
      <br />
      <div className="list">
        {items.map((item) => {
          return (
            <Item
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

export default AddItem;
