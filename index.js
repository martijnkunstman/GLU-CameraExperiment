//set up express

const base64ToImage = require('base64-to-image');
const uniqid = require('uniqid'); 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

//serve files in public folder (publix/index.html)
app.use(express.static('public'));
app.use(express.json());

//use the file system (save and load data.txt)
const fs = require('fs');


app.post('/postdata', (req, res) => {
    const base64Str = req.body.postData;
    var optionalObj = {'fileName': uniqid(), 'type':'png'};
    base64ToImage(base64Str,"./public/img/",optionalObj); 
    /* old code save data to data.txt //append postdata to the file data.txt and save the file 
    fs.appendFile('data.txt', base64Str + "<br>", err => {
        if (err) {
            console.error(err)
            return
        }
    })
    */
    res.send({ "status": "ok" })
})

//load content of data.txt
app.get('/data', (req, res) => {
    
    
    
    /* old code read data of data.txt - //load content of data.txt 
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send({ "data": data })
    })
    */

})