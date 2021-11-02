const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/item.model");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://karthi:karthi%40mongoo@cluster0.26xez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("public"));

app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.json({ status: "error", error: "invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  console.log(isPasswordValid);

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token, role: user.role });
  } else {
    return res.json({ status: "ok", user: false });
  }
});

app.post("/api/addItem", async (req, res) => {
  try {
    const item = await Item.create({
      itemName: req.body.itemName,
      description: req.body.description,
      startPrice: req.body.startPrice,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    res.json({ status: "ok", item });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", err });
  }
});

app.get("/api/getItems", async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ status: "ok", items });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

app.post("/api/getItemDetail", async (req, res) => {
  const item = await Item.findOne({
    _id: req.body.id,
  });
  console.log(item);
  res.json({ status: "ok", item });
});

app.post("/api/setBidder", async (req, res) => {
  const decoded = jwt.verify(req.headers["x-access-token"], "secret123");
  console.log(decoded);
  const email = decoded.email;
  const item = await Item.findOne({
    _id: req.body.id,
  });

  const bidders = item.bidders;

  const found = bidders.find((bidder) => {
    if (bidder.user === email) {
      return true;
    }
  });

  if (!found) {
    await Item.updateOne(
      { _id: req.body.id },
      {
        $push: {
          bidders: {
            $each: [{ user: email, bidValue: "0" }],
            $sort: { bidValue: -1 },
          },
        },
      }
    );
    res.json({ status: "ok" });
  } else {
    res.json({ status: "error", error: "Already a bidder" });
  }
});

app.post("/api/updateBid", async (req, res) => {
  const decoded = jwt.verify(req.headers["x-access-token"], "secret123");
  const email = decoded.email;

  const item = await Item.updateOne(
    {
      _id: req.body.ItemId,
      "bidders.user": email,
    },
    {
      $set: { "bidders.$.bidValue": Number(req.body.BidValue) },
      $sort: { bidValue: -1 },
    }
  );
  res.json({ status: "ok" });
});

app.post("/api/getWinner", async (req, res) => {
  const decoded = jwt.verify(req.headers["x-access-token"], "secret123");
  const item = await Item.findOne({
    _id: req.body.id,
  });
  const heighestBid = await Math.max.apply(
    Math,
    item.bidders.map((bidder) => Number(bidder.bidValue))
  );

  let winner;
  if (heighestBid > 0) {
    item.bidders.forEach((bidder) => {
      if (bidder.bidValue == heighestBid) {
        winner = bidder.user;
      }
    });
  } else {
    winner = "No one parcipated in the auction";
    res.json(winner);
  }

  if (decoded.email === winner) {
    res.json({ status: "U r the winner" });
  } else {
    res.json({ status: `${winner} is the winner` });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "get" });
});

const port = process.env.PORT || 1337;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../client/build"));
// }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server started" + port);
});
