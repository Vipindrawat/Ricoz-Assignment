const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Article = require('../Models/Article_Model');
const mongoose = require('mongoose');

router.get("/getArticles", async (req, res) => {
    try {
        const data = await Article.find();
        res.json(data);

    }
    catch (error) {
        res.status(500).json({ "Error": "Internal server error", "Message": error.message })
    }

})

router.post('/addArticle', [
    body('title', 'title should be of atleast 3 character').isLength({ min: 3 }),
    body('description', 'description should be of atleast 5 character').isLength({ min: 5 }),
    body('content', 'content should of atleast 10 character').isLength({ min: 10 }),
    body('author', 'author should be of atleast3 character').isLength({ min: 3 }).optional(),
], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            await Article.create(req.body);
            res.send("Article added successfully");
        }
        catch (error) {
            res.status(500).json({ "error": "internal server error", "message": error.message });
        }
    }
    else {
        res.json({ "success": false, "errors": result.array() });
    }

})

router.put("/editArticle/:id", [
    body('title', 'title should be of atleast 3 character').isLength({ min: 3 }).optional(),
    body('description', 'description should be of atleast 5 character').isLength({ min: 5 }).optional(),
    body('content', 'content should of atleast 10 character').isLength({ min: 10 }).optional(),
    body('author', 'author should be of atleast3 character').isLength({ min: 3 }).optional(),
], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid article ID" });
        }

        const hasarticle = await Article.findById(req.params.id);
        if (!hasarticle) {
            return res.status(401).json({ "error": "No such article is present" });
        }

        try {
            await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json({ "succcess": true, "message": "article modified successfully" });
        }
        catch (error) {
            res.status(500).json({ "error": "internal server  error", "message": error.message });
        }
    }
    else {
        res.json({ "success": false, "errors": result.array() });
    }

})


module.exports = router;