const express = require("express");
const router = express.Router();

const { createRecord, getRecords, getSummary } = require("../controllers/recordController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");


router.post("/", protect, authorizeRoles("admin"), createRecord);


router.get("/", protect, getRecords);


router.get("/summary", protect, authorizeRoles("analyst", "admin"), getSummary);

module.exports = router;