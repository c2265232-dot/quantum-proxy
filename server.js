const express = require("express");
const fetch = require("node-fetch");

const app = express();

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Proxy is running");
});

/* PROXY ROUTE */
app.get("/proxy", async (req, res) => {
  let url = req.query.url;

  if (!url) {
    return res.send("No URL provided");
  }

  try {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const response = await fetch(url);
    const text = await response.text();

    res.send(text);
  } catch (err) {
    res.send("Error loading site");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
