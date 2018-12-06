const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/prices', (req, res) => {
    request('https://api.coindesk.com/v1/bpi/historical/close.json?index=BTC&currency=USD&start=2018-11-06&end=2018-12-06', (error, response) =>{
        if(error) {
            res.send(error);
        } else {
            res.send(response);
        }
    })
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});


