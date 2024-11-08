// const express = require('express')
// const employeeRouter = require("./routes/employeeRoutes")

// //creating express application
// const app = express()

// //Middleware
// app.use(express.json());

// app.use("api/v1/employees", employeeRouter)
// module.exports =app

const express = require("express")
const empRouter = require("./routes/employeeRoutes")
const webEmployeeRouter = require("./routes/empRoutes")
const path = require("path")
const errorController = require("./controllers/errorController")
const ApiError = require("./utils/ApiError")

const app = express()

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json())

app.use("/api/v1/employees", empRouter)
app.use("/web/employees", webEmployeeRouter);


app.all("*", (req, res, next) => {
    // res.status(404).json({
    //     status: "failed",
    //     message: `${req.originalUrl} is not found. Please check again`
    // })

    //creating the error
    // const error = new Error(`${req.originalUrl} is not found`)
    // error.statusCode = 404
    // error.status = "Bad request"
    // //passing to middleware - error middleware
    // next(error);
    next(new ApiError(404, `${req.originalUrl} is not found`))
})

//error handling using middleware
app.use(errorController.errorMiddleware)

module.exports = app