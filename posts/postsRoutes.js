const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.post('/', (req, res) => {
    const post = req.body
    if(!post.title && !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(post)
            .then(returnedPost => {
                res.status(200).json(returnedPost);
            })
            .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
    }
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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;
    db.update(id, updatedPost)
        .then(changedPost => {
            if(!changedPost) {
                res.status()
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if(post.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                db.remove(post.id)
                    .then(numRecords => {
                        res.status(200).json(post);
                    })
                    .catch(err => res.status(500).json({ error: "The post could not be removed" }));
            }
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
        .then(comments => {
            console.log(comments)
            if(comments.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(err => res.status(500).json({ error: "The comments information could not be retrieved." }));
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    if(!newComment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
        db.findById(id)
            .then(post => {
                if(post.length !== 1) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                } else {
                    db.insertComment(newComment)
                        .then(comment => {
                            res.status(201).json(comment);
                        })
                        .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
                }
            })
            .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
    }   
})

module.exports = router;