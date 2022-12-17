import axios from "axios";
import express, { json } from "express";
import cheerio from "cheerio";
import { reviewRoute, searchRoute } from "./routes/index.js";
const PORT = 5000;

const app = express();

//Middlewares
app.use( json() );
// apiCall( url );
app.use( "/search", searchRoute );
app.use( "/reviews", reviewRoute );

app.get( "/", ( req, res ) => {
    res.send( `Sloth's project API` );
} );

app.listen( PORT, () => console.log( `listening on port ${PORT}` ) );
