import { Router } from "express";
import { getProductReviews } from "../controllers/index.js";

const router = Router();

router.get( "/:productId", getProductReviews );

export default router;
