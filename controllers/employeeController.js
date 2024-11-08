const ApiError = require("../utils/ApiError");
const empModel = require("./../models/employeeModel")
const logger = require("../utils/logger");
exports.addNewEmployee = async (req, res) => {
    try {
        const newEmployee = await empModel.create(req.body);
        res.status(201).json({
            status: "Success",
            meg: "Employee addded successfully",
            data: {
                employee: newEmployee
            }
        })
    }
    catch (err) {
        console.log("Employee failed to save");
        res.status(404).json({
            status: "Failed",

        })
    }
}//can be done using then and catch


exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await empModel.find()
        res.status(200).json({
            status: "Success",
            results: employees.length,
            data: {
                employeeDetails: employees
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Failure",
            msg: err.message
        })
    }
}


exports.getEmployeeById = async (req, res, next) => {
    try {
        const employees = await empModel.findById(req.params.id);

        //log(level, msg)
        logger.log("info", `Sucessfully fetched employee details ${req.params.id}`)
        //empModel.findOne({eid: req.params.id});
        res.status(200).json({
            status: "Success",
            data: {
                employeeDetails: employees
            }
        })
    } catch (err) {
        // res.status(404).json({
        //     status: "Failure",
        //     msg: err.message
        // })
        logger.log("error", `Failed to fetched employee details ${req.params.id}`)
        next(new ApiError(500, `${req.params.id} is not found`))
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const emp = await empModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            includeResultMetadata: true
        });
        res.status(200).json({
            status: "Success",
            data: {
                newEmployeeDetails: emp
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failed to update",
            msg: err.message,
            details: "Please check employee id"
        })
    }
}

exports.deleteAEmployee = async (req, res, next) => {
    try {
        const response = await empModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Deleted sucessfully",
            data: {
                dataDeleted: response
            }
        });

    } catch (err) {
        // res.status(404).json({
        //     status: "failed to delete",
        //     msg: err.message,
        //     details:"Please check employee id"
        // })
        next(new ApiError(500, `${req.params.id} is not found`))
    }

}

exports.getAllEmployeeDetails = async (req, res) => {
    const allEmployees = await empModel.find()
    return res.render("employees", {
        allemployeesDetails: allEmployees
    })
}