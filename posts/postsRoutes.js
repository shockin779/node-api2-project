const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    console.log(title)
    console.log(contents)
    res.send('thanks')
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(post => {
            if(post.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

module.exports = router;