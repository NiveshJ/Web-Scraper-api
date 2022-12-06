import { Router } from "express";
import { searchProduct } from "../controllers/index.js";

const router = Router();

router.get( "/:productName", searchProduct );

export default router;
