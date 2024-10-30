import { Router } from "express";
import { getSmartInnosysLedger } from "../controllers/smartInnosysLedgerController";

const router = Router();

router.get("/", getSmartInnosysLedger);

export default router;
