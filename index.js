const base64ToImage = require('base64-to-image')
const uniqid = require('uniqid')

//set up express server
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

//serve files in public folder (publix/index.html)
app.use(express.static('public'))
app.use(express.json())

//use the file system
const fs = require('fs')

app.post('/postdata', (req, res) => {
    const base64Str = req.body.postData
    let optionalObj = { 'fileName': uniqid(), 'type': 'png' }
    base64ToImage(base64Str, "./public/img/", optionalObj)
    res.send({ "status": "ok" })
})

//load content of data.txt
app.get('/data', (req, res) => {
    let data = []
    fs.readdirSync("./public/img/").forEach(file => { data.push(file) })
    res.send({ "data": data })
})