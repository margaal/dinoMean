require('./db.js');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes  = require('./routes');

const port = process.env.PORT || 3000;

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.listen(port, () => {
    console.log("Le serveur a démarré sur le port '3000'");
});

app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});