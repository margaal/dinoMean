var mongoose = require('mongoose');
var Dinosaure  = require('../models/dinosaure');
var ObjectId = require('mongoose').Types.ObjectId;
//const Dinosaure = mongoose.model('Dinosaure');


module.exports = {

    index: (req, res) => {
       console.log("List Dino Method...");
        Dinosaure.find((error, docs) => {

            if(!error){
                res.send(docs);
            }else{

                next(JSON.stringify(error, undefined, 2));
            }
        });

    },
    show: (req, res, next) =>{
        console.log("Get Dino Method...");
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send("Id incorrect");
        }

        Dinosaure.findById(req.params.id, (error, doc) => {
            if(!error){
                res.send(doc);
            }else{
                res.send(JSON.stringify(error, undefined, 2));
            }
        });
        
    },
    update: (req, res) =>{
        console.log("UPdate Dino Method...");
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send("Id incorrect");
        }

        var dino = {
            family: req.body.family,
            presentation: req.body.presentation,
            dob: req.body.dob,
            color: req.body.color,
            food: req.body.food,
            weight: req.body.weight,
        };
        
        //upsert : true
        Dinosaure.findByIdAndUpdate(req.params.id, { $set: dino }, {new: true}, (error, doc) => {
            if(!error){
                
                res.send(doc);
            }else{
                
                res.send(JSON.stringify(error, undefined, 2));
            }
        });
    },
    delete: (req, res) => {
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send("Id incorrect");

        }

        Dinosaure.findByIdAndRemove(req.params.id, (error, doc) => {
            if(!error){
                res.send(doc);
            }else{
                res.send(JSON.stringify(error, undefined, 2));
            }
        })
    },
    addFriend: (req, res, next) => {
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send("Id incorrect");
        }

        //upsert : true
        Dinosaure.findByIdAndUpdate(req.params.id, {
            $addToSet: {'friends': req.body.friend_id }
         }, { new:true }, (error, doc) => {
            if(!error){
                res.send(doc);
            }else{
                res.send(JSON.stringify(error, undefined, 2));
            }
        });
    },
    removeFriend: (req, res, next) => {
        if(!ObjectId.isValid(req.params.id)){
            return res.status(400).send("Id incorrect");
        }

        //upsert : true
        Dinosaure.findByIdAndUpdate(req.params.id, {
            $pull: {'friends': req.body.friend_id }
         }, {new:true}, (error, doc) => {
            if(!error){
                res.send(doc);
            }else{
                res.send(JSON.stringify(error, undefined, 2));
            }
        });
    },
    register: (req, res, next) => {
        console.log("Register Method...");
        var dino = new Dinosaure({
            password: req.body.password,
            family: req.body.family,
            presentation: req.body.presentation,
            dob: req.body.dob,
            color: req.body.color,
            food: req.body.food,
            weight: req.body.weight,
            freinds: []
        });

        dino.save((err, doc) => {
            if (!err)
                res.send(doc);
            else {
                if (err.code == 11000)
                    res.status(422).send(['Erreur, duplication de l\'identifiant']);
                else
                    return next(err);
            }
        });
    },


}
