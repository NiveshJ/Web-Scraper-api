import axios from "axios";
import express, { json } from "express";
import cheerio from "cheerio";
import { searchRoute } from "./routes/index.js";
const PORT = 5000;

const url = "https://www.amazon.in/dp/B0BCP3X81V/";

const app = express();

const apiCall = async ( url ) => {
    const response = await axios( url );
    const html = response.data;
    const $ = cheerio.load( html );
    $( "#productTitle", html ).each( function () {
        const title = $( this ).text();
        console.log( title );
    } );
};

//Middlewares
app.use( json() );
// apiCall( url );
app.use( "/search", searchRoute );

app.get( "/", ( req, res ) => {
    res.send( `Sloth's project API` );
} );

app.listen( PORT, () => console.log( `listening on port ${PORT}` ) );
