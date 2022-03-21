const { transaction, user } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const { ...data } = req.body;

    const newTransaction = await transaction.create({
      ...data,
      transferProof: req.file.filename,
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["password", "role", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    let dataFinal = await transaction.findOne({
      where: {
        id: newTransaction.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "password", "role", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    let distance = dataFinal.remainingActive - new Date();

    dataFinal = JSON.parse(JSON.stringify(dataFinal));
    res.send({
      status: "success",
      data: {
        transaction: {
          ...dataFinal,
          remainingActive: Math.round(distance / (1000 * 3600 * 24)),
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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    let dayActive = new Date();
    dayActive.setDate(dayActive.getDate() + 30);

    const data = {
      userStatus: "Active",
      remainingActive: dayActive,
    };

    await transaction.update(req.body, {
      where: {
        id,
      },
    });

    const dataUpdate = await transaction.findOne({
      where: {
        id,
      },
    });

    if (dataUpdate.paymentStatus == "Approved") {
      await transaction.update(data, {
        where: {
          id,
        },
      });
    }

    let dataFinal = await transaction.findOne({
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

    // if (dataFinal.userStatus == "Active") {
    //   await user.update(
    //     {
    //       fullName: "Update",
    //     },
    //     {
    //       where: {
    //         id,
    //       },
    //     }
    //   );
    // }

    let distance = dataFinal.remainingActive - new Date();

    dataFinal = JSON.parse(JSON.stringify(dataFinal));

    dataFinal = {
      ...dataFinal,
      remainingActive: Math.round(distance / (1000 * 3600 * 24)),
    };

    res.send({
      status: "success",
      dataFinal,
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
