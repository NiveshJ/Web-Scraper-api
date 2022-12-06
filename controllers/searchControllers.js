import { axiosInstance } from "../helpers/index.js";
import { load } from "cheerio";

export const searchProduct = async ( req, res, next ) => {
    const title = req.params.productName;
    const { data: html } = await axiosInstance( `/s?k=${title}` );
    const $ = load( html );
    // $( ".s-result-item", html ).each( () => {
    //     console.log( $( this ).text() );
    // } );
    let result;
    $( ".s-result-list.s-search-results" ).each( ( i, el ) => {
        result = [];
        $( el )
            .find( ".s-asin" )
            .each( ( i, el ) => {
                console.log( $( el ).attr( "data-asin" ) );
                result.push( $( el ).attr( "data-asin" ) );
            } );
        // result = $( el ).find( ".s-result-item.s-asin" );
    } );
    res.send( result );
    next();
};
