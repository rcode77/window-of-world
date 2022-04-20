const express = require("express");

const router = express.Router();

// Controllers
const {
  register,
  login,
  adminRegister,
  checkAuth,
} = require("../controllers/auth");
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");
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
  cancelTransaction,
  getTransaction,
} = require("../controllers/transaction");
const { addMyList, getMyLists, myBook } = require("../controllers/mylist");

//Middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile, uploadImage } = require("../middlewares/uploadFile");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/adminregister", adminRegister);
router.get("/check-auth", auth, checkAuth);

router.get("/users", getUsers);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/edit-profile", auth, uploadImage("userImage"), updateUser);

router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.post("/book", auth, uploadFile("cover", "bookFile"), addBook);
router.patch("/book/:id", auth, uploadFile("cover", "bookFile"), updateBook);
router.delete("/book/:id", auth, deleteBook);

router.post("/transaction", auth, uploadImage("transferProof"), addTransaction);
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.patch("/cancel/:id", auth, cancelTransaction);

router.post("/add-my-list/:id", auth, addMyList);
router.get("/my-lists", auth, getMyLists);
router.get("/my-book/:id", auth, myBook);

module.exports = router;
