const router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8')
        .then(fileContents => res.json(JSON.parse(fileContents)));
});

router.post('/note', (req, res) => {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf8')
        .then(fileContents => {
            const allNotes = JSON.parse(fileContents);
            allNotes.push(note);
            const newFileContent = JSON.stringify(allNotes, null, 4)
            writeFileAsync('./db/db.json', newFileContent)
                .then(() => res.send(note));
        });
});

module.exports = router;
