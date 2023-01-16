import { axiosInstance } from "../helpers/index.js";
import { load } from "cheerio";

export const getProductReviews = async ( req, res, next ) => {
    let productReviews = [];
    let i = 1;
    while ( i ) {
        try {
            const { data: html } = await axiosInstance(
                `/product-reviews/${req.params.productId}?ie=UTF8&pageNumber=${i}&reviewerType=${req.query.reviewerType}`
            );
            const $ = load( html );
            $( `#cm_cr-review_list` )
                .find( `.a-section.celwidget` )
                .each( ( i, el ) => {
                    const reviewerName = $( el ).find( `.a-profile-name` ).text();
                    const reviewTitle = $( el ).find( `.review-title` ).text();
                    const reviewBody = $( el )
                        .find( `.review-text` )
                        .children( "span" )
                        .text();
                    const reviewStars = $( el ).find( `.a-icon-star` ).text();
                    productReviews.push( {
                        reviewerName: reviewerName.trim(),
                        reviewTitle: reviewTitle.trim(),
                        reviewBody: reviewBody.trim(),
                        reviewStars: parseFloat( reviewStars.split( " " )[ 0 ] )
                    } );
                } );
            if (
                !$( `#cm_cr-review_list` ) ||
                i === Number( req.query.maxPageLimit )
            ) {
                break;
            }
            if ( $( `#cm_cr-review_list` ) ) i++;
        } catch ( error ) {
            res.send( error );
        }
    }

    res.json( productReviews );
};
