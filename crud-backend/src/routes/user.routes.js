import express from "express";

import * as clientController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", clientController.getClients);
router.post("/create", clientController.createClient);
router.put("/update/:id", clientController.updateClient);
router.delete("/delete/:id", clientController.deleteClient);
router.get("/search", clientController.searchClients);

export default router;
