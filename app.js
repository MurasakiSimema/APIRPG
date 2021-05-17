const express = require('express');
const app = express();
const PORT = process.env.PORT || 443;
const basicAuth = require('express-basic-auth');
const fs = require('fs');

var items = [];
InizializzaJson();


/*app.use(basicAuth({
    challenge: true,
    users: {
        'username': 'password1'
    }
}));*/

app.use(express.urlencoded({
    extended: true
}));

app.get("/items", function(req, res) {
    console.log("Connessione da parte di un client");
    if (req.query.lv) {
        if (req.query.lv < 5) {
            let senditems = items.slice(0, 4);
            res.json(senditems);
        } else {
            res.json(items);
        }
    } else {
        res.json([{}]);
    }
})

app.listen(PORT, function() {
    console.log('Server attivo sulla porta ' + PORT);
});

function InizializzaJson() {
    try {
        let rawdata = fs.readFileSync('item.json');
        items = JSON.parse(rawdata);
    } catch (error) {
        console.log("Nessun File item.json presente");
    }

    console.log(items);
}