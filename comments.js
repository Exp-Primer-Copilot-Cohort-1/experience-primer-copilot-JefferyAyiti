// Create web server
var express = require('express');
var router = express.Router();

// Import model
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// Get a comment by id
router.get('/:id', function(req, res) {
    Comment.findOne({_id: req.params.id}, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

// Create a new comment
router.post('/', function(req, res) {
    var comment = new Comment();
    comment.content = req.body.content;
    comment.author = req.body.author;
    comment.post = req.body.post;
    comment.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Comment successfully created!'});
    });
});

// Update a comment by id
router.put('/:id', function(req, res) {
    Comment.findOne({_id: req.params.id}, function(err, comment) {
        if (err) {
            res.send(err);
        }
        comment.content = req.body.content;
        comment.author = req.body.author;
        comment.post = req.body.post;
        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Comment successfully updated!'});
        });
    });
});

// Delete a comment by id
router.delete('/:id', function(req, res) {
    Comment.remove({_id: req.params.id}, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Comment successfully deleted!'});
    });
});

// Export router
module.exports = router;


