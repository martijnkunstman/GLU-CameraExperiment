//set up express

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

//serve files in public folder (publix/index.html)
app.use(express.static('public'));
app.use(express.json());

//use the file system (save and load data.txt)
const fs = require('fs');

//append postdata to the file data.txt and save the file
app.post('/postdata', (req, res) => {
    const encodedStr = req.body.postData;
    fs.appendFile('data.txt', encodedStr + "<br>", err => {
        if (err) {
            console.error(err)
            return
        }
    })
    res.send({ "status": "ok" })
})

//load content of data.txt
app.get('/data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send({ "data": data })
    })
})