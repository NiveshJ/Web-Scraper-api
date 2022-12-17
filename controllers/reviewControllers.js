import { axiosInstance } from "../helpers/index.js";
import { load } from "cheerio";

export const getProductReviews = async ( req, res, next ) => {
    let productReviews = [];
    try {
        const { data: html } = await axiosInstance(
            `/product-reviews/${
                req.params.productId
            }?ie=UTF8&pageNumber=${1}&reviewerType=${req.query.reviewerType}`
        );
        const $ = load( html );
        $( `#cm_cr-review_list` )
            .find( `.a-section.celwidget` )
            .each( ( i, el ) => {
                const reviewerName = $( el ).find( `.a-profile-name` ).text();
                const reviewTitle = $( el ).find( `.review-title` ).text();
                const reviewBody = $( el ).find( `.review-text` ).text();
                const reviewStars = $( el ).find( `.a-icon-star` ).text();
                productReviews.push( {
                    reviewerName: reviewerName.trim(),
                    reviewTitle: reviewTitle.trim(),
                    reviewBody: reviewBody.trim(),
                    reviewStars: parseFloat( reviewStars.split( " " )[ 0 ] )
                } );
            } );
        res.send( productReviews );
    } catch ( error ) {
        console.log( error );
    }
};
