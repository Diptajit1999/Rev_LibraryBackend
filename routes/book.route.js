const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const bookRouter = express.Router();
const { BookModel } = require("../model/book.model");
const { roleAccess } = require("../middleware/authorization.middleware");
// "title": "adventure of tintin",
//     "author": "some1",
//     "category": "some1",
//     "price": "some1",
//     "quantity": "some1"


// name: String,
//   email: String,
//   password: String,
//   isAdmin: Boolean,



bookRouter.post("/books", auth, roleAccess, async(req, res) => {
    const payload=req.body

    try {
        const book=new BookModel(payload)
        await book.save()
        res.status(200).send({msg:"Book has been added to the book collections"})
    } catch (error) {
        res.status(400).send({msg:error})
    }
});

bookRouter.get("/",(req, res) => {
    res.status(200).send({msg:"geting books"})
});

module.exports = {
  bookRouter,
};
