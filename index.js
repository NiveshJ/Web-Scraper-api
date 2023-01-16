import express, { json } from "express";
import { reviewRoute, searchRoute } from "./routes/index.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

//Middlewares
app.use( cors() );
app.use( json() );
// apiCall( url );
app.use( "/search", searchRoute );
app.use( "/reviews", reviewRoute );

app.get( "/", ( req, res ) => {
    res.send( `Sloth's project API` );
} );

app.listen( PORT, () => console.log( `listening on port ${PORT}` ) );
