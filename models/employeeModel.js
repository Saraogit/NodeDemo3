const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    eid:{
        type:Number,
        required:[true,"Employee Id is needed and it should be unique"],
        unique: true
    },
    first_name:{
        type:String,
        required:[true,"Employee must have name"],
        default: 'John'
    },
    last_name:{
        type:String,
        required:[true,"Employee must have a last name"],
        default: 'Doe'
    },
    email:{
        type:String,
        required:[true,"Employee must have unique email"],
        unique: true
    },
    car_model:{
        type: String,
        required:[true,"Car model details are missing"] 
    }
})

//create collection
const EmpModel = mongoose.model("EmpModel", empSchema);

module.exports = EmpModel;