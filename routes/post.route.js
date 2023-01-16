const express = require("express")

const { postModel } = require("../models/post.model")

const postRouter = express.Router();



postRouter.get("/", async (req, res) => {
    try {
        let posts= await postModel.find();
        res.send(posts)
    } catch (err) {
        console.log(err)
        res.send("Something Went Wrong")
    }
})

postRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const post = new postModel(payload)
        await post.save();
        res.send("Post Created Successfully")
    } catch (err) {
        console.log(err)
        res.send({ msg: "Post Upload Failed" })
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const post = await postModel.findOne({_id:id})
    const userID_in_post = post.userID;
    const req_userID = req.body.userID;
    try {
        if (req_userID !== userID_in_post) {
            res.send("You are not authorized")
        } else {
            await postModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Post Updated Successfully")
        }
    } catch (err) {
        console.log(err)
        res.send({ msg: "Post Update Failed" })
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const post = await postModel.find({ "_id": id })
    const post_userID = post.userID;
    const req_userID = req.body.userID;
    try {
        if (req_userID !== post_userID) {
            res.send("You are not authorized")
        } else {
            await postModel.findByIdAndDelete({ "_id": id })
            res.send("Post Deleted Successfully")
        }
    } catch (err) {
        console.log(err)
        res.send({ msg: "Post Delete Failed" })
    }
})





module.exports = {
    postRouter
}