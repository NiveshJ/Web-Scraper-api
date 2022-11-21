const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const PORT = 5000;

const url = "https://www.amazon.in/dp/B0BCP3X81V/";

const app = express();

const apiCall = async (url) => {
  const response = await axios(url);
  const html = response.data;
  const $ = cheerio.load(html);
  $("#productTitle", html).each(function () {
    const title = $(this).text();
    console.log(title);
  });

  // $(".a-price-whole", html).each(function () {
  //   const price = $(this).text();
  //   console.log(price);
  // });

  // $(".a-list-item", html).each(function () {
  //   const list = $(this).text();
  //   console.log(list);
  // });
};

apiCall(url);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
