import { axiosInstance } from "../helpers/index.js";
import { load } from "cheerio";

export const searchProduct = async ( req, res, next ) => {
    const title = req.params.productName;
    try {
        const { data: html } = await axiosInstance( `/s?k=${title}` );
        const $ = load( html );
        let result;
        $( ".s-result-list.s-search-results" ).each( ( i, el ) => {
            result = [];
            $( el )
                .find( ".s-asin" )
                .each( ( i, el ) => {
                    const productTitle = $( el )
                        .find( ".a-color-base.a-text-normal" )
                        .text();
                    const productId = $( el ).attr( "data-asin" );
                    const productImg = $( ".s-image", el ).attr( "src" );
                    result.push( {
                        id: productId,
                        title: productTitle,
                        image: productImg
                    } );
                } );
        } );
        res.send( result );
    } catch ( error ) {
        res.send( error );
    }

    next();
};

export const searchProductById = async ( req, res, next ) => {
    const productId = req.params.productId;
    try {
        const { data: html } = await axiosInstance( `/dp/${productId}` );
        const $ = load( html );
        const productTitle = $( "#productTitle" ).text();
        const productImg = $( ".a-dynamic-image" ).attr( "src" );
        res.send( { title: productTitle, image: productImg } );
    } catch ( error ) {
        res.send( error );
    }
};
