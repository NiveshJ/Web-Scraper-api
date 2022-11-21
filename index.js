const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const PORT = 5000;

const url = 'https://www.amazon.in/OnePlus-Prime-128GB-Storage-SuperVOOC/dp/B0BCP3X81V/ref=lp_1389401031_1_11';

const app = express();

const apiCall = async(url) => {
    const response = await axios(url)
    const html = response.data;
    const $ = cheerio.load(html);
    $("#productTitle", html).each(function() {
        const title = $(this).text();
        console.log(title);
    })
}

apiCall(url);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));