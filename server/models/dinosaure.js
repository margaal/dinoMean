const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "SECRET@#2020";
const JWT_EXP = "120m";

var dinosaureSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    dob: {
        type: Date,
        default: Date.now
    },
    presentation: String,
    family: String,
    color: String,
    food: String,
    weight: {
        type: Number,
        min: [10, 'Oups! Un bébé Dino, n\'a pas droit au réseau.']
    },
    password: {
        type: String,
        required: 'Veuillez fournir un mot de passe', 
        minlength: [4, 'Veuillez renseigner une chaîne d\'au moins 4 caractères']
    },
    saltSecret: String,
    friends: [String]
});

// Methods
dinosaureSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

dinosaureSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        JWT_SECRET,
    {
        expiresIn:JWT_EXP
    });
}

dinosaureSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.saltSecret;
    return obj;
   }

// Events
dinosaureSchema.pre('save', function (next) {
    console.log("PreSave callback...");
    this.name = "Dino"+moment().format('DDssHHmm');
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

Dinosaure = mongoose.model('Dinosaure', dinosaureSchema);
module.exports = Dinosaure;