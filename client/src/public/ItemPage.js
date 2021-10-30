import React, { useEffect, useState } from "react";
import "../styles/ItemPage.css";
import Bidder from "./Bidder";
import Countdown from "./CountdownTimer";

function ItemPage(props) {
  const [Item, setItem] = useState({});
  const [Bidders, setBidders] = useState([]); //list of bidders
  const [BidValue, setBidValue] = useState(); //BidValue of the loggedin user
  const [PopUp, setPopUp] = useState(false);
  const [HeighestBid, setHeighestBid] = useState();
  const [startT, setstartT] = useState(" ");
  const [endT, setendT] = useState(" ");
  const [initialRender, setinitialRender] = useState(true);
  const [winner, setwinner] = useState();

  function togglePopUp() {
    if (
      Date.parse(startT) < Date.parse(new Date()) &&
      Date.parse(new Date()) < Date.parse(endT)
    ) {
      setPopUp(!PopUp);
    } else if (Date.parse(new Date()) > Date.parse(endT)) {
      alert("Auction is over");
    } else {
      alert("Please wait till the countdown starts");
    }
  }
  //updating the bid of an individual bidder(user)
  async function updateBid(e) {
    e.preventDefault();
    console.log(e.target.bidvalue.value);
    setBidValue(e.target.bidvalue.value);
  }

  //Getting item information and the enlisted bidders from server
  async function getItem() {
    const response = await fetch("/api/getItemDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.match.params.id,
      }),
    });
    const data = await response.json();
    console.log(data);
    setItem(data.item);
    setBidders(data.item.bidders);
    setstartT(new Date(data.item.startTime));
    setendT(new Date(data.item.endTime));
    setHeighestBid(
      Math.max.apply(
        Math,
        data.item.bidders.map((bidder) => Number(bidder.bidValue))
      )
    );
  }

  useEffect(() => {
    getItem();
  }, []);

  // let initialRender = true;

  useEffect(async () => {
    if (initialRender) {
      setinitialRender(false);
    } else {
      console.log(BidValue, HeighestBid);
      if (BidValue > HeighestBid) {
        const response = await fetch("/api/updateBid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ItemId: Item._id,
            BidValue,
          }),
        });
        console.log(response.json());
        // history.push("/")
        window.location.reload(false);
      } else {
        alert("Invalid Bid, needs to heigher than the highest bid");
      }
    }
  }, [BidValue]);

  async function getWinner() {
    const response = await fetch("/api/getWinner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: Item._id,
      }),
    });
    const data = await response.json();
    setwinner(data.status);
  }

  return (
    <div className="itempage">
      <h1>VANGO VANGO VANGURATHUKU VANGO</h1>
      <span>{Item.itemName}</span>
      <br />
      <span>{Item.description}</span>
      <br />
      <span className="start-price">Starting price: ₹ {Item.startPrice}</span>
      <br />
      <span>
        {startT.toString().replace("GMT+0530 (India Standard Time)", "")}
      </span>
      <br />
      <span>
        {endT.toString().replace("GMT+0530 (India Standard Time)", "")}
      </span>
      <br />
      <div className="winner">{winner ? winner : ""}</div>
      <Countdown startT={startT} endT={endT} getWinner={getWinner} />
      <button className="bid-button" onClick={togglePopUp}>
        BID
      </button>
      <br />

      <div className="bidders-list">
        {Bidders.map((bidder) => {
          return (
            <Bidder
              key={bidder._id}
              user={bidder.user}
              bidValue={bidder.bidValue}
            />
          );
        })}
      </div>
      {PopUp ? (
        <div className="popup">
          <form className="popup_inner" onSubmit={updateBid}>
            <input
              type="text"
              name="bidvalue"
              placeholder="Enter Bid value"
              className="bid-input"
            ></input>
            <div className="popup-btns">
              <input className="popup-submit" type="Submit" />
              <input
                className="popup-close"
                onClick={togglePopUp}
                type="button"
                value="close"
              />
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default ItemPage;
