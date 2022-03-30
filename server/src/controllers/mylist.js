const { user, book, myList } = require("../../models");
const { Op } = require("sequelize");

exports.addMyList = async (req, res) => {
  const data = {
    idUser: req.user.id,
    idBook: req.params.id,
  };
  try {
    const addList = await myList.create(data);

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMyLists = async (req, res) => {
  try {
    const idUser = req.user.id;
    const myLists = await myList.findAll({
      where: {
        idUser,
      },
      include: [
        {
          model: user,
          as: "me",
          attributes: {
            exclude: [
              "password",
              "role",
              "subscribe",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: book,
          as: "myBook",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt", "idUser", "idBook"],
      },
    });

    res.send({
      status: "success",
      data: {
        myLists,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.myBook = async (req, res) => {
  const idUser = req.user.id;
  const idBook = req.params.id;
  try {
    const myBook = await myList.findOne({
      where: {
        [Op.and]: [{ idUser }, { idBook }],
      },
      include: [
        {
          model: user,
          as: "me",
          attributes: {
            exclude: [
              "password",
              "role",
              "subscribe",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: book,
          as: "myBook",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt", "idUser", "idBook"],
      },
    });

    res.send({
      status: "success",
      data: {
        myBook,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
