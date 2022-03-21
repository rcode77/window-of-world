const { book } = require("../../models");
const sequelize = require("sequelize");

exports.addBook = async (req, res) => {
  try {
    const { ...data } = req.body;

    const newBook = await book.create({
      ...data,
      bookCover: req.files["bookCover"][0].filename,
      bookFile: req.files["bookFile"][0].filename,
    });

    let dataFinal = await book.findOne({
      where: {
        id: newBook.id,
      },
      attributes: {
        include: [
          [
            sequelize.fn(
              "date_format",
              sequelize.col("publicationDate"),
              "%M %Y"
            ),
            "publicationDate",
          ],
        ],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataFinal = JSON.parse(JSON.stringify(dataFinal));
    res.send({
      status: "success",
      data: {
        book: {
          ...dataFinal,
          bookFile: process.env.EPUB_PATH_FILE + dataFinal.bookFile,
          bookCover: process.env.IMAGES_PATH_FILE + dataFinal.bookCover,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let books = await book.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              "date_format",
              sequelize.col("publicationDate"),
              "%M %Y"
            ),
            "publicationDate",
          ],
        ],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    books = JSON.parse(JSON.stringify(books));

    books = books.map((item) => {
      return {
        ...item,
        bookFile: process.env.EPUB_PATH_FILE + item.bookFile,
        bookCover: process.env.IMAGES_PATH_FILE + item.bookCover,
      };
    });

    res.send({
      status: "success",
      books,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await book.findOne({
      where: {
        id,
      },
      attributes: {
        include: [
          [
            sequelize.fn(
              "date_format",
              sequelize.col("publicationDate"),
              "%M %Y"
            ),
            "publicationDate",
          ],
        ],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      bookFile: process.env.EPUB_PATH_FILE + data.bookFile,
      bookCover: process.env.IMAGES_PATH_FILE + data.bookCover,
    };

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    await book.update(req.body, {
      where: {
        id,
      },
    });

    const data = await book.findOne({
      where: {
        id,
      },
      attributes: {
        include: [
          [
            sequelize.fn(
              "date_format",
              sequelize.col("publicationDate"),
              "%M %Y"
            ),
            "publicationDate",
          ],
        ],
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        book: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await book.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
