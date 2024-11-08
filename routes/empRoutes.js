const express = require("express")
const employeeController = require("./../controllers/employeeController")

const router = express.Router()


router.route("/")
.get(employeeController.getAllEmployeeDetails);

module.exports = router;