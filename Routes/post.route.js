const express = require("express");
const { PostModel } = require("../Models/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    try {
        const notes = await PostModel.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

postRouter.post("/add", async (req, res) => {
    const payload = req.body;
    try {
        const new_note = new PostModel(payload);
        await new_note.save();
        res.status(200).send({ msg: "New post added" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

postRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    let payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: " Post updated successfully" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

postRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await PostModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: " Post deleted successfully" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

module.exports = {
    postRouter,
};
