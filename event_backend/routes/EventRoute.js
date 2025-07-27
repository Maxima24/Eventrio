const express = require('express')
const eventController = require('./../controllers/eventController')
const authController = require('./../controllers/authController')
const router = express.Router()
router.route("/").post(eventController.addEvent).get(
    eventController.getAllEvents
)
router.route("/:id").get(eventController.getEvent).put(eventController.editEvent).delete(eventController.deleteEvent)
module.exports = router