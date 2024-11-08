const express = require("express")
const employeeController = require("./../controllers/employeeController")
const router = express.Router()


router.route("/")
.post(employeeController.addNewEmployee)
.get(employeeController.getAllEmployees);

router.route("/:id")
.get(employeeController.getEmployeeById)
.patch(employeeController.updateEmployee)
.delete(employeeController.deleteAEmployee);


module.exports = router