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


// Admin adds new books
bookRouter.post("/api/books", auth, roleAccess, async(req, res) => {
    const payload=req.body

    try {
        const book=new BookModel(payload)
        await book.save()
        res.status(200).send({msg:"Book has been added to the book collections"})
    } catch (error) {
        res.status(400).send({msg:error})
    }
});




// Returns the details of a specific book identified by its ID.
bookRouter.get("/api/books/:id",async(req, res) => {
    const id=req.params.id
    console.log(req.params)
    if(!id){
        res.send({msg:"error",error:"books id is not find"})
    }

    try {
        const books=await BookModel.find({_id:id})
         
        res.status(200).send({msg:"success",books})
    } catch (error) {
        res.status(200).send({msg:error})
    }
});


// Returns a list of all available books
bookRouter.get("/api/books",async(req, res) => {
    const {author,category}= req.query
   

    try {
        let query={}
        if(author){
            query.author=author
        }
        if(category){
            query.category=category
        }
        const books=await BookModel.find(query)
         
        res.status(200).send({msg:"success",books})
    } catch (error) {
        res.status(200).send({msg:error})
    }
});


bookRouter.put("/api/books/:id", auth, roleAccess, async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBook) {
            return res.status(404).send({ msg: "Book not found" });
        }

        res.status(204).send(); // Success, no content
    } catch (error) {
        res.status(500).send({ msg: error });
    }
});

bookRouter.delete("/api/books/:id", auth, roleAccess, async (req, res) => {
    const id = req.params.id;

    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send({ msg: "Book not found" });
        }

        res.status(204).send(); // Success, no content
    } catch (error) {
        res.status(500).send({ msg: error });
    }
});
module.exports = {
  bookRouter,
};
