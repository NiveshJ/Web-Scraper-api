import { Router } from "express";
import { searchProduct, searchProductById } from "../controllers/index.js";

const router = Router();

router.get( "/:productName", searchProduct );
router.get( "/id/:productId", searchProductById );

export default router;
