const express = require("express");
const router = express.Router();

const notesController = require('../Controllers/UserNotes.controllers'); // Import the controller

const JWTauthMiddleware = require('../Middleware/checkAuth.middleware')

router.post("/api/v1/addNotes", JWTauthMiddleware, notesController.AddNotes);

router.get("/api/v1/getNotes", JWTauthMiddleware, notesController.Getnotes);

router.post("/api/v1/deleteNotes", JWTauthMiddleware, notesController.DeleteNotes);

module.exports = router;
