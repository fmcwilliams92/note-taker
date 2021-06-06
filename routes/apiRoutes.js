const router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8')
    .then(note => {
        console.log(note);
        return res.json(JSON.parse(note))
    });
});

router.post('/notes', (req, res) => {
    // get users input and set it to a variable
    var userInput = note;
    // get existing notes
    // Add the new note to the existing notes
    
    // Save the updated notes to the db.json file using wrtieFile
    // return saved note
});

module.exports = router;