const { transaction, user } = require("../../models");
const sequelize = require("sequelize");

exports.addTransaction = async (req, res) => {
  try {
    const { ...data } = req.body;

    const newTransaction = await transaction.create({
      ...data,
      transferProof: req.file.filename,
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    let dayActive = new Date();
    dayActive.setDate(dayActive.getDate() + 30);

    const data = {
      userStatus: "Active",
      remainingActive: dayActive,
      paymentStatus: "Approved",
    };

    await transaction.update(data, {
      where: {
        id,
      },
    });

    const dataFinal = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "createdAt", "updatedAt", "password", "role"],
          },
        },
      ],
    });

    await user.update(
      {
        subscribe: "Subscribed",
      },
      {
        where: {
          id: dataFinal.user.id,
        },
      }
    );

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.cancelTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    let dayActive = sequelize.fn("now");

    const data = {
      userStatus: "Not Active",
      remainingActive: dayActive,
    };

    await transaction.update(data, {
      where: {
        id,
      },
    });

    await user.update(
      {
        subscribe: "Not Subscribe",
      },
      {
        where: {
          id: dataFinal.user.id,
        },
      }
    );

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "createdAt", "updatedAt", "password", "role"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
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

exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "createdAt", "updatedAt", "password", "role"],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        // transferProof: process.env.IMAGES_PATH_FILE + item.transferProof,
        remainingActive: Math.round(
          (new Date(item.remainingActive) - new Date()) / (1000 * 3600 * 24)
        ),
      };
    });

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
