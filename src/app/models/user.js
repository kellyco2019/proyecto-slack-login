const { Mongoose } = require("mongoose")

const mongoose = require("mongose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
    Local: {
        email: String,
        password: String,
    },
    facbook: {
        email: String,
        password: String,
        id: String,
        token: String
    }
    
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hasSync(password, bycrypt.genSaltSync(8), null)

};

userSchema.methods.transformHash = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("User" , userSchema);


