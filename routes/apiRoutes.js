const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8')
        .then(fileContents => res.json(JSON.parse(fileContents)));
});

router.post('/notes', (req, res) => {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf8')
    .then(fileContents => {
        const allNotes = JSON.parse(fileContents);
        allNotes.push(note);
        const newFileContent = JSON.stringify(allNotes, null, 4)
        writeFileAsync('./db/db.json', newFileContent)
            .then(() => res.send(note));
    });
    const newID = req.body;
    newID.id = uuidv4();
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(JSON.parse(data));
            const notesArray = JSON.parse(data);
            const filteredArray = notesArray.filter(item => item.id != req.params.id);
            fs.writeFile('./db/db.json', JSON.stringify(filteredArray, null, 4), (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                res.json(filteredArray)
                }
            });
        }
    });
});

module.exports = router;
