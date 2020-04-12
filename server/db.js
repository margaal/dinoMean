const mongoose = require('mongoose');
var mongo_connection_string = "mongodb://localhost:27017/DinoDB";

mongoose.connect(mongo_connection_string, {useNewUrlParser:true, useUnifiedTopology: true, 
    useFindAndModify: false, useCreateIndex: true}, (error) => {
    if(!error){
        console.log('Connexion réussie avec la base de données DinoDB.');
    }else{
        console.log('Oups! Erreur lors de la connexion avec la base de données DinoDB : '+
        JSON.stringify(error, undefined, 2));
    }
});

module.exports = mongoose;