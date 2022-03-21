const express = require("express");

const router = express.Router();

// Controllers
const {
  register,
  login,
  adminRegister,
  checkAuth,
} = require("../controllers/auth");
const { getUsers, deleteUser } = require("../controllers/user");
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  getTransaction,
} = require("../controllers/transaction");

//Middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile, uploadImage } = require("../middlewares/uploadFile");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/adminregister", adminRegister);
router.get("/check-auth", auth, checkAuth);

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.post("/book", auth, uploadFile("bookCover", "bookFile"), addBook);
router.patch("/book/:id", auth, updateBook);
router.delete("/book/:id", auth, deleteBook);

router.post("/transaction", auth, uploadImage("transferProof"), addTransaction);
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.patch("/transaction/:id", auth, updateTransaction);

module.exports = router;
